pragma solidity ^0.4.21;

/// @title Auditing smart contract for melon.
contract Auditing {

    struct Audit {
        address auditor;
        bytes32 dataHash;
        bytes32 r;
        bytes32 s;
        uint8 v;
        // absolute unix timestamp (seconds since 1970-01-01)
        uint timestamp;
    }

    // events
    event AuditReported(address _fundAddress, uint _index);

    // for this mapping, a getter is created 
    // where we can retrieve audits by its fundAddress and position
    mapping(address => Audit[]) public fundAudits;

    /// Create a new audit on a fund specified with `fundAddress`,
    /// the hashed data in `dataHash` and a `signature`.
    function audit(address _fundAddress, bytes32 _dataHash, bytes32 _r, bytes32 _s, uint8 _v) 
            public {
        require(checkSignature(_dataHash, _r, _s, _v, msg.sender));

        Audit memory newAudit = Audit(msg.sender, _dataHash, _r, _s, _v, now);
        fundAudits[_fundAddress].push(newAudit);

        uint index = fundAudits[_fundAddress].length - 1;
        emit AuditReported(_fundAddress, index);
    }

    /// Get the last audit stored for a specific `fundAddress`.
    function getLastAudit(address _fundAddress) 
            public view 
            returns (address auditor, bytes32 dataHash, bytes32 r, bytes32 s, uint8 v, uint timestamp) {
        Audit memory lastAudit = fundAudits[_fundAddress][fundAudits[_fundAddress].length - 1];
        auditor = lastAudit.auditor;
        dataHash = lastAudit.dataHash;
        r = lastAudit.r;
        s = lastAudit.s;
        v = lastAudit.v;
        timestamp = lastAudit.timestamp;
    }

    /// Get the amount of audits for a specific `fundAddress`
    function getAuditCount(address _fundAddress)
            public view
            returns (uint count) {
        count = fundAudits[_fundAddress].length;
    }

    /// Returns true if the audit is on the blockchain (present in fundAudits)
    function verifyAudit(address _fundAddress, bytes32 _dataHash, bytes32 _r, bytes32 _s, uint8 _v, address _auditor)
            public view
            returns (bool found) {
        Audit[] memory audits = fundAudits[_fundAddress];
        for (uint i = 0; i < audits.length; i++) {
            Audit memory tempAudit = audits[i];
            if (tempAudit.auditor == _auditor && tempAudit.dataHash == _dataHash && tempAudit.r == _r && tempAudit.s == _s && tempAudit.v == _v) {
                return true;
            }
        }
        return false; // audit not found
    }

    /// Check if the signature and datahash corresponds with the sender
    function checkSignature(bytes32 _dataHash, bytes32 _r, bytes32 _s, uint8 _v, address _sender)
            public 
            pure
            returns (bool signatureVerified) {
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHash = keccak256(prefix, _dataHash);
        address recoveredAddress = ecrecover(prefixedHash, _v, _r, _s);
        return _sender == recoveredAddress;
    }

}