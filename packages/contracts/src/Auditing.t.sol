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
    function testAddAudit() public {
        addAudit(1, 1000);
    }

    function testAddMultipleAudits() public {
        // TODO
        //addAudit(1, 1000);
        //addAudit(1001, 2000);
    }

    /// Helper for adding a simple audit on specific timestamps
    function addAudit(uint timespanStart, uint timespanEnd) private {
        auditing.add(fundAddress, dataHash, timespanStart, timespanEnd, 0);
    }
}
