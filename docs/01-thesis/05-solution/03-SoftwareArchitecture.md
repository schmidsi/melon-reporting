# Software Architecture

## Dat Extraction
Parity API...


## Data Schema

### JSON Schema
Validation of the report data is done using [JSON Schema](http://json-schema.org/). This adds an extra layer of integrity, so an auditor is able to verify that the hash they will sign is compliant with the _Fund Report Data Schema_.


## Auditing 

#### web3.js
[web3js](https://web3js.readthedocs.io/) gives us the ability to call functions on our auditing smart contract.

### Forge
With the npm package [Forge](https://github.com/digitalbazaar/forge) we hash the report data.

### MetaMask
[MetaMask](https://metamask.io/) lets us connect to an Ethereum chain (Kovan, Mainnet etc.) and sign the auditing data without running a full Ethereum node by ourselves.


## Smart contracts

### dapp tools
With [dapp tools](https://dapp.tools/) we used a toolsuite for developing Ethereum smart contracts that gave us the ability to automate the following:
- compile smart contracts (with solc)
- debug smart contracts (with Hevm)
- test smart constracts (with ds-test)
- extract an ABI (with solc)

### Architecture
The main smart contract for auditing is _Auditing.sol_.

With the interface _AuditingInterface.sol_, we follow a modular apprach. Users of the Melon protocol are encouraged to implement their own Auditing contract if they are not pleased with our solution. A possible change on our contract might be that auditor whitelisting will be approached differently, e.g. by opening the _add_ function (hence the ability to add an audit on a fund) to all addresses.

Example:
```contract MyAuditing is AuditingInterface { ... }```

When they follow the specification of the auditing interface, other implementations are guaranteed that their contract will comply with the rest of the Reporting and Auditing architecture.

The ABI of the auditing smart contract provides an interface to the Auditing functionality of the _Report Web Interface_.

### Unit tests

#### Functional tests
- File under test: Auditing.sol
- Test file: Auditing.t..sol

TODO graphs of implemented tests (some of the timelines...)

#### "Bulk" tests
- Files under test: Auditing.sol, AuditingFirst.sol
- Test files: AuditingBulkOne.t.sol, AuditingBulkTen.t.sol, AuditingBulkHundred.t.sol

With these unit tests, we were able to compare two variants of the Auditing Contract implementation. We take a closer look at the results in [this chapter](/01-thesis/05-solution/07-AuditingContract.html)
