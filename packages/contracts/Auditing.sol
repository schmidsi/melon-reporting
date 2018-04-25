pragma solidity ^0.4.21;

// TO DISCUSS:
// - uint256 as index required because of mapping
// - getByIndex is the same as using the getter of "fundAudits"

/// @title Auditing smart contract for melon.
contract Auditing {

    struct Audit {
        address auditor; // who audited the report
        bytes32 dataHash; // the dataHash of the report
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
    /// the hashed data in `_dataHash` and the timespan timestamps 
    /// in `_timespanStart` and `_timespanEnd`.
    function add(address _fundAddress, bytes32 _dataHash, uint256 _timespanStart, uint256 _timespanEnd) 
            public {
        // check if the sender is an approved auditor with "require"
        require(isApprovedAuditor(msg.sender));

        Audit memory newAudit = Audit(msg.sender, _dataHash, _timespanStart, _timespanEnd);
        fundAudits[_fundAddress].push(newAudit);

        uint256 index = fundAudits[_fundAddress].length - 1;
        emit Added(_fundAddress, index);
    }

    /// Validates that the provided data is mapped to an existing audit
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

    /// Returns the last index of a specific fund
    function getLastIndex(address _fundAddress)
            public view
            returns (uint256 index) {
        Audit[] memory audits = fundAudits[_fundAddress];
        if (audits.length == 0) {
            // return maxvalue when no audits for a fund are stored
            return 2**256 - 1;
        } else {
            return audits.length - 1;
        }
    }

    /// Returns the requested audit data
    function getByIndex(address _fundAddress, uint256 _index)
            public view
            returns (address auditor, bytes32 dataHash, uint256 timespanStart, uint256 timespanEnd) {
        require(_index < fundAudits[_fundAddress].length); // index must be smaller than array length

        Audit memory audit = fundAudits[_fundAddress][_index];
        auditor = audit.auditor;
        dataHash = audit.dataHash;
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

}