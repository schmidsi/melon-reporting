# Auditing Contract

**Deployment cost**: less than 791800 gas

## Constructor



Params:

1. **_approvedAuditors** *of type `address[]`*

## Events
### Added(address,uint256)


**Execution cost**: No bound available


Params:

1. **_fundAddress** *of type `address`*
2. **_index** *of type `uint256`*


## Methods
### getAuditedTimespansLength(address)


**Execution cost**: less than 738 gas

**Attributes**: constant


Params:

1. **_fundAddress** *of type `address`*

Returns:


1. **length** *of type `uint256`*

--- 
### auditedTimespansPerFund(address,uint256)


**Execution cost**: less than 1092 gas

**Attributes**: constant


Params:

1. **param_0** *of type `address`*
2. **param_1** *of type `uint256`*

Returns:


1. **start** *of type `uint256`*
2. **end** *of type `uint256`*

--- 
### approvedAuditors(uint256)


**Execution cost**: less than 1057 gas

**Attributes**: constant


Params:

1. **param_0** *of type `uint256`*

Returns:


1. **output_0** *of type `address`*

--- 
### add(address,bytes32,uint256,uint256,uint256)
>
>Creates a new audit on a fund specified with `_fundAddress`, the hashed data in `_dataHash1` and `_dataHash2` and the timespan timestamps  in `_timespanStart` and `_timespanEnd`.


**Execution cost**: No bound available


Params:

1. **_fundAddress** *of type `address`*
2. **_dataHash** *of type `bytes32`*
3. **_timespanStart** *of type `uint256`*
4. **_timespanEnd** *of type `uint256`*
5. **_opinion** *of type `uint256`*


--- 
### exists(address,address,bytes32)
>
>Validates that the provided data is mapped to an existing audit


**Execution cost**: No bound available

**Attributes**: constant


Params:

1. **_fundAddress** *of type `address`*
2. **_auditor** *of type `address`*
3. **_dataHash** *of type `bytes32`*

Returns:


1. **auditExists** *of type `bool`*

--- 
### fundAudits(address,uint256)


**Execution cost**: less than 2192 gas

**Attributes**: constant


Params:

1. **param_0** *of type `address`*
2. **param_1** *of type `uint256`*

Returns:


1. **auditor** *of type `address`*
2. **dataHash** *of type `bytes32`*
3. **timespanStart** *of type `uint256`*
4. **timespanEnd** *of type `uint256`*
5. **opinion** *of type `uint8`*

--- 
### getAuditedTimespanEnd(address,uint256)


**Execution cost**: less than 993 gas

**Attributes**: constant


Params:

1. **_fundAddress** *of type `address`*
2. **_index** *of type `uint256`*

Returns:


1. **end** *of type `uint256`*

--- 
### getAuditedTimespanStart(address,uint256)


**Execution cost**: less than 1015 gas

**Attributes**: constant


Params:

1. **_fundAddress** *of type `address`*
2. **_index** *of type `uint256`*

Returns:


1. **start** *of type `uint256`*

--- 
### getByIndex(address,uint256)
>
>Returns the requested audit data


**Execution cost**: less than 2967 gas

**Attributes**: constant


Params:

1. **_fundAddress** *of type `address`*
2. **_index** *of type `uint256`*

Returns:


1. **auditor** *of type `address`*
2. **dataHash** *of type `bytes32`*
3. **timespanStart** *of type `uint256`*
4. **timespanEnd** *of type `uint256`*
5. **opinion** *of type `uint256`*

--- 
### getLength(address)
>
>Returns the length of the audit array of a specific fund


**Execution cost**: less than 851 gas

**Attributes**: constant


Params:

1. **_fundAddress** *of type `address`*

Returns:


1. **index** *of type `uint256`*

--- 
### isApprovedAuditor(address)


**Execution cost**: No bound available

**Attributes**: constant


Params:

1. **_auditor** *of type `address`*

Returns:


1. **auditorIsApproved** *of type `bool`*

--- 
### isComplete(address,uint256,uint256)
>
>Returns true if a fund is completely audited over a specific timespan.


**Execution cost**: No bound available

**Attributes**: constant


Params:

1. **_fundAddress** *of type `address`*
2. **_timespanStart** *of type `uint256`*
3. **_timespanEnd** *of type `uint256`*

Returns:


1. **complete** *of type `bool`*