pragma solidity ^0.4.23;

import "ds-test/test.sol";

import "./AuditingWithTimespanArray.sol";

contract AuditingWithTimespanArrayTest is DSTest {

    // TODO test that opinions like "4" fail

    AuditingWithTimespanArray auditing;
    //AuditingInterface auditing;
    address auditor1 = this; // this is the account that calls the functions of the contract
    address auditor2 = 0x1;
    address nonAuditor = 0x2;
    address fundAddress = 0x3;
    bytes32 dataHash = "98dgf97d";

    address[] auditors;

    function setUp() public {
        auditors = [auditor1, auditor2];
        auditing = new AuditingWithTimespanArray(auditors);
    }

    function testIsApprovedAuditor() public {
        assertTrue(auditing.isApprovedAuditor(auditor1));
        assertTrue(auditing.isApprovedAuditor(auditor2));
    }

    function testFailNonApprovedAuditor() public {
        assertTrue(auditing.isApprovedAuditor(nonAuditor));
    }

    /// No audits are added here, so isComplete must fail.
    function testFailIsCompleteWithoutAudits() public {
        assertTrue(auditing.isComplete(fundAddress, 1, 1000));
    }

    /// Add a simple audit to the test fund.
    function testAddAudit() public {
        uint256 timespanStart = 1;
        uint256 timespanEnd = 1000;

        addStandardAudit(timespanStart, timespanEnd);

        assertTrue(standardAuditIsOnChain(0, timespanStart, timespanEnd));
    }

    // Add two audits that fit, second is later.
    function testAddTwoFittingAuditsInOrderAdded() public {
        addStandardAudit(1, 1000);
        addStandardAudit(1001, 2000);

        uint start = auditing.getAuditedTimespanStart(fundAddress, 0);
        uint end = auditing.getAuditedTimespanEnd(fundAddress, 0);
        assertTrue(start == 1);
        assertTrue(end == 2000);

        // next timespan should be 0-0
        uint start2 = auditing.getAuditedTimespanStart(fundAddress, 1);
        uint end2 = auditing.getAuditedTimespanEnd(fundAddress, 1);
        assertTrue(start2 == 0);
        assertTrue(end2 == 0);
    }

    // Add two audits that fit, second is earlier.
    function testAddTwoFittingAuditsReverseOrderAdded() public {
        addStandardAudit(1001, 2000);
        addStandardAudit(1, 1000);

        uint start = auditing.getAuditedTimespanStart(fundAddress, 0);
        uint end = auditing.getAuditedTimespanEnd(fundAddress, 0);
        assertTrue(start == 1);
        assertTrue(end == 2000);

        // next timespan should be 0-0
        uint start2 = auditing.getAuditedTimespanStart(fundAddress, 1);
        uint end2 = auditing.getAuditedTimespanEnd(fundAddress, 1);
        assertTrue(start2 == 0);
        assertTrue(end2 == 0);
    }


    /// Add multiple audits with a gap.
    function testAddTwoAuditsWithGapInOrderAdded() public {
        addStandardAudit(100, 1000);
        addStandardAudit(2001, 3000);

        // two timespans should show up now
        uint start = auditing.getAuditedTimespanStart(fundAddress, 0);
        uint end = auditing.getAuditedTimespanEnd(fundAddress, 0);
        assertTrue(start == 100);
        assertTrue(end == 1000);

        uint start2 = auditing.getAuditedTimespanStart(fundAddress, 1);
        uint end2 = auditing.getAuditedTimespanEnd(fundAddress, 1);
        assertTrue(start2 == 2001);
        assertTrue(end2 == 3000);
    }

    /// Add multiple audits with a gap in reverse order.
    function testAddTwoAuditsWithGapReverseOrderAdded() public {
        addStandardAudit(2001, 3000);
        addStandardAudit(100, 1000);

        // two timespans should show up, 
        // but we do not order them, so first is first added
        uint start = auditing.getAuditedTimespanStart(fundAddress, 1);
        uint end = auditing.getAuditedTimespanEnd(fundAddress, 1);
        assertTrue(start == 100);
        assertTrue(end == 1000);

        uint start2 = auditing.getAuditedTimespanStart(fundAddress, 0);
        uint end2 = auditing.getAuditedTimespanEnd(fundAddress, 0);
        assertTrue(start2 == 2001);
        assertTrue(end2 == 3000);
    }

    function testAddTwoAuditsFullyOverlappingBiggerFirst() public {
        addStandardAudit(1, 2000);
        addStandardAudit(500, 1500);

        // only one timespan should show up
        uint start = auditing.getAuditedTimespanStart(fundAddress, 0);
        uint end = auditing.getAuditedTimespanEnd(fundAddress, 0);
        assertTrue(start == 1);
        assertTrue(end == 2000);

        // next timespan should be 0-0
        uint start2 = auditing.getAuditedTimespanStart(fundAddress, 1);
        uint end2 = auditing.getAuditedTimespanEnd(fundAddress, 1);
        assertTrue(start2 == 0);
        assertTrue(end2 == 0);
    }

    function testAddTwoAuditsFullyOverlappingSmallerFirst() public {
        addStandardAudit(500, 1500);
        addStandardAudit(1, 2000);

        // only one timespan should show up
        uint start = auditing.getAuditedTimespanStart(fundAddress, 0);
        uint end = auditing.getAuditedTimespanEnd(fundAddress, 0);
        assertTrue(start == 1);
        assertTrue(end == 2000);

        // next timespan should be 0-0
        uint start2 = auditing.getAuditedTimespanStart(fundAddress, 1);
        uint end2 = auditing.getAuditedTimespanEnd(fundAddress, 1);
        assertTrue(start2 == 0);
        assertTrue(end2 == 0);
    }

    /// Test that the isComplete function returns when no audits are present.
    function testIsCompleteFalseOnNoAudits() public {
        assertTrue(!auditing.isComplete(fundAddress, 1, 1000));
    }

    /// Helper for adding a simple audit on specific timestamps.
    function addStandardAudit(uint timespanStart, uint timespanEnd) private {
        auditing.add(fundAddress, dataHash, timespanStart, timespanEnd, 0);
    }

    function standardAuditIsOnChain(uint256 index, uint256 timespanStart, uint256 timespanEnd) 
            private view returns (bool) {
        address a; 
        bytes32 d; 
        uint256 ts;
        uint256 te; 
        uint256 o;

        (a, d, ts, te, o) = auditing.getByIndex(fundAddress, index);

        return (a == auditor1) && (d == dataHash) && (ts == timespanStart) && (te == timespanEnd) && (o == 0);
    }
}
