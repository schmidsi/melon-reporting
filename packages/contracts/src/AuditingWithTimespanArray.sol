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
            insertIndex = auditedTimespans.length-1;
            fundAudits[_fundAddress].push(_audit);
        } else {
            // insert by timespan start from end of array 
            // so that array is sorted and best performance is reached 
            // on normal case insert (insert after last audit)
            for (uint256 j = auditedTimespans.length-1; j > 0; j--) {
                if (_audit.timespanStart >= auditedTimespans[j].start) {
                    break;
                }
            }


            if (j == 0 && auditedTimespans[j].start > _audit.timespanStart) {
                insertIndex = 0;
            } else {
                insertIndex = j + 1;
            }


            // resize dynamic array
            auditedTimespans.length = auditedTimespans.length + 1;
            // reassign indexes of ranges that come after this timespan (shift)
            for (uint256 k = j; k < auditedTimespans.length-1; k++) {
                auditedTimespans[k+1] = auditedTimespans[k];
            }
            
            // insert
            //fundAudits[_fundAddress][insertIndex] = _audit;
            auditedTimespans[j] = Timespan(_audit.timespanStart, _audit.timespanEnd);

            // resize dynamic array
            fundAudits[_fundAddress].length = fundAudits[_fundAddress].length + 1;

            // reassign indexes of audits that shall be in front of the new audit
            for (uint256 a = fundAudits[_fundAddress].length - 1; a > insertIndex; a--) {
                fundAudits[_fundAddress][a] = fundAudits[_fundAddress][a - 1];
            }

            // insert new audit
            fundAudits[_fundAddress][insertIndex] = _audit;
            emit Added(0xfafafafafa, insertIndex);
        }

        for (uint s = 0; s < auditedTimespans.length; s++) {
            // sanity check TODO delete
            emit Added(0xfafa, auditedTimespans[s].start);
        }

        //auditedTimespans.push(Timespan(_audit.timespanStart, _audit.timespanEnd));

        // look for merge possibilities
        for (uint256 i = 0; i < auditedTimespans.length-1; i++) {
            // last timespan is not considered because there is no next span to merge with
            Timespan memory timespanMergeInto = auditedTimespans[i]; // TODO memory ok?
            Timespan memory timespanToMerge = auditedTimespans[i+1]; // TODO memory ok?

            bool mergeEnd = timespanMergeInto.end+1 >= timespanToMerge.start && timespanMergeInto.end < timespanToMerge.end;
            bool mergeStart = timespanMergeInto.start <= timespanToMerge.end+1 && timespanMergeInto.start > timespanToMerge.start;

            if (mergeEnd || mergeStart) {
                if (mergeEnd) {
                    // merge second in first
                    timespanMergeInto.end = timespanToMerge.end;
                }

                if (mergeStart) {
                    // merge second in first
                    timespanMergeInto.start = timespanToMerge.start;
                }

                auditedTimespans[i] = Timespan(timespanMergeInto.start, timespanMergeInto.end); // save back

                // delete second
                removeAuditedTimespan(_fundAddress, i+1);

            } else if (timespanMergeInto.start <= timespanToMerge.start && timespanMergeInto.end >= timespanToMerge.end) {
                // fully redundant timespan, delete
                removeAuditedTimespan(_fundAddress, i+1);
            }
        }

        // just add audit to end in this contract version
        //fundAudits[_fundAddress].push(_audit);

        //return fundAudits[_fundAddress].length - 1;
        return insertIndex;
    }

    function removeAuditedTimespan(address _fundAddress, uint index) private {
        delete auditedTimespansPerFund[_fundAddress][index];
        auditedTimespansPerFund[_fundAddress].length = auditedTimespansPerFund[_fundAddress].length-1;
    }

}