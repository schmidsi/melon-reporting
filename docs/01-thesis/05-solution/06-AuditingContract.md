# Auditing Contract

* [Auditing](#auditing)
  * [isApprovedAuditor](#function-isapprovedauditor)
  * [getByIndex](#function-getbyindex)
  * [getLastIndex](#function-getlastindex)
  * [exists](#function-exists)
  * [add](#function-add)
  * [fundAudits](#function-fundaudits)
  * [approvedAuditors](#function-approvedauditors)
  * [Added](#event-added)

## *function* isApprovedAuditor

Auditing.isApprovedAuditor(_auditor) `view` `51c8151a`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _auditor | undefined |


## *function* getByIndex

Auditing.getByIndex(_fundAddress, _index) `view` `834389c7`

**Returns the requested audit data**


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _fundAddress | undefined |
| *uint256* | _index | undefined |


## *function* getLastIndex

Auditing.getLastIndex(_fundAddress) `view` `83e714ad`

**Returns the last index of a specific fund**


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _fundAddress | undefined |


## *function* exists

Auditing.exists(_fundAddress, _auditor, _dataHash) `view` `c7c39870`

**Validates that the provided data is mapped to an existing audit**


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _fundAddress | undefined |
| *address* | _auditor | undefined |
| *bytes32* | _dataHash | undefined |


## *function* add

Auditing.add(_fundAddress, _dataHash, _timespanStart, _timespanEnd) `nonpayable` `ec06b1be`

**Creates a new audit on a fund specified with `_fundAddress`, the hashed data in `_dataHash` and the timespan timestamps  in `_timespanStart` and `_timespanEnd`.**


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _fundAddress | undefined |
| *bytes32* | _dataHash | undefined |
| *uint256* | _timespanStart | undefined |
| *uint256* | _timespanEnd | undefined |


## *function* fundAudits

Auditing.fundAudits(, ) `view` `f8b79ea9`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* |  | undefined |
| *uint256* |  | undefined |


## *function* approvedAuditors

Auditing.approvedAuditors() `view` `f909c6ca`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |


## *event* Added

Auditing.Added(_fundAddress, _index) `446e00ad`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | _fundAddress | not indexed |
| *uint256* | _index | not indexed |


---