pragma solidity ^0.4.21;

// TO DISCUSS:
// - uint256 as index required because of mapping
// - getByIndex is the same as using the getter of "fundAudits"

/// @title Auditing smart contract for melon.
contract Auditing {

    struct Audit {
        address auditor;
        bytes32 dataHash;
        // absolute unix timestamp (seconds since 1970-01-01)
        uint timestamp;
    }

    // events
    event Added(address _fundAddress, uint256 _index);

    // for this mapping, a getter is created 
    // where we can retrieve audits by its fundAddress and position
    mapping(address => Audit[]) public fundAudits;

    // TODO auditor approval through ctor
    mapping(address => address[]) public approvedAuditors;

    /// Creates a new audit on a fund specified with `fundAddress`,
    /// the hashed data in `dataHash` and a `signature`.
    function add(address _fundAddress, bytes32 _dataHash) 
            public {
        // TODO check if the sender is an approved auditor with "require"
        Audit memory newAudit = Audit(msg.sender, _dataHash, now);
        fundAudits[_fundAddress].push(newAudit);

        uint index = fundAudits[_fundAddress].length - 1;
        emit Added(_fundAddress, index);
    }

    /// Verifies that the provided data is mapped to an existing audit
    function verify(address _fundAddress, address _auditor, bytes32 _dataHash) 
            public view 
            returns (bool auditIsVerified) {
        Audit[] memory audits = fundAudits[_fundAddress];
        for (uint i = 0; i < audits.length; i++) {
            Audit memory audit = audits[i];
            if (audit.auditor == _auditor && audit.dataHash == _dataHash) {
                // audit is verified
                return true;
            }
        }
        // audit is not verified
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
            returns (bytes32 dataHash, address auditor, uint256 timestamp) {
        require(_index < fundAudits[_fundAddress].length); // index must be smaller than array length

        Audit memory audit = fundAudits[_fundAddress][_index];
        dataHash = audit.dataHash;
        auditor = audit.auditor;
        timestamp = audit.timestamp;
    }

}