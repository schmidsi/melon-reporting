pragma solidity ^0.4.23;

import "./DateTime.sol";

// Relevant functions of Melon's CanonicalPriceFeed
interface CanonicalPriceFeedHistory {
    function getHistoryLength() 
    external 
    returns (uint);
    
    function getHistoryAt(uint id) 
    external 
    returns (address[], uint[], uint);
}

contract PriceHistoryReader {
    
    uint constant DAY_IN_SECONDS = 86400;
    uint constant MAX_PRICEFEED_ENTRIES = 1440; // one more than minutes in a day
    uint constant TOKEN_COUNT = 13; // the pricefeed contract serves 13 tokens at the moment
    
    // for deployment: use address on mainnet -> 0x1a6184CD4C5Bea62B0116de7962EE7315B7bcBce
    DateTime dateTime;
    
    // Proxy to relevant functions of Melon's CanonicalPriceFeed
    CanonicalPriceFeedHistory priceFeedHistory;
    
    // KOVAN ADDRESSES
    // pricefeed:   0xba5c3Ac4622A3E60A1AA6AD795f01A4BD366e684
    // datetime:    0x8077a8089b0cfedeaefe4967b8474aaeee933b06
    constructor(address canonicalPriceFeedAddress, address dateTimeAddress) 
    public {
        priceFeedHistory = CanonicalPriceFeedHistory(canonicalPriceFeedAddress);
        dateTime = DateTime(dateTimeAddress);
    }
    
    // PROXY FUNCTIONS
    
    // token addresses, prices, timestamp
    function getHistoryAt(uint id) 
    public view
    returns (address[], uint[], uint) {
        return priceFeedHistory.getHistoryAt(id);
    }
    
    function getHistoryLength() 
    public view 
    returns (uint) {
        return priceFeedHistory.getHistoryLength();
    }
    
    
    // Returns an array of the daily average prices of one token
    // The tokenIndex stems from the order of "getHistoryAt"
    function getAveragedPricesForDay(uint16 year, uint8 month, uint8 day)
    public view 
    returns (address[] tokenAddresses, uint[TOKEN_COUNT] averagedPrices) {
        
        require(month <= 12);
        require(day <= 31);
        
        uint[MAX_PRICEFEED_ENTRIES][TOKEN_COUNT] memory minutePrices; // minute prices for each token
        
        uint minuteIndex = 0;
        
        uint timeSpanStart = dateTime.toTimestamp(year, month, day, 0, 0, 0); // this day, 00:00:00
        uint timeSpanEnd = timeSpanStart + DAY_IN_SECONDS - 1; // this day, 23:59:59

        uint historyIndex = binarySearchForTimestamp(timeSpanStart, 0);
        uint historyEnd = binarySearchForTimestamp(timeSpanEnd, historyIndex);

        // do loop excluding the values at historyEnd, because they would be out of bound 
        while (historyIndex < historyEnd) {
            (, uint[] memory prices, ) = getHistoryAt(historyIndex);
            
            for (uint tokenIndex = 0; tokenIndex < TOKEN_COUNT; tokenIndex++) {
                minutePrices[tokenIndex][minuteIndex] = prices[tokenIndex];
            }
            
            minuteIndex++;
            historyIndex++;
        } 
        
        averagedPrices = calculateAveragePricesForeachToken(minutePrices);
        
        (tokenAddresses, , ) = getHistoryAt(0);
    }
    
    function calculateAveragePricesForeachToken(uint[MAX_PRICEFEED_ENTRIES][TOKEN_COUNT] minutePrices) 
    private pure
    returns (uint[TOKEN_COUNT] averagedPrices) {
        for (uint i = 0; i < TOKEN_COUNT; i++) {
            averagedPrices[i] = calculateAverage(minutePrices[i]);
        }
        return averagedPrices;
    }
    
    function calculateAverage(uint[MAX_PRICEFEED_ENTRIES] minutePrices) 
    private pure 
    returns (uint) {
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
    
    function getNumberOfMinutes(uint timeSpanStart, uint timeSpanEnd) 
    private pure 
    returns (uint) {
        return ((timeSpanEnd - timeSpanStart) / 60) + 1;
    }
    
    function binarySearchForTimestamp(uint timestampToFind, uint startingIndex) 
    private view 
    returns (uint foundAtIndex) {
        // problem with timestamps: the exact value we are looking for is 
        // probably not in the data, so we have to find the nearest to the 
        // "right" of the array. The nearest to the left would be out of bounds 
        // of our timeSpan...

        uint left = startingIndex;
        uint right = getHistoryLength();
        uint mid;
        
        uint timestamp;
        
        while (left <= right) {
            mid = (left + right) / 2;
            (, , timestamp) = getHistoryAt(mid);
            if (timestamp < timestampToFind) {
                left = mid + 1;
            } else if (timestamp > timestampToFind) {
                right = mid - 1;
            } else {
                return mid;
            }
        }
        
        // when element not found, return the next up index
        return mid+1;
    }
    
}