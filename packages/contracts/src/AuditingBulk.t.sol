pragma solidity ^0.4.23;

import "ds-test/test.sol";

import "./Auditing.sol";
import "./AuditingWithTimespanArray.sol";

contract AuditingBulkTest is DSTest {
    AuditingInterface auditing;
    AuditingInterface auditing2;
    address auditor1 = this; // this is the account that calls the functions of the contract
    address fundAddress = 0x3; // for index shifting version
    address fundAddress2 = 0x4; // for timespan array version
    bytes32 dataHash = "98dgf97d";

    address[] auditors;

    function setUp() public {
        auditors = [auditor1];
        auditing = new Auditing(auditors);
        auditing2 = new AuditingWithTimespanArray(auditors);

        //uint auditCount = 101;
        uint auditCount = 110;
        //uint auditCount = 200;

        for (uint i = 100; i < auditCount; i++) {
            addStandardAudit(i, i+1); // for index shifting version
            addStandardAudit2(i, i+1); // for timespan array version
        }

    }

    function testAddOneAuditToArrayEnd() public {
        addStandardAudit(200, 201);
    }

    function testAddOneAuditToArrayEnd2() public {
        addStandardAudit2(200, 201);
    }

    function testAddOneAuditToArrayStart() public {
        addStandardAudit(99, 100);
    }

    function testAddOneAuditToArrayStart2() public {
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