pragma solidity ^0.4.23;

import "ds-test/test.sol";

import "./PriceHistoryReader.sol";

contract PriceHistoryReaderTest is DSTest {

    PriceHistoryReader priceHistoryReader; 

    address sender = this; // this is the account that calls the functions of the contract

    function setUp() public {
    }

    function testGet() public {
    }

}
