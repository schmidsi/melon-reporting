pragma solidity ^0.4.21;

// TO DISCUSS:
// - require timespanEnd < now?

/// @title Auditing smart contract for melon.

contract Auditing {

    struct Audit {
        address auditor; // who audited the report
        bytes32 dataHash; // the first part of the report dataHash
        uint256 timespanStart; // the start timestamp of the report
        uint256 timespanEnd; // the end timestamp of the report
        Opinion opinion; // the audit class for this timespan
    }

    enum Opinion { 
        UnqualifiedOpinion, 
        QualifiedOpinion, 
        AdverseOpinion, 
        DisclaimerOfOpinion 
    }

    // for this mapping, a getter is created 
    // where we can retrieve audits by its fundAddress and position
    mapping(address => Audit[]) public fundAudits;

    // a list of all auditors that can use the `add()` function
    address[] public approvedAuditors;

    // events
    event Added(address _fundAddress, uint256 _index);

    /// Constructor
    function Auditing(address[] _approvedAuditors) public payable {
        approvedAuditors = _approvedAuditors;
    }

    /// Creates a new audit on a fund specified with `_fundAddress`,
    /// the hashed data in `_dataHash1` and `_dataHash2` and the timespan timestamps 
    /// in `_timespanStart` and `_timespanEnd`.
    function add(address _fundAddress, bytes32 _dataHash, uint256 _timespanStart, uint256 _timespanEnd, Opinion _opinion) 
            public {
        // check if the sender is an approved auditor with "require"
        require(isApprovedAuditor(msg.sender));

        Audit memory newAudit = Audit(msg.sender, _dataHash, _timespanStart, _timespanEnd, _opinion);
        uint256 index = insertAudit(_fundAddress, newAudit);

        emit Added(_fundAddress, index);
    }

    /// Validates that the provided data is mapped to an existing audit
    // TODO include opinion?
    function exists(address _fundAddress, address _auditor, bytes32 _dataHash) 
            public view 
            returns (bool auditExists) {
        Audit[] memory audits = fundAudits[_fundAddress];
        for (uint256 i = 0; i < audits.length; i++) {
            Audit memory audit = audits[i];
            if (audit.auditor == _auditor && audit.dataHash == _dataHash) {
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
            returns (address auditor, bytes32 dataHash, uint256 timespanStart, uint256 timespanEnd, Opinion opinion) {
        require(_index < fundAudits[_fundAddress].length); // index must be smaller than array length

        Audit memory audit = fundAudits[_fundAddress][_index];
        auditor = audit.auditor;
        dataHash = audit.dataHash;
        timespanStart = audit.timespanStart;
        timespanEnd = audit.timespanEnd;
        opinion = Opinion(audit.opinion);
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

    // TODO use insertion for new and out of place audit, then shift indexes
    /// Inserts the audit in the audit array of a fund.
    /// This inserts the audit by its timespanEnd value,
    /// so the resulting array is always sorted by timespanEnd
    /// => index 0 is audit with lowest timespanEnd.
    function insertAudit(address _fundAddress, Audit _audit) 
            private
            returns (uint256 insertIndex) {
        // search for first audit that has lower timespanEnd
        // TODO there might be a better implementation without the edge case check
        uint256 i = fundAudits[_fundAddress].length - 1; // array end index
        for (i; i >= 0; i--) {
            uint256 tempTimespanEnd = fundAudits[_fundAddress][i].timespanEnd;
            if (tempTimespanEnd <= _audit.timespanEnd) { // 
                // lower or equal timespanEnd found
                // NOTE: We break on equal timespanEnds, because the new audit probably
                // involves a longer time period. When the longer period is in front,
                // the isComplete function is more performant (can skip larger timespans).

                // TODO we might even check if the period is longer & insert by this!
                break;
            }
        }

        // validate edge case: audit might be inserted before audit at index 0
        if (i == 0 && fundAudits[_fundAddress][i].timespanEnd > _audit.timespanEnd) {
            insertIndex = 0;
        }
        else {
            insertIndex = i + 1;
        }

        // reassign indexes of audits that shall be in front of the new audit
        for (uint256 j = fundAudits[_fundAddress].length; j > insertIndex; j--) {
            fundAudits[_fundAddress][j] = fundAudits[_fundAddress][j - 1];
        }

        // insert new audit
        fundAudits[_fundAddress][insertIndex] = _audit;

        return insertIndex;
    }

    /*
    /// Returns true if a fund is completely audited over a specific timespan.
    function isComplete(address _fundAddress, uint256 _timespanStart, uint256 _timespanEnd)
            public view
            returns (bool complete) {
        Audit[] memory audits = fundAudits[_fundAddress];

        // use array that is sorted by enddates
        // TODO use algorithm that begins to check at the end of the array

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
    */

}