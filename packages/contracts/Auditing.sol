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
    event AuditReported(address _fundAddress, uint _index);

    // for this mapping, a getter is created 
    // where we can retrieve audits by its fundAddress and position
    mapping(address => Audit[]) public fundAudits;

    /// Create a new audit on a fund specified with `fundAddress`,
    /// the hashed data in `dataHash` and a `signature`.
    function audit(address _fundAddress, bytes32 _dataHash, bytes32 _signature) 
            public {
        require(checkSignature(_dataHash, _signature, msg.sender));

        Audit memory newAudit = Audit(msg.sender, _dataHash, _signature, now);
        fundAudits[_fundAddress].push(newAudit);

        uint index = fundAudits[_fundAddress].length - 1;
        emit AuditReported(_fundAddress, index);
    }

    /// Get the last audit stored for a specific `fundAddress`.
    function getLastAudit(address _fundAddress) 
            public view 
            returns (address auditor, bytes32 dataHash, bytes32 signature, uint timestamp) {
        Audit memory lastAudit = fundAudits[_fundAddress][fundAudits[_fundAddress].length - 1];
        auditor = lastAudit.auditor;
        dataHash = lastAudit.dataHash;
        signature = lastAudit.signature;
        timestamp = lastAudit.timestamp;
    }

    /// Get the amount of audits for a specific `fundAddress`
    function getAuditCount(address _fundAddress)
            public view
            returns (uint count) {
        count = fundAudits[_fundAddress].length;
    }

    /// Returns true if the audit is on the blockchain (present in fundAudits)
    function verifyAudit(address _fundAddress, bytes32 _dataHash, bytes32 _signature, address _auditor)
            public view
            returns (bool found) {
        Audit[] memory audits = fundAudits[_fundAddress];
        for (uint i = 0; i < audits.length; i++) {
            Audit memory tempAudit = audits[i];
            if (tempAudit.auditor == _auditor && tempAudit.dataHash == _dataHash && tempAudit.signature == _signature) {
                return true;
            }
        }
        return false; // audit not found
    }

    /// Check if the signature and datahash corresponds with the sender
    function checkSignature(bytes32 _dataHash, bytes32 _signature, address _sender)
            private
            pure
            returns (bool signatureVerified) {
        bytes32 r;
        bytes32 s;
        uint8 v;

        bytes memory sig = substring(_signature, 2, 132);

        if (v < 27) {
            v += 27;
        }

        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }

        address recoveredAddress = ecrecover(_dataHash, v, r, s);
        return _sender == recoveredAddress;
    }

    /// Helper function for checkSignature()
    function substring(bytes32 _str, uint _startIndex, uint _endIndex) 
            public pure 
            returns (bytes) {
        require(_startIndex <= _endIndex);
        require(_startIndex >= 0);
        require(_endIndex <= _str.length);

        bytes memory result = new bytes(_endIndex - _startIndex);
        for (uint i = _startIndex; i < _endIndex; i++) {
            result[i - _startIndex] = _str[i];
        }
        return bytes(result);
    }

}