pragma solidity ^0.4.23;

/// @title Interface for Auditing Contract
/// @author Benjamin Zumbrunn <benzumbrunn@gmail.com>
interface AuditingInterface {

    /// External functions
    function add(
        address _fundAddress, 
        bytes32 _dataHash, 
        uint256 _timespanStart, 
        uint256 _timespanEnd, 
        uint256 _opinion,
        string _comment
    ) external;

    function exists(
        address _fundAddress, 
        address _auditor, 
        bytes32 _dataHash
    ) external view returns (bool auditExists);

    function getLength(
        address _fundAddress
    ) external view returns (uint256 index);

    function getByIndex(
        address _fundAddress, 
        uint256 _index
    ) external view returns (
        address auditor, 
        bytes32 dataHash, 
        uint256 timespanStart, 
        uint256 timespanEnd, 
        uint256 opinion,
        string comment,
        uint256 timestamp
    );

    function isApprovedAuditor(
        address _auditor
    ) external view returns (bool auditorIsApproved);

    function isComplete(
        address _fundAddress, 
        uint256 _timespanStart, 
        uint256 _timespanEnd
    ) external view returns (bool complete);

    /// Events
    event Added(address _fundAddress, uint256 _index);
}