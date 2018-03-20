pragma solidity ^0.4.21;

/// @title Auditing smart contract for melon.
contract Auditing {

    struct Audit {
        address auditor;
        bytes32 dataHash;
        bytes32 signature;
        // absolute unix timestamp (seconds since 1970-01-01)
        uint timestamp;
    }

    // events
    event AuditReported(address fundAddress, uint position); // maybe log value types (address, bytes32...)

    // for this mapping, a getter is created 
    // where we can retrieve audits by its fundAddress and position
    mapping(address => Audit[]) public fundAudits;

    /// Create a new audit on a fund specified with `fundAddress`,
    /// the hashed data in `dataHash` and a `signature`.
    function audit(address fundAddress, bytes32 dataHash, bytes32 signature) public {
        // requires?
        // TODO
        Audit memory newAudit = Audit(msg.sender, dataHash, signature, now);
        fundAudits[fundAddress].push(newAudit);

        // signature contains vrs
        // check: ecrecover(datahash, v, r, s) == msg.sender

        uint index = fundAudits[fundAddress].length - 1;
        emit AuditReported(fundAddress, index);
    }

    // function verifyAudit(fundaddress, datahash, signature, auditor)
    // return bool if audit is on the blockchain (present in fundAudits)

    /// Get the last audit stored for a specific `fundAddress`.
    function getLastAudit(address fundAddress) 
        public view 
        returns (address auditor, bytes32 dataHash, bytes32 signature, uint timestamp) {
        Audit memory lastAudit = fundAudits[fundAddress][fundAudits[fundAddress].length - 1];
        auditor = lastAudit.auditor;
        dataHash = lastAudit.dataHash;
        signature = lastAudit.signature;
        timestamp = lastAudit.timestamp;
    }

    /// Get the amount of audits for a specific `fundAddress`
    function getAuditCount(address fundAddress)
        public view
        returns (uint count) {
        count = fundAudits[fundAddress].length;
    }

}
