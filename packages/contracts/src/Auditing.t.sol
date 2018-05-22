pragma solidity ^0.4.21;

import "ds-test/test.sol";

import "./Auditing.sol";

contract AuditingTest is DSTest {
    Auditing auditing;


    address[] auditors;

    function setUp() public {
        address auditor1 = 0x0;
        address auditor2 = 0x1;
        auditors = [auditor1, auditor2];
        auditing = new Auditing(auditors);
    }

    function testFail_basic_sanity() public {
        assertTrue(false);
    }

    function test_basic_sanity() public {
        assertTrue(true);
    }
}
