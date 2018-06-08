pragma solidity ^0.4.23;

import "ds-test/test.sol";

import "./Auditing.sol";

contract AuditingTest is DSTest {
    Auditing auditing;
    address auditor1 = this; // this is the account that calls the functions of the contract
    address auditor2 = 0x1;
    address nonAuditor = 0x2;
    address fundAddress = 0x3;
    bytes32 dataHash = "98dgf97d";

    address[] auditors;

    function setUp() public {
        auditors = [auditor1, auditor2];
        auditing = new Auditing(auditors);
    }

    function testIsApprovedAuditor() public {
        assert(auditing.isApprovedAuditor(auditor1));
        assert(auditing.isApprovedAuditor(auditor2));
    }

    function testFailNonApprovedAuditor() public {
        assert(auditing.isApprovedAuditor(nonAuditor));
    }

    /// no audits yet, so isComplete should fail
    function testFailIsCompleteWithoutAudits() public {
        assert(auditing.isComplete(fundAddress, 1, 1000));
    }

    /// add a simple audit to the test fund
    function testaddAudit() public {
        uint256 timespanStart = 1;
        uint256 timespanEnd = 1000;

        addStandardAudit(timespanStart, timespanEnd);

        assert(isStandardAudit(0, timespanStart, timespanEnd));
    }

    function testAddMultipleAudits() public {
        addStandardAudit(1, 1000);
        addStandardAudit(1001, 2000);
    }

    /// Helper for adding a simple audit on specific timestamps
    function addStandardAudit(uint timespanStart, uint timespanEnd) private {
        auditing.add(fundAddress, dataHash, timespanStart, timespanEnd, 0);
    }

    function isStandardAudit(uint256 index, uint256 timespanStart, uint256 timespanEnd) 
            private
            returns (bool) {
        address a; 
        bytes32 d; 
        uint256 ts;
        uint256 te; 
        uint256 o;

        (a, d, ts, te, o) = auditing.getByIndex(fundAddress, index);

        return (a == auditor1) && (d == dataHash) && (ts == timespanStart) && (te == timespanEnd) && (o == 0);
    }
}
