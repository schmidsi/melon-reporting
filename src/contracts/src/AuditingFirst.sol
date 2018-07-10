pragma solidity ^0.4.23;

import "./AuditingInterface.sol";

// TO DISCUSS:
// - require timespanEnd < now?

/// @title Auditing smart contract for melon.
contract AuditingFirst is AuditingInterface {

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
    constructor(address[] _approvedAuditors) public {
        approvedAuditors = _approvedAuditors;
    }

    /// Creates a new audit on a fund specified with `_fundAddress`,
    /// the hashed data in `_dataHash1` and `_dataHash2` and the timespan timestamps 
    /// in `_timespanStart` and `_timespanEnd`.
    function add(address _fundAddress, bytes32 _dataHash, uint256 _timespanStart, uint256 _timespanEnd, uint256 _opinion) 
            external {
        // check if the sender is an approved auditor with "require"
        require(this.isApprovedAuditor(msg.sender));

        Audit memory newAudit = Audit(msg.sender, _dataHash, _timespanStart, _timespanEnd, Opinion(_opinion));
        uint256 index = insertAudit(_fundAddress, newAudit);

        emit Added(_fundAddress, index);
    }

    /// Validates that the provided data is mapped to an existing audit
    // TODO include opinion?
    function exists(address _fundAddress, address _auditor, bytes32 _dataHash) 
            external view 
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
            external view
            returns (uint256 index) {
        return fundAudits[_fundAddress].length;
    }

    /// Returns the requested audit data
    function getByIndex(address _fundAddress, uint256 _index)
            external view
            returns (address auditor, bytes32 dataHash, uint256 timespanStart, uint256 timespanEnd, uint256 opinion) {
        require(_index < fundAudits[_fundAddress].length); // index must be smaller than array length

        Audit memory audit = fundAudits[_fundAddress][_index];
        auditor = audit.auditor;
        dataHash = audit.dataHash;
        timespanStart = audit.timespanStart;
        timespanEnd = audit.timespanEnd;
        opinion = uint256(audit.opinion);
    }

    /// Returns true if a fund is completely audited over a specific timespan.
    function isComplete(address _fundAddress, uint256 _timespanStart, uint256 _timespanEnd)
            external view
            returns (bool complete) {
        Audit[] memory audits = fundAudits[_fundAddress];

        // easy case: there are no audits at all
        if (audits.length == 0) { // TODO is this needed?
            return false;
        }

        // we expect the array to be sorted by enddates,
        // so we use an algorithm that begins to check at the end of the array
        // TODO start by end?
        for (uint256 i = 0; i < audits.length; i++) {
            Audit memory tempAudit = audits[i];

            // probably "if" is better            
            while (tempAudit.timespanEnd < _timespanStart) {
                continue; // skip until in scope
            }

            /*
            if (i + 1 == audits.length) {
                return false; // end of audits reached, but not end of provided scope
            }
            */

            //Audit memory nextAudit = audits[i];

            /*
            while (nextAudit.timespanEnd <= tempAudit.timespanEnd) {
                nextAudit = audits[i + 1];
            }
            */

            // TODO

            if (tempAudit.timespanStart >= _timespanEnd) {
                return true; // end of scope is reached, fund is audited up to timestamp
            }

            if (tempAudit.timespanEnd < _timespanStart || i+1 == audits.length) {
                return false; // gap was found or end of array is reached
            }
        }

        //return true;
    }

    function isApprovedAuditor(address _auditor) 
            external view
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

        // TODO: we can write the whole thing cleaner probably
        // edge case: no audits yet
        if (fundAudits[_fundAddress].length == 0) {
            fundAudits[_fundAddress].push(_audit);
            return 0;
        }

        // search for first audit that has lower timespanEnd
        // TODO there might be a better implementation without the edge case check
        uint256 i = fundAudits[_fundAddress].length - 1; // array end index
        for (i; i > 0; i--) {
            uint256 tempTimespanEnd = fundAudits[_fundAddress][i].timespanEnd;
            if (tempTimespanEnd <= _audit.timespanEnd) { // 
                // lower or equal timespanEnd found
                // NOTE: We break on equal timespanEnds, because the new audit probably
                // involves a longer time period. When the longer period is in front,
                // the isComplete function will perform better (can skip larger timespans).

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

        // resize dynamic array
        fundAudits[_fundAddress].length = fundAudits[_fundAddress].length + 1;

        // reassign indexes of audits that shall be in front of the new audit
        for (uint256 j = fundAudits[_fundAddress].length - 1; j > insertIndex; j--) {
            fundAudits[_fundAddress][j] = fundAudits[_fundAddress][j - 1];
        }

        // insert new audit
        fundAudits[_fundAddress][insertIndex] = _audit;

        return insertIndex;
    }

}