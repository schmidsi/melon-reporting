# Auditing Contract Considerations

There are multiple ways to store audits, each with their own strengths and weaknesses. Storage also has an effect on crucial function calls like _isComplete_. In this chapter, we compare the theoretical complexity as well as the estimated gas costs of four variants. We also balance the pros and cons considering standard auditing processes and flexibility of the implementation on timespans.

Two crucial tasks have to be solved with the auditing contract implementation:
* The cost of storing an audit (add) must be as low as possible
* Checking "audit completeness" of a fund over a timespan (isComplete) must be as efficient as possible

We came up with the following variants:
* Variant 1 - Array with shifting indices
* Variant 2 - Helper array of audited timespans
* Variant 3 - Linked list
* Variant 4 - Fixed audits per time period

## Scenarios for Big-O

### add
Worst case scenario: Audit is added to start
Average case scenario: Audit closes gap in middle
Best case scenario: Audit is added to end

### isComplete
TODO: maybe do this directly in variants because contracts have different worst cases...
Worst case scenario: 
Average case scenario:
Best case scenario:


## Variant 1 - Array with shifting indices
There is one array per fund, storing all the audits. The audits are sorted by _timespanEnd_.

Strengths:
* Array is always sorted

Weaknesses: 
* When an audit with a very early timespanEnd is inserted, the gas cost rises rapidly because a lot of indexes have to be shifted.
* Indexes to audits can change

### add complexity:
**Worst case: O(2n+1)**
* Look for insertion position: O(n)
* Shift indices: O(n)
* Insert new timespan: O(1)

**Average case: Theta(n+1)**
* Look for insertion position: O(n/2)
* Shift indices: O(n/2)
* Insert new timespan: O(1)

**Best case: Omega(3)**
* Add audit to end of array: O(1)
* Add new timespan to end of timespan array O(1)
* Merge two timespans: O(1)

### isComplete complexity:
**Worst case: O(n)**
* Compare all values in array: O(n)

**Average case: Theta(n/2)**
* Compare half of the values in array: O(n/2)

**Best case: Omega(1)**
* First audit covers timespan: O(1)

## Variant 2 - Helper array of audited timespans
An array _timespanAudited_ with (a struct of?) timespanStart and timespanEnd.
Best case is that only one timespan is in it: From when to when the fund is audited.
But if there are gaps, the array holds more values.

When we use the _isComplete_ function, we just have to check this array, so we don't have to iterate over a lot of audits and their timespans.

Strengths:
* Cheap isComplete call (best case: only testing 2 values)
* Indexes always stay the same
* Standard add is cheap (case: fund is well audited without gaps)

Weaknesses:
* Audit array is not sorted by timespans.

### add complexity:
**Worst case: O(3n+1)**
* Shift and insert new timespan: O(2n)
* Merge all previous timespans: O(n)
* Add audit to end of array: O(1)

**Average case: Theta(3)**
* Look for insertion position: O(1)
* Shift index of second timespan: O(1)
* Insert new timespan: O(1)

**Best case: Omega(3)**
* Add audit to end of array: O(1)
* Add new timespan to end of timespan array O(1)
* Merge two timespans: O(1)

### isComplete complexity:
**Worst case: O(n)**
* _n_ audits produced _n_ gaps, compare all: O(n)

**Average case: Theta(2)**
* One gap, check two timespans: O(2)

**Best case: Omega(1)**
* No gaps, check one timespan: O(1)

## Variant 3 - Linked List
[Blog post: Linked Lists in Solidity](https://medium.com/coinmonks/linked-lists-in-solidity-cfd967af389b)

Strengths:
* Low gas cost for special case: insert audit in between existing audits

Weaknesses: 
* Iterating through the linked list is very expensive
* We cannot access audits by index, only if we would create the indexes on the fly
* "On the fly" indexes would also change after an insertion

## Variant 4 - Fixed audits per time period
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

## Considering reality
It is important to incentivize auditors to properly audit funds. This means that they should be encouraged to never produce gaps in audited timespans of a fund.

Variant 1: the likeliness to compare all values on isComplete is very high (example: check inception to now) --> worst case is very likely

## Decision
Considering both theoretical and practical aspects, _Variant 2 - Helper array of audited timespans_ is the most flexible, cost efficient and practical implementation.