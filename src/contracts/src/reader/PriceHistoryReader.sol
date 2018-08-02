pragma solidity ^0.4.23;

import "./DateTime.sol";

// Relevant functions of Melon's CanonicalPriceFeed
interface CanonicalPriceFeedHistory {
    function getHistoryLength() external returns (uint);
    function getHistoryAt(uint id) external returns (address[], uint[], uint);
}

contract PriceHistoryReader {
    
    // for deployment: use address on mainnet -> 0x1a6184CD4C5Bea62B0116de7962EE7315B7bcBce
    DateTime dateTime;
    
    // Proxy to relevant functions of Melon's CanonicalPriceFeed
    CanonicalPriceFeedHistory priceFeedHistory;
    
    // KOVAN ADDRESSES
    // pricefeed:   0xba5c3Ac4622A3E60A1AA6AD795f01A4BD366e684
    // datetime:    0x8077a8089b0cfedeaefe4967b8474aaeee933b06
    constructor(address canonicalPriceFeedAddress, address dateTimeAddress) public {
        priceFeedHistory = CanonicalPriceFeedHistory(canonicalPriceFeedAddress);
        dateTime = DateTime(dateTimeAddress);
    }
    
    // PROXY FUNCTIONS
    
    // token addresses, prices, timestamp
    function getHistoryAt(uint id) public view returns (address[], uint[], uint) {
        return priceFeedHistory.getHistoryAt(id);
    }
    
    function getHistoryLength() public view returns (uint) {
        return priceFeedHistory.getHistoryLength();
    }
    
    
    // Returns an array of the daily average prices of one token
    // The tokenIndex stems from the order of "getHistoryAt"
    function getDailyPriceHistory(uint tokenIndex, uint timeSpanStart, uint timeSpanEnd) public view returns (uint[]) {
        
        uint historyIndex = 0;
        uint historyEnd = getHistoryLength();
        
        address[] memory tokens;
        uint[] memory prices;
        uint timestamp;
        
        uint[] memory minutePrices = new uint[](1440); // (for second token atm)
        uint[] memory dailyPrices = new uint[](getNumberOfDaysToCalculate(timeSpanStart, timeSpanEnd));
        
        uint dayIndex = 0;
        uint minuteIndex = 0;


        // do-while style loop
        (tokens, prices, timestamp) = getHistoryAt(historyIndex);
        uint8 currentDay = dateTime.getDay(timestamp);
        
        while (historyIndex < historyEnd) {

            // TODO do this in external search, maybe binary?
            if (timestamp < timeSpanStart) {
                (tokens, prices, timestamp) = getHistoryAt(++historyIndex);
                continue;
            }
            
            if (timestamp > timeSpanEnd) {
                break;
            }
                        
            minutePrices[minuteIndex] = prices[tokenIndex];
            minuteIndex++;
            
            // calc next day
            (tokens, prices, timestamp) = getHistoryAt(++historyIndex);
            
            // calc if next day is reached at new timestamp (second value is possible next day)
            uint8 possibleNextDay = dateTime.getDay(timestamp);
            if (currentDay != possibleNextDay) {
                // next timestamp is in next day, do dailyAverage calculation
                dailyPrices[dayIndex] = calculateDailyAverage(minutePrices);
                dayIndex++;
                minuteIndex = 0;
            }
            
            currentDay = possibleNextDay;
        } 
        
        return dailyPrices;
    }
    
    function calculateDailyAverage(uint[] minutePrices) private pure returns (uint) {
        
        uint sum = 0;
        uint i = 0;
        uint summedCount = 0;
        while (i < minutePrices.length) {
            
            uint temp = minutePrices[i];
            
            // skip 0 values
            if (temp == 0) {
                i++;
                continue;
            }
            
            sum += temp;
            summedCount ++;
            i++;
        }
        
        return sum / summedCount;
    }
    
    function getNumberOfDaysToCalculate(uint timeSpanStart, uint timeSpanEnd) private pure returns (uint) {
        // number is rounded down, so +2 gives correct minimum days
        // this way, begun days are also respected
        return ((timeSpanEnd - timeSpanStart) / 86400) + 2;
    }
    
}