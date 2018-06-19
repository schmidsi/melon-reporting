pragma solidity ^0.4.23;

import "./AuditingInterface.sol";

// TO DISCUSS:
// - require timespanEnd < now?

/// @title Auditing smart contract for melon.
contract AuditingWithTimespanArray is AuditingInterface {

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

    struct Timespan {
        uint256 start;
        uint256 end;
    }

    // for this mapping, a getter is created 
    // where we can retrieve audits by its fundAddress and position
    mapping(address => Audit[]) public fundAudits;

    mapping(address => Timespan[]) public auditedTimespansPerFund;

    function getAuditedTimespanStart(address _fundAddress, uint256 _index) 
            public view
            returns (uint256 start) {
        return auditedTimespansPerFund[_fundAddress][_index].start;
    }

    function getAuditedTimespanEnd(address _fundAddress, uint256 _index) 
            public view
            returns (uint256 end) {
        return auditedTimespansPerFund[_fundAddress][_index].end;
    }

    function getAuditedTimespansLength(address _fundAddress) 
            public view 
            returns (uint length) {
        return auditedTimespansPerFund[_fundAddress].length;
    }

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
        Timespan[] memory auditedTimespans = auditedTimespansPerFund[_fundAddress];

        //mapping(address => Timespan[]) public auditedTimespansPerFund;

        // TODO check if this is needed or case is covered by normal loop
        if (auditedTimespans.length == 0) {
            return false;
        }

        for (uint i = 0; i < auditedTimespans.length; i++) {
            Timespan memory timespan = auditedTimespans[i];
            if (timespan.start <= _timespanStart && timespan.end >= _timespanEnd) {
                return true; // completely audited for given timespan
            }
        }
        return false;

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

    /// Inserts the audit in the audit array of a fund.
    /// This version is optimized for audits that extend 
    /// the audited timespan in regular fashion (at end of array)
    function insertAudit(address _fundAddress, Audit _audit) 
            private
            returns (uint256 insertIndex) {

        Timespan[] storage auditedTimespans = auditedTimespansPerFund[_fundAddress];

        if (auditedTimespans.length == 0 || auditedTimespans[auditedTimespans.length-1].start <= _audit.timespanStart) {
            // TODO second case here might be already done by loop below with length-1
            // check normal case first
            auditedTimespans.push(Timespan(_audit.timespanStart, _audit.timespanEnd));
        } else {
            // irregular audit, might be insert in between existing timespans
            shiftAndInsertTimespan(_fundAddress, _audit);
        }

        // look for merge possibilities
        bool fullyMerged = auditedTimespans.length < 2;
        uint256 i = 0;
        while (!fullyMerged) {
            Timespan memory timespanMergeInto = auditedTimespans[i];
            Timespan memory timespanToMerge = auditedTimespans[i+1];

            bool mergeStart = timespanMergeInto.start <= timespanToMerge.end+1 && timespanMergeInto.start > timespanToMerge.start;
            bool mergeEnd = timespanMergeInto.end+1 >= timespanToMerge.start && timespanMergeInto.end < timespanToMerge.end;

            if (mergeStart || mergeEnd) {
                if (mergeStart) {
                    // merge second in first
                    timespanMergeInto.start = timespanToMerge.start;
                }

                if (mergeEnd) {
                    // merge second in first
                    timespanMergeInto.end = timespanToMerge.end;
                }

                auditedTimespans[i] = Timespan(timespanMergeInto.start, timespanMergeInto.end); // save back

                // delete second
                removeAuditedTimespan(auditedTimespans, i+1);

            } else if (timespanMergeInto.start <= timespanToMerge.start && timespanMergeInto.end >= timespanToMerge.end) {
                // fully redundant timespan (case 2.7), delete
                removeAuditedTimespan(auditedTimespans, i+1);
            } else {
                // nothing was removed, go to next value
                i++;
            }

            // last timespan is not considered because there is no next span to merge with
            // also, if there is only one value or zero, there is nothing to be merged
            fullyMerged = i == auditedTimespans.length-1 || auditedTimespans.length < 2;
        }

        // ordering of audits does not matter in this version, just add audit to end of array
        fundAudits[_fundAddress].push(_audit);
        insertIndex = fundAudits[_fundAddress].length;

        return insertIndex;
    }

    function shiftAndInsertTimespan(address _fundAddress, Audit _audit) 
            private {

        // TODO comments like in Auditing.sol

        Timespan[] storage auditedTimespans = auditedTimespansPerFund[_fundAddress];
        uint256 insertIndex;

        uint256 i = auditedTimespans.length - 1;
        // sort by start
        for (i; i > 0; i--) {
            uint256 tempStart = auditedTimespans[i].start;
            if (tempStart <= _audit.timespanStart) {
                break;
            }
        }

        if (i == 0 && auditedTimespans[i].start > _audit.timespanStart) {
            insertIndex = 0;
        }
        else {
            insertIndex = i + 1;
        }

        // resize dynamic array
        auditedTimespans.length = auditedTimespans.length + 1;

        // reassign indexes of timespans that shall be in front of the new timespan
        for (uint256 j = auditedTimespans.length - 1; j > insertIndex; j--) {
            auditedTimespans[j] = auditedTimespans[j - 1];
        }

        // insert new timespan
        auditedTimespans[insertIndex] = Timespan(_audit.timespanStart, _audit.timespanEnd);
    }

    function removeAuditedTimespan(Timespan[] storage auditedTimespans, uint index) private {
        delete auditedTimespans[index];

        // shift indexes until gap is closed
        for (uint256 i = index; i < auditedTimespans.length-1; i++) {
            auditedTimespans[index] = auditedTimespans[index+1];
        }

        auditedTimespans.length = auditedTimespans.length-1;
    }

}