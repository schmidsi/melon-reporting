# Melon Auditing Contract Standard

```
MIP: 1
Title: Auditing
Authors: Benjamin Zumbrunn, benzumbrunn@gmail.com; Simon Emanuel Schmid, simon@schmid.io
Status: Final
Type: MIP
Created: 2018-04-24
Reference implementation: https://github.com/melonproject/reporting/blob/master/src/contracts/src/Auditing.sol
```

## Abstract

This MIP describes standard functions an auditing contract must implement in order to be compatible as a Melon Auditing module.

## Background

The auditing process goes like this:

* A clearly defined algorithm can extract on-chain and off-chain data (I.e. meta data on IPFS) from a fund into a well defined format for a specified timespan.

  `generateData(fundAddress, timespanStart, timespanEnd): FundReportJSON`

  * _Invariant_: A call to `generateData` with the same arguments should always return the same data.
  * _Note_: To generate a report over the whole lifetime of a fund, set: `timespanStart = fund.inception` and `timespanEnd = now`

* An auditor performs an audit on that data and if everything is good he or she signs the hash of this data on the blockchain.
* Who actually can perform audits on a fund is considered an implementation detail of contracts following this standard.

## Motivation

Different fund setups have different auditing requirements:

* Some want to provide a whitelist of auditors to perform and sign audits.
* Others want to implement complex functionalities with identity lookups.
* Some just want to open it for everybody or do not want any audits at all.

In order to follow the modularisation approach of the Melon smart-contract system we hereby define a standard so that minimal requirements can be met. This leads to an open system where module developers can implement their auditing functionality according to their needs outside of our imagination.

## Contract details

* The `_auditor` is represented by their address.

* The `_dataHash` is the hash of the [Fund Report Data](https://melon-reporting.now.sh/thesis/04-solution/FundReportDataSchema.html) of a report. 
 
* `_timespanStart` and `_timespanEnd` are required to generate the report that was audited.

* An `_opinion` is an integer which represents the result of the audit, e.g. whether the auditor approves the report or not.

## Transactions

### add

```
function add(address _fundAddress, bytes32 _dataHash, uint256 _timespanStart, uint256 _timespanEnd, uint256 _opinion) returns (bool)
```

**Add a new audit of a melon fund to the blockchain. `msg.sender == auditor`.**

## Calls

### exists
```
exists(address _fundAddress, address _auditor, bytes32 _dataHash) returns (bool)
```

**Validates that the provided data is mapped to an existing audit.**

### getLength

```
function getLength(address _fundAddress) constant returns (uint256 index)
```

**Get the length of the audit array for a specific melon fund. This is needed to iterate through audits with `getByIndex()`.**

### getByIndex

```
function getByIndex(address _fundAddress, uint256 _index) constant returns (address auditor, bytes32 dataHash, uint256 timespanStart, uint256 timespanEnd, uint256 opinion)
```

**Get the stored information of an audit.**

Requires that `_index` is smaller than the size of the audit array.

### isApprovedAuditor

```
isApprovedAuditor(address _auditor) returns (bool)
```

**Checks if the provided address can use the add function on the contract.**

If there are no restrictions on who can audit, this funtion shall always return true.

### isComplete

```
isComplete(address _fundAddress, uint256 _timespanStart, uint256 _timespanEnd) returns (bool)
```

**Checks if a fund is completely audited for a given timespan.**

Risk management might prevent trades if a fund is not completely audited.
For example:

A fund that is audited every month could have the following lookup in risk management: `isComplete(0xfundaddress, fund.inception, now - 30*24*60*60)`

## Events

### Added

```
event Added(address _fundAddress, uint256 _index)
```

**Triggered when a new audit is stored successfully.**

## Auditing Interface
[AuditingInterface.sol](https://github.com/melonproject/reporting/blob/master/src/contracts/src/AuditingInterface.sol)

## Reference Implementation

[Auditing.sol](https://github.com/melonproject/reporting/blob/master/src/contracts/src/Auditing.sol)

In the reference implementation, we require that only approved auditors can use the method `add(...)`. The approved auditors are supplied on contract creation via the constructor.

It is possible to validate if an address is an approved (i.e. stored) auditor:
```
isApprovedAuditor(address _auditor) returns (bool)
```

Contract developers are free to use their own enumeration of opinions. In the reference implementation, we use the following values:
```
enum Opinion {
    UnqualifiedOpinion, 
    QualifiedOpinion, 
    AdverseOpinion, 
    DisclaimerOfOpinion 
}
```