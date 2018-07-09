pragma solidity ^0.4.23;

import "ds-test/test.sol";

import "./AuditingFirst.sol";
import "./Auditing.sol";

contract AuditingBulkTestOne is DSTest {
    AuditingInterface auditing;
    AuditingInterface auditing2;
    address auditor1 = this; // this is the account that calls the functions of the contract
    address fundAddress = 0x1a; // for index shifting version
    address fundAddress2 = 0x1b; // for timespan array version
    bytes32 dataHash = "98dgf97d";

    address[] auditors;

    uint auditCount = 101;

    function setUp() public {
        auditors = [auditor1];
        auditing = new AuditingFirst(auditors);
        auditing2 = new Auditing(auditors);

        for (uint i = 100; i < auditCount; i++) {
            addStandardAudit(i, i+1); // for index shifting version
            addStandardAudit2(i, i+1); // for timespan array version
        }

    }

    function testAddOneAuditToArrayVar1End() public {
        addStandardAudit(auditCount, auditCount+1);
    }

    function testAddOneAuditToArrayVar2End() public {
        addStandardAudit2(auditCount, auditCount+1);
    }

    function testAddOneAuditToArrayVar1Start() public {
        addStandardAudit(99, 100);
    }

    function testAddOneAuditToArrayVar2Start() public {
        addStandardAudit2(99, 100);
    }

    /// Helper for adding a simple audit on specific timestamps.
    function addStandardAudit(uint timespanStart, uint timespanEnd) private {
        auditing.add(fundAddress, dataHash, timespanStart, timespanEnd, 0);
    }

    function addStandardAudit2(uint timespanStart, uint timespanEnd) private {
        auditing2.add(fundAddress2, dataHash, timespanStart, timespanEnd, 0);
    }

}