pragma solidity ^0.4.23;

import "ds-test/test.sol";

import "./AuditingFirst.sol";

contract AuditingFirstTest is DSTest {

    // TODO test that opinions like "4" fail

    AuditingInterface auditing;
    address auditor1 = this; // this is the account that calls the functions of the contract
    address auditor2 = 0x1;
    address nonAuditor = 0x2;
    address fundAddress = 0x3;
    bytes32 dataHash = "98dgf97d";
    string comment = "testcomment";

    address[] auditors;

    function setUp() public {
        auditors = [auditor1, auditor2];
        auditing = new AuditingFirst(auditors);
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

        assertTrue(auditing.getLength(fundAddress) == 1);
        /*
        assertTrue(standardAuditIsOnChain(0, timespanStart, timespanEnd));
        */
    }

    // Add multiple audits in order.
    function testAddMultipleAuditsInOrder() public {
        addStandardAudit(1, 1000); // must have index 0
        addStandardAudit(1001, 2000); // must have index 1

        assertTrue(auditing.getLength(fundAddress) == 2);
        /*
        assertTrue(standardAuditIsOnChain(0, 1, 1000));
        assertTrue(standardAuditIsOnChain(1, 1001, 2000));
        */
    }

    /// Add multiple audits in reverse order.
    /// This asserts that the insertAudit function in the contract works as expected.
    function testAddMultipleAuditsReverseOrder() public {
        addStandardAudit(1001, 2000); // must have index 1 despite added first
        addStandardAudit(1, 1000); // must have index 0

        assertTrue(auditing.getLength(fundAddress) == 2);
        /*
        assertTrue(standardAuditIsOnChain(0, 1, 1000));
        assertTrue(standardAuditIsOnChain(1, 1001, 2000));
        */
    }

    /// Add multiple audits in 2-0-1 order.
    /// This asserts that the insertAudit function in the contract works as expected.
    function testAddMultipleAudits201Order() public {
        addStandardAudit(2001, 3000); // must have index 2
        addStandardAudit(1, 1000); // must have index 0
        addStandardAudit(1001, 2000); // must have index 1

        assertTrue(auditing.getLength(fundAddress) == 3);
        /*
        assertTrue(standardAuditIsOnChain(0, 1, 1000));
        assertTrue(standardAuditIsOnChain(1, 1001, 2000));
        assertTrue(standardAuditIsOnChain(2, 2001, 3000));
        */
    }

    /// Add multiple audits in order.
    function testOrderingByTimespanEnd() public {
        addStandardAudit(100, 1000); // must have index 2
        addStandardAudit(200, 500); // must have index 0
        addStandardAudit(1, 600); // must have index 1

        assertTrue(auditing.getLength(fundAddress) == 3);
        /*
        assertTrue(standardAuditIsOnChain(0, 200, 500));
        assertTrue(standardAuditIsOnChain(1, 1, 600));
        assertTrue(standardAuditIsOnChain(2, 100, 1000));
        */
    }

    /// Test that the isComplete function returns the expected result.
    function testIsComplete() public {
        addStandardAudit(1, 999);
        addStandardAudit(1000, 2000);

        assert(auditing.isComplete(fundAddress, 500, 1500));
    }

    /// Test that the isComplete function returns true on fitting audits.
    function testIsCompleteFitting() public {
        addStandardAudit(1, 1000);
        addStandardAudit(1000, 2000);

        assert(auditing.isComplete(fundAddress, 1, 2000));
    }

    /// Test that the isComplete function returns the expected result.
    function testIsCompleteEndReached() public {
        addStandardAudit(1, 1000);
        addStandardAudit(1000, 2000);

        assert(!auditing.isComplete(fundAddress, 1, 2500));
    }

    /// Test that the isComplete function returns false when no audits are present.
    function testIsCompleteFalseOnNoAudits() public {
        assertTrue(!auditing.isComplete(fundAddress, 1, 1000));
    }

    /// Helper for adding a simple audit on specific timestamps.
    function addStandardAudit(uint timespanStart, uint timespanEnd) private {
        auditing.add(fundAddress, dataHash, timespanStart, timespanEnd, 0, comment);
    }

    /*
    // not possible due to string
    function standardAuditIsOnChain(uint256 index, uint256 timespanStart, uint256 timespanEnd) 
            private view returns (bool) {
        address a; 
        bytes32 d; 
        uint256 ts;
        uint256 te; 
        uint256 o;
        bytes32 c;

        (a, d, ts, te, o, c) = auditing.getByIndex(fundAddress, index);

        return (a == auditor1) && (d == dataHash) && (ts == timespanStart) && (te == timespanEnd) && (o == 0);
    }
    */

}
