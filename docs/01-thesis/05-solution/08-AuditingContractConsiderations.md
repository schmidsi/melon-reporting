# Auditing Contract Considerations

## Storing audits

There are multiple ways to store audits, each with their own strengths and weaknesses.

### Variant 1: Array with shifting indices
There is one array per fund, storing all the audits. The audits are sorted by _timespanEnd_.

Strengths:
* Array is always sorted

Weaknesses: 
* When an audit with a very early timespanEnd is inserted, the gas cost rises rapidly because a lot of indexes have to be shifted.
* Indexes to audits can change

### Variant 2: Linked List
[Blog post: Linked Lists in Solidity](https://medium.com/coinmonks/linked-lists-in-solidity-cfd967af389b)

Strengths:
* Low gas cost for special case: insert audit in between existing audits

Weaknesses: 
* Iterating through the linked list is very expensive
* We cannot access audits by index, only if we would create the indexes on the fly
* "On the fly" indexes would also change after an insertion

### Variant 3: Helper array of timespans
An array _timespanAudited_ with (a struct of?) timespanStart and timespanEnd.
Best case is that only one timespan is in it: From when to when the fund is audited.
But if there are gaps, the array holds more values.

When we use the _isComplete_ function, we just have to check this array, so we don't have to iterate over a lot of audits and their timespans.

Strengths:
* Cheap isComplete call (best case: only testing 2 values)
* Indexes always stay the same
* Standard add is cheap (case: fund is well audited without gaps)

Weaknesses:
* 

### Variant 4: Fixed audits per time period
We could only allow audits to be performed on whole months or other fixed timespans. We could store them very easily in a map.

Mapping could be done with *year => Audit[12]* or similar.

Strengths:
* No timespans, so no possibility of off-by-one errors
* Gaps are very easily detectable
* Indexing is easy

Weaknesses:
* No flexibility for audit timespans
* Indexes do not align with _audits done_ when there is a gap. We could get an audit for indices 0 and 2, but not for index 1.
* isComplete is more expensive than with variant 3

### Variant 5: Mapping instead of array
TODO