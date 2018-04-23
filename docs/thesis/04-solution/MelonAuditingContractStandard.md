# Melon Auditing Contract Standard

```
MIP: 1
Title: Melon Auditing
Author: Benjamin Zumbrunn, benzumbrunn@gmail.com
Status: Draft
Type: MIP
Created: 2018-04-03
Resolution: ...
Reference implementation: ...
```

## Abstract


## Motivation


## Methods

### add
```
function add(address _fundAddress, bytes32 _dataHash) returns (bool)
```
Requires that the `_dataHash` is unique per fund.
If a document is audited, the information of the audit is added to a new version of the document, thus with each audit, the `_dataHash` changes naturally.
In the reference implementation, we require that only approved auditors of a specific fund can use this method. The approved auditors are supplied on contract creation via the constructor.

### verify
```
function verify(address _fundAddress, address _auditor, bytes32 _dataHash) returns (bool)
```

### getLastIndex
```
function getLastIndex(address _fundAddress) constant returns (uint256 index)
```

### getByIndex
```
function getByIndex(address _fundAddress, uint256 _index) constant returns (bytes32 dataHash, address auditor, uint256 timestamp)
```
Requires that `_index` is smaller than the size of the audit array.


## Events
### Added
```
event Added(address _fundAddress, uint256 _index)
```
Triggered when a new audit is stored successfully.


## Reference Implementation
https://github.com/melonproject/reporting-thesis/blob/master/packages/contracts/Auditing.sol