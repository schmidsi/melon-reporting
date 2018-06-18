pragma solidity ^0.4.23;

import "ds-test/test.sol";

import "./AuditingWithTimespanArray.sol";

contract AuditingWithTimespanArrayTest is DSTest {

    // TODO test that opinions like "4" fail

    AuditingInterface auditing;
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

    function testIsApprovedAuditor() public view {
        assert(auditing.isApprovedAuditor(auditor1));
        assert(auditing.isApprovedAuditor(auditor2));
    }

    function testFailNonApprovedAuditor() public view {
        assert(auditing.isApprovedAuditor(nonAuditor));
    }

    /// No audits are added here, so isComplete must fail.
    function testFailIsCompleteWithoutAudits() public view {
        assert(auditing.isComplete(fundAddress, 1, 1000));
    }

    /// Add a simple audit to the test fund.
    function testAddAudit() public {
        uint256 timespanStart = 1;
        uint256 timespanEnd = 1000;

        addStandardAudit(timespanStart, timespanEnd);

        assert(standardAuditIsOnChain(0, timespanStart, timespanEnd));
    }

    // Add two audits that fit, second is later.
    function testTwoFittingAuditsEnd() public {
        addStandardAudit(1, 1000);
        addStandardAudit(1001, 2000);

        // assert TODO
    }

    // Add two audits that fit, second is earlier.
    function testAddTwoFittingAuditsStart() public {
        addStandardAudit(1001, 2000);
        addStandardAudit(1, 1000);

        // assert TODO
    }


    /// Add multiple audits with a gap.
    function testAddTwoAuditsWithGap() public {
        addStandardAudit(100, 1000);
        addStandardAudit(2001, 3000);

        // assert TODO
    }

    /// Test that the isComplete function returns when no audits are present.
    function testIsCompleteFalseOnNoAudits() public view {
        assert(!auditing.isComplete(fundAddress, 1, 1000));
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
