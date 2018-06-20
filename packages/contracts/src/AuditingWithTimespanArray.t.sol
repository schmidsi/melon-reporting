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

    /// 1
    /// Add a simple audit to the test fund.
    function testAddAudit() public {
        uint256 timespanStart = 1;
        uint256 timespanEnd = 1000;

        addStandardAudit(timespanStart, timespanEnd);

        assertTrue(standardAuditIsOnChain(0, timespanStart, timespanEnd));

        // only one timespan should show up
        assertTrue(timespanIsOnChain(0, 1, 1000));

        // timespan array should only hold one value
        assertTrue(auditing.getAuditedTimespansLength(fundAddress) == 1);
    }

    // 2.1
    // Add two audits that fit, second is later.
    function testAddTwoFittingAuditsInOrder() public {
        addStandardAudit(1, 1000);
        addStandardAudit(1001, 2000);

        // only one timespan should show up
        assertTrue(timespanIsOnChain(0, 1, 2000));

        // timespan array should only hold one value
        assertTrue(auditing.getAuditedTimespansLength(fundAddress) == 1);
    }

    // 2.2
    // Add two audits that fit, second is earlier.
    function testAddTwoFittingAuditsReverseOrder() public {
        addStandardAudit(1001, 2000);
        addStandardAudit(1, 1000);

        // only one timespan should show up
        assertTrue(timespanIsOnChain(0, 1, 2000));

        // timespan array should only hold one value
        assertTrue(auditing.getAuditedTimespansLength(fundAddress) == 1);
    }

    // 2.3
    // Add two audits which overlap, second is later.
    function testAddTwoAuditsOverlapInOrder() public {
        addStandardAudit(1, 1000);
        addStandardAudit(501, 1500);

        // only one timespan should show up
        assertTrue(timespanIsOnChain(0, 1, 1500));

        // timespan array should only hold one value
        assertTrue(auditing.getAuditedTimespansLength(fundAddress) == 1);
    }

    // 2.4
    // Add two audits that fit, second is earlier.
    function testAddTwoAuditsOverlapReverseOrder() public {
        addStandardAudit(501, 2000);
        addStandardAudit(1, 1500);

        // only one timespan should show up
        assertTrue(timespanIsOnChain(0, 1, 2000));

        // timespan array should only hold one value
        assertTrue(auditing.getAuditedTimespansLength(fundAddress) == 1);
    }

    // 2.5
    // Add two audits with a gap, second is later.
    function testAddTwoAuditsWithGapInOrder() public {
        addStandardAudit(1, 1000);
        addStandardAudit(2001, 3000);

        // two timespans should show up
        assertTrue(timespanIsOnChain(0, 1, 1000));
        assertTrue(timespanIsOnChain(1, 2001, 3000));

        // timespan array should hold two values
        assertTrue(auditing.getAuditedTimespansLength(fundAddress) == 2);
    }

    /// 2.6
    /// Add two audits with a gap, first is later.
    function testAddTwoAuditsWithGapReverseOrder() public {
        addStandardAudit(2001, 3000);
        addStandardAudit(1, 1000);

        // two timespans should show up
        assertTrue(timespanIsOnChain(0, 1, 1000));
        assertTrue(timespanIsOnChain(1, 2001, 3000));

        // timespan array should hold two values
        assertTrue(auditing.getAuditedTimespansLength(fundAddress) == 2);
    }

    /// 2.7
    function testAddTwoAuditsFullyOverlappingSmallerFirst() public {
        addStandardAudit(500, 1500);
        addStandardAudit(1, 2000);

        // only one timespan should show up
        assertTrue(timespanIsOnChain(0, 1, 2000));

        // timespan array should only hold one value
        assertTrue(auditing.getAuditedTimespansLength(fundAddress) == 1);
    }

    /// 2.8
    function testAddTwoAuditsFullyOverlappingBiggerFirst() public {
        addStandardAudit(1, 2000);
        addStandardAudit(500, 1500);

        // only one timespan should show up
        assertTrue(timespanIsOnChain(0, 1, 2000));

        // timespan array should only hold one value
        assertTrue(auditing.getAuditedTimespansLength(fundAddress) == 1);
    }

    /// 2.9
    function testAddTwoAuditsSameFit() public {
        addStandardAudit(1, 1000);
        addStandardAudit(1, 1000);

        // only one timespan should show up
        assertTrue(timespanIsOnChain(0, 1, 1000));

        // timespan array should only hold one value
        assertTrue(auditing.getAuditedTimespansLength(fundAddress) == 1);
    }

    /// 3.1
    function testAddThreeAuditsAllFitting123Order() public {
        addStandardAudit(1, 1000);
        addStandardAudit(1001, 2000);
        addStandardAudit(2001, 3000);

        // only one timespan should show up
        assertTrue(timespanIsOnChain(0, 1, 3000));

        // timespan array should only hold one value
        assertTrue(auditing.getAuditedTimespansLength(fundAddress) == 1);
    }

    /// 3.2
    function testAddThreeAuditsAllFitting132Order() public {
        addStandardAudit(1, 1000);
        addStandardAudit(2001, 3000);
        addStandardAudit(1001, 2000);

        // only one timespan should show up
        assertTrue(timespanIsOnChain(0, 1, 3000));

        // timespan array should only hold one value
        assertTrue(auditing.getAuditedTimespansLength(fundAddress) == 1);
    }

    /// 3.3
    function testAddThreeAuditsAllFitting312Order() public {
        addStandardAudit(2001, 3000);
        addStandardAudit(1, 1000);
        addStandardAudit(1001, 2000);

        // only one timespan should show up
        assertTrue(timespanIsOnChain(0, 1, 3000));

        // timespan array should only hold one value
        assertTrue(auditing.getAuditedTimespansLength(fundAddress) == 1);
    }

    /// 3.4
    function testAddThreeAuditsAllFitting321Order() public {
        addStandardAudit(2001, 3000);
        addStandardAudit(1001, 2000);
        addStandardAudit(1, 1000);

        // only one timespan should show up
        assertTrue(timespanIsOnChain(0, 1, 3000));

        // timespan array should only hold one value
        assertTrue(auditing.getAuditedTimespansLength(fundAddress) == 1);
    }

    /// 3.5
    function testAddThreeAuditsOverlap132Order() public {
        addStandardAudit(1, 1000);
        addStandardAudit(2001, 3000);
        addStandardAudit(501, 2500);

        // only one timespan should show up
        assertTrue(timespanIsOnChain(0, 1, 3000));

        // timespan array should only hold one value
        assertTrue(auditing.getAuditedTimespansLength(fundAddress) == 1);
    }

    /// 3.6
    function testAddThreeAudits12Fit132Order() public {
        addStandardAudit(1, 1000);
        addStandardAudit(2001, 3000);
        addStandardAudit(1000, 1500);

        // two timespans should show up
        assertTrue(timespanIsOnChain(0, 1, 1500));
        assertTrue(timespanIsOnChain(1, 2001, 3000));

        // timespan array should hold two values
        assertTrue(auditing.getAuditedTimespansLength(fundAddress) == 2);
    }

    /// 3.7
    function testAddThreeAudits23Fit132Order() public {
        addStandardAudit(1, 1000);
        addStandardAudit(2001, 3000);
        addStandardAudit(1501, 2000);

        // two timespans should show up
        assertTrue(timespanIsOnChain(0, 1, 1000));
        assertTrue(timespanIsOnChain(1, 1501, 3000));

        // timespan array should hold two values
        assertTrue(auditing.getAuditedTimespansLength(fundAddress) == 2);
    }

    /// 3.8
    function testAddThreeAudits23OverlapFully132Order() public {
        addStandardAudit(1, 1000);
        addStandardAudit(2001, 3000);
        addStandardAudit(1501, 3500);

        // two timespans should show up
        assertTrue(timespanIsOnChain(0, 1, 1000));
        assertTrue(timespanIsOnChain(1, 1501, 3500));

        // timespan array should hold two values
        assertTrue(auditing.getAuditedTimespansLength(fundAddress) == 2);
    }

    /// 3.9
    function testAddThreeAudits12OverlapFully132Order() public {
        addStandardAudit(501, 1000);
        addStandardAudit(2001, 3000);
        addStandardAudit(1, 1500);

        // two timespans should show up
        assertTrue(timespanIsOnChain(0, 1, 1500));
        assertTrue(timespanIsOnChain(1, 2001, 3000));

        // timespan array should hold two values
        assertTrue(auditing.getAuditedTimespansLength(fundAddress) == 2);
    }

    /// 3.10
    function testAddThreeAudits1OverlapsAll132Order() public {
        addStandardAudit(1, 1000);
        addStandardAudit(2001, 3000);
        addStandardAudit(1, 3000);

        // only one timespan should show up
        assertTrue(timespanIsOnChain(0, 1, 3000));

        // timespan array should only hold one value
        assertTrue(auditing.getAuditedTimespansLength(fundAddress) == 1);
    }

    /// 3.11
    function testAddThreeAudits1Overlaps1More132Order() public {
        addStandardAudit(501, 1000);
        addStandardAudit(2501, 3000);
        addStandardAudit(1, 3000);

        // only one timespan should show up
        assertTrue(timespanIsOnChain(0, 1, 3000));

        // timespan array should only hold one value
        assertTrue(auditing.getAuditedTimespansLength(fundAddress) == 1);
    }

    /// 3.12
    function testAddThreeAuditsAllOverlap321Order() public {
        addStandardAudit(1, 1000);
        addStandardAudit(501, 2000);
        addStandardAudit(1501, 2500);

        // only one timespan should show up
        assertTrue(timespanIsOnChain(0, 1, 2500));

        // timespan array should only hold one value
        assertTrue(auditing.getAuditedTimespansLength(fundAddress) == 1);
    }

    /// 3.13
    function testAddThreeAuditsAllOverlap312Order() public {
        addStandardAudit(1501, 2500);
        addStandardAudit(1, 1000);
        addStandardAudit(501, 2000);

        // only one timespan should show up
        assertTrue(timespanIsOnChain(0, 1, 2500));

        // timespan array should only hold one value
        assertTrue(auditing.getAuditedTimespansLength(fundAddress) == 1);
    }

    /// Closing a deep gap test.
    function testCloseDeepGap() public {
        addStandardAudit(1, 1000);
        addStandardAudit(1001, 2000);
        // here is the gap
        addStandardAudit(3001, 4000);
        addStandardAudit(4001, 5000);
        addStandardAudit(5001, 6000);
        addStandardAudit(6001, 7000);
        // then close the gap:
        addStandardAudit(2001, 3000);

        // only one timespan should show up
        assertTrue(timespanIsOnChain(0, 1, 7000));

        // timespan array should only hold one value
        assertTrue(auditing.getAuditedTimespansLength(fundAddress) == 1);
    }

    function testIsComplete1243Order() public {
        addStandardAudit(1, 1000);
        addStandardAudit(1001, 2000);
        addStandardAudit(3001, 4000);
        addStandardAudit(2001, 3000);

        assertTrue(auditing.isComplete(fundAddress, 1, 4000));
    }

    /// Test that the isComplete function returns when no audits are present.
    function testIsCompleteFalseOnNoAudits() public {
        assertTrue(!auditing.isComplete(fundAddress, 1, 1000));
    }

    function timespanIsOnChain(uint index, uint expectedStart, uint expectedEnd) 
            private view 
            returns (bool) {
        uint start = auditing.getAuditedTimespanStart(fundAddress, index);
        uint end = auditing.getAuditedTimespanEnd(fundAddress, index);
        return (start == expectedStart) && (end == expectedEnd);
    }

    /// Helper for adding a simple audit on specific timestamps.
    function addStandardAudit(uint timespanStart, uint timespanEnd) private {
        auditing.add(fundAddress, dataHash, timespanStart, timespanEnd, 0);
    }

    function standardAuditIsOnChain(uint256 index, uint256 timespanStart, uint256 timespanEnd) 
            private view 
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
