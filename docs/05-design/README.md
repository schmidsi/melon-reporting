# Design

## Interchangeable Fund Data Format

```json
{
  "name": "Example Fund",
  "inception": "yyyy-mm-dd hh:mm:ss",
  "description": "This fund is high risk",
  "manager": "0xbad...a55",
  "nav": 1000,
  "quoteSymbol": "MLN",
  "gav": 1100,
  "timestamp": "yyyy-mm-dd hh:mm:ss",
  "holdings": [
    {
      "symbol": "ETH",
      "amount": 1000
    }
  ],
  "trades": [
    {
      "buySymbol": "ETH",
      "sellSymbol": "MLN",
      "buyAmount": 100,
      "sellAmount": 50,
      "timestamp": "yyyy-mm-dd hh:mm:ss",
      "market": "0xdead...beef"
    }
  ],
  "audits": [
    {
      "timestamp": "yyyy-mm-dd hh:mm:ss",
      "auditor": "0xdead...beef1",
      "dataHash": "QmXZcdco6wZEA2paGeUnoshSB4HJiSTDxagqXerDGop6or",
      "signature": "0x23rasdfasdlfjhasldkfhas"
    }
  ]
}
```

### Linked issues:

* https://github.com/melonproject/reporting-thesis/issues/7



## Melon Auditing Contract standard

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

### Abstract


### Motivation


### Methods

#### add
```
function add(bytes32 _dataHash, address _fundAddress) returns (bool)
```
Requires that the `_dataHash` is unique per fund.
If a document is audited, the information of the audit is added to a new version of the document, thus with each audit, the `_dataHash` changes naturally.
In the reference implementation, we require that only approved auditors can use this method.

#### verify
```
function verify(bytes32 _dataHash, address _fundAddress, address _auditor) returns (bool)
```

#### getLastIndex
```
function getLastIndex(address _fundAddress) constant returns (uint64 index)
```

#### getByIndex
```
function getByIndex(address _fundAddress, uint64 _index) constant returns (bytes32 dataHash, address auditor, uint256 timestamp)
```
Requires that `_index` is smaller than the size of the audit array.


### Events
#### Added
```
event Added(address _fundAddress, uint64 _index)
```
Triggered when a new audit is stored successfully.


### Reference Implementation
https://github.com/melonproject/reporting-thesis/blob/master/packages/contracts/Auditing.sol