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
    event AuditReported(address fundAddress, uint index);

    // for this mapping, a getter is created 
    // where we can retrieve audits by its fundAddress and position
    mapping(address => Audit[]) public fundAudits;

    /// Create a new audit on a fund specified with `fundAddress`,
    /// the hashed data in `dataHash` and a `signature`.
    function audit(address fundAddress, bytes32 dataHash, bytes32 signature) public {
        // requires?
        Audit memory newAudit = Audit(msg.sender, dataHash, signature, now);
        fundAudits[fundAddress].push(newAudit);

        // TODO
        // signature contains vrs
        // check: ecrecover(datahash, v, r, s) == msg.sender

        uint index = fundAudits[fundAddress].length - 1;
        emit AuditReported(fundAddress, index);
    }

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

    /// Returns true if the audit is on the blockchain (present in fundAudits)
    function verifyAudit(address fundAddress, bytes32 dataHash, bytes32 signature, address auditor)
            public view
            returns (bool found) {
        Audit[] memory audits = fundAudits[fundAddress];
        for (uint i = 0; i < audits.length; i++) {
            Audit memory tempAudit = audits[i];
            if (tempAudit.auditor == auditor && tempAudit.dataHash == dataHash && tempAudit.signature == signature) {
                return true;
            }
        }
        return false; // audit not found
    }

}
