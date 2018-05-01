pragma solidity ^0.4.21;

// TO DISCUSS:
// - split dataHash in 1 and 2?
// - require timespanEnd < now?

/// @title Auditing smart contract for melon.
contract Auditing {

    struct Audit {
        address auditor; // who audited the report
        bytes32 dataHash1; // the first part of the report dataHash
        bytes32 dataHash2; // the second part of the report dataHash
        uint256 timespanStart; // the start timestamp of the report
        uint256 timespanEnd; // the end timestamp of the report
    }

    // for this mapping, a getter is created 
    // where we can retrieve audits by its fundAddress and position
    mapping(address => Audit[]) public fundAudits;

    // a list of all auditors that can use the `add()` function
    address[] public approvedAuditors;

    // events
    event Added(address _fundAddress, uint256 _index);

    /// Constructor
    constructor(address[] _approvedAuditors) public payable {
        approvedAuditors = _approvedAuditors;
    }

    /// Creates a new audit on a fund specified with `_fundAddress`,
    /// the hashed data in `_dataHash1` and `_dataHash2` and the timespan timestamps 
    /// in `_timespanStart` and `_timespanEnd`.
    function add(address _fundAddress, bytes32 _dataHash1, bytes32 _dataHash2, uint256 _timespanStart, uint256 _timespanEnd) 
            public {
        // check if the sender is an approved auditor with "require"
        require(isApprovedAuditor(msg.sender));

        Audit memory newAudit = Audit(msg.sender, _dataHash1, _dataHash2, _timespanStart, _timespanEnd);
        fundAudits[_fundAddress].push(newAudit);

        uint256 index = fundAudits[_fundAddress].length - 1;
        emit Added(_fundAddress, index);
    }

    /// Validates that the provided data is mapped to an existing audit
    function exists(address _fundAddress, address _auditor, bytes32 _dataHash1, bytes32 _dataHash2) 
            public view 
            returns (bool auditExists) {
        Audit[] memory audits = fundAudits[_fundAddress];
        for (uint256 i = 0; i < audits.length; i++) {
            Audit memory audit = audits[i];
            if (audit.auditor == _auditor && audit.dataHash1 == _dataHash1 && audit.dataHash2 == _dataHash2) {
                // audit exists
                return true;
            }
        }
        // audit does not exist
        return false;
    }

    /// Returns the length of the audit array of a specific fund
    function getLength(address _fundAddress)
            public view
            returns (uint256 index) {
        return fundAudits[_fundAddress].length;
    }

    /// Returns the requested audit data
    function getByIndex(address _fundAddress, uint256 _index)
            public view
            returns (address auditor, bytes32 dataHash1, bytes32 dataHash2, uint256 timespanStart, uint256 timespanEnd) {
        require(_index < fundAudits[_fundAddress].length); // index must be smaller than array length

        Audit memory audit = fundAudits[_fundAddress][_index];
        auditor = audit.auditor;
        dataHash1 = audit.dataHash1;
        dataHash2 = audit.dataHash2;
        timespanStart = audit.timespanStart;
        timespanEnd = audit.timespanEnd;
    }

    function isApprovedAuditor(address _auditor) 
            public view
            returns (bool auditorIsApproved) {
        for (uint256 i = 0; i < approvedAuditors.length; i++) {
            address auditor = approvedAuditors[i];
            if (auditor == _auditor) {
                // auditor is approved
                return true;
            }
        }
        // auditor is not approved
        return false;
    }

    /// Returns true if a fund is completely audited over a specific timespan.
    function isComplete(address _fundAddress, uint256 _timespanStart, uint256 _timespanEnd)
            public view
            returns (bool complete) {
        Audit[] memory audits = fundAudits[_fundAddress];

        // pseudo-code for a possible implementation
        // sort array for timespanStart
        // for (i = 0; i < sortedArray.length; i++):
        //   audit = sortedArray[i]
        //   while audit.end < timespanStart:
        //     continue // skip until in scope
        //   nextIndex = i + 1
        //   nextAudit = sortedArray[nextIndex]
        //   while nextAudit.end <= audit.end:
        //     nextAudit = sortedArray[++nextIndex]
        //   if audit.end < nextAudit.start:
        //     return false // gap
        //   if nextAudit.start > timespanEnd:
        //     break // end of scope is reached

        return true;
    }

}