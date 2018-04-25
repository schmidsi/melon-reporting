# Melon Auditing Contract Standard

```
MIP: 1
Title: Melon Auditing
Author: Benjamin Zumbrunn, benzumbrunn@gmail.com
Status: Draft
Type: MIP
Created: 2018-04-24
Reference implementation: https://github.com/melonproject/reporting-thesis/blob/master/packages/contracts/Auditing.sol
```

## Abstract
The following describes standard functions an auditing contract for the [Melon project](https://github.com/melonproject/smart-contracts) can implement to be used for [Reporting and Auditing](https://github.com/melonproject/reporting-thesis).

## Motivation
This standard focuses on solving the issue of storing and retrieving data that is used by the *Reporting and Auditing* module of the Melon project.

With the *Reporting and Auditing* module, it will be possible for an auditor to audit a report of a melon fund by publicly announcing his/her ~~approval~~ (...) of the report data which is represented by a hash. 

Regulators should have access to an easy interface to validate the work of the auditors that was done in the past.

... why is it a standard?

## Contract details

The `_auditor` is represented by his/her address.

The `_dataHash` is the hash of the [Interchangeable Fund Data](/thesis/04-solution/InterchangeableFundDataFormat.md) of a report.

`_timespanStart` and `_timespanEnd` are required to generate the report that was audited.

## Methods

### add
```
function add(address _fundAddress, bytes32 _dataHash, uint256 _timespanStart, uint256 _timespanEnd) returns (bool)
```
**Add a new audit of a melon fund to the blockchain. This function is only used by auditors.**

Requires that the `_dataHash` is unique per fund.
If a document is audited, the information of the audit is added to a new version of the document, thus with each audit, the `_dataHash` changes naturally.

In the *reference implementation*, we require that only approved auditors of a specific fund can use this method. The approved auditors are supplied on contract creation via the constructor.

### exists
```
function exists(address _fundAddress, address _auditor, bytes32 _dataHash) returns (bool)
```
**Validate that an audit exists in the storage of a specific melon fund.**

Timespan information is not needed because it is part of the `_dataHash` itself.

### getLastIndex

```
function getLastIndex(address _fundAddress) constant returns (uint256 index)
```
**Get the last index of audits for a specific melon fund. This is needed to iterate through audits with `getByIndex()`.**

When no audit is stored for a fund yet, the function returns the maximum value of the index, which is `2**256 - 1` for `uint256`.

### getByIndex

```
function getByIndex(address _fundAddress, uint256 _index) constant returns (bytes32 dataHash, address auditor, uint256 timestamp)
```
**Get the stored information of an audit.**

Requires that `_index` is smaller than the size of the audit array.

## Events
### Added
```
event Added(address _fundAddress, uint256 _index)
```
**Triggered when a new audit is stored successfully.**

## Reference Implementation
[Auditing.sol](https://github.com/melonproject/reporting-thesis/blob/master/packages/contracts/Auditing.sol)

The reference implementation focuses on the 