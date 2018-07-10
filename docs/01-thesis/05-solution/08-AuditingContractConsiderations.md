# Auditing Contract Considerations

There are multiple ways to store audits, each with their own strengths and weaknesses. Storage also has an effect on crucial function calls like _isComplete_. In this chapter, we compare the theoretical complexity as well as the estimated gas costs of four variants. We also balance the pros and cons considering standard auditing processes and flexibility of the implementation on timespans.

There are two main considerations:

> The cost of storing an audit (by _add_) must be as low as possible

We want to incentivize auditors to properly audit funds regarding the timeline. This means that they should be encouraged to never produce gaps in audited timespans of a fund and audit in a linear fashion. When they audit steadily, they should expect steady gas costs when calling the _add_ function. When they have to close gaps in the audited timespan, they should not be punished too hard by gas costs.

> Validating _audit completeness_ of a fund over a timespan (by _isComplete_) must be as efficient as possible

Audit completeness of a fund over a timespan will not only be verified manually by investors. Melon risk management modules will also rely on completeness verification in the future. A risk module may prevent a fund manager to trade when the fund has not been audited recently (see [Ex Ante](http://www.docs.melonport.com/chapters/risk_engineering.html#ex-ante---engineering)). As these risk modules are calls from smart contracts, the _isComplete_ function must be as efficient as possible in regards to gas costs and method invocation time.

## Auditing Contract Variants

We came up with the following variants in regards to the contract data structures:
* Variant 1 - Array with shifting indices
* Variant 2 - Helper array of audited timespans
* Variant 3 - Linked list
* Variant 4 - Fixed time periods

## Scenarios regarding complexity

TODO graphs for cases!

### add
Worst case scenario: Audit is added to start
Average case scenario: Audit closes gap in middle
Best case scenario: Audit is added to end

### isComplete
TODO: maybe do this directly in variants because contracts have different worst cases...
Worst case scenario: 
Average case scenario:
Best case scenario:

## Practical and theoretical cases
Theoretical complexity does not suffice for our scope, because gas cost on average and best case performance will vary a lot, and these normally have a complexity of $$O(1)$$ in theory. For this reason, we extend Big-O notation with more precise values like $$\Omega(7)$$ for 7 rather gas-intensive operations. We call this _practical complexity_.

## Variant 1 - Array with shifting indices

![](/assets/array-with-shifting-indexes.svg?v3)

There is one array per fund, storing all the audits. The audits are sorted by _timespanEnd_.

Strengths:

- Array is always sorted

Weaknesses:

- When an audit with a very early timespanEnd is inserted, the gas cost rises rapidly because a lot of indexes have to be shifted.
- Indexes to audits can change

### add complexity

#### Worst case
Theoretical: $$O(n)$$ - Practical: $$O(2n+1)$$
* Look for insertion position: O(n)
* Shift indices: O(n)
* Insert new timespan: O(1)

#### Average case
Theoretical: $$\Theta(n)$$ - Practical: $$\Theta(n+1)$$
* Look for insertion position: O(n/2)
* Shift indices: O(n/2)
* Insert new timespan: O(1)

#### Best case
Theoretical: $$\Omega(1)$$ - Practical: $$\Omega(2)$$ 
* Compare last value and break out of loop: O(1)
* Add audit to end of array: O(1)

### isComplete complexity

#### Worst case
Theoretical: $$O(n)$$ - Practical: $$O(n)$$ 
* Compare all values in array: O(n)

#### Average case
Theoretical: $$\Theta(n)$$ - Practical: $$\Theta(n/2)$$ 
* Compare half of the values in array: O(n/2)

#### Best case
Theoretical: $$\Omega(1)$$ - Practical: $$\Omega(1)$$ 
* First audit covers given timespan: O(1)


## Variant 2 - Helper array of audited timespans

![](/assets/helper-array-with-timespans.svg)

An array _timespanAudited_ with (a struct of?) timespanStart and timespanEnd.
Best case is that only one timespan is in it: From when to when the fund is audited.
But if there are gaps, the array holds more values.

When we use the _isComplete_ function, we just have to check this array, so we don't have to iterate over a lot of audits and their timespans.

Strengths:

- Cheap isComplete call (best case: only testing 2 values)
- Indexes always stay the same
- Standard add is cheap (case: fund is well audited without gaps)

Weaknesses:

- Audit array is not sorted by timespans.

### add complexity

#### Worst case
Theoretical: $$O(n)$$ - Practical: $$O(3n+1)$$ 
* Shift and insert new timespan: O(2n)
* Merge all previous timespans: O(n)
* Add audit to end of array: O(1)

#### Average case
Theoretical: $$\Theta(1)$$ - Practical: $$\Theta(9)$$
* Look for insertion position with two timespans present: O(2)
* Shift index of second timespan: O(1)
* Insert new timespan: O(1)
* Merge three timespans to one (delete two, change one): O(3)
* Add audit to end of array: O(1)

#### Best case
Theoretical: $$\Omega(1)$$ - Practical: $$\Omega(5)$$
* Look for insertion position one timespan present: O(1)
* Add new timespan to end of timespan array O(1)
* Merge two timespans (delete one, change one): O(2)
* Add audit to end of array: O(1)

### isComplete complexity

#### Worst case
Theoretical: $$O(n)$$ - Practical: $$O(n)$$
* _n_ audits produced _n_ gaps, compare all: O(n)

#### Average case
Theoretical: $$\Theta(1)$$ - Practical: $$\Theta(2)$$ 
* One gap, check two timespans: O(2)

#### Best case
Theoretical: $$\Omega(1)$$ - Practical: $$\Omega(1)$$ 
* No gaps, check one timespan: O(1)


## Variant 3 - Linked List
[Blog post: Linked Lists in Solidity](https://medium.com/coinmonks/linked-lists-in-solidity-cfd967af389b)

Strengths:
* Low gas cost for special case: _insert audit in between existing audits_

Weaknesses: 
* Iterating through the linked list is expensive
* We cannot access audits by index, only if we would create the indexes on the fly
* _On the fly_ indexes would also change after an insertion

As we did not implement a linked list variant in solidity, we will argue about the theoretical complexity of the data structure [compared to the dynamic array variants](https://en.wikipedia.org/wiki/Linked_list#Linked_lists_vs._dynamic_arrays).

The linked list variant could benefit from a separate timespan array like in variant 2. This would make the audit completeness check much more efficient with comparably small extra effort.

### add complexity

#### Worst case
Theoretical: $$O(n)$$

#### Average case
Theoretical: $$\Theta(n)$$

#### Best case
Theoretical: $$\Omega(1)$$
* Assumption: _head_ of list is known

### isComplete complexity

#### Worst case
Theoretical: $$O(n)$$

#### Average case
Theoretical: $$\Theta(n)$$

#### Best case
Theoretical: $$\Omega(1)$$


## Variant 4 - Fixed time periods
We could only allow audits to be performed on whole months or other fixed timespans. We could store them very easily in a map.

Mapping could be done with _year => Audit[12]_ or similar.

Strengths:

- No timespans, so no possibility of off-by-one errors
- Gaps are very easily detectable
- Indexing is easy

Weaknesses:
* No flexibility for audit timespans
* Indexes do not align with _audits done_ when there is a gap. We could get an audit for indices 0 and 2, but not for index 1.
* isComplete is more expensive than with variant 3

The fixed time periods variant could also benefit from a separate timespan array like in variant 2. This would make the audit completeness check much more efficient, but would not change the fact that time periods are not flexible.

As we did not implement a variant with fixed time periods in solidity, we will argue about the theoretical complexity of the [hash table data structure](https://en.wikipedia.org/wiki/Hash_table).

### add complexity

#### Worst case
Theoretical: $$O(n)$$

#### Average case
Theoretical: $$\Theta(1)$$

#### Best case
Theoretical: $$\Omega(1)$$

### isComplete complexity

#### Worst case
Theoretical: $$O(n)$$

#### Average case
Theoretical: $$\Theta(1)$$

#### Best case
Theoretical: $$\Omega(1)$$


## Considering reality

### Variant 1
The likeliness to compare all values on isComplete is very high (example: check inception to now), which means that the worst case would happen very often.

### Variant 2
We expect the auditors to add audits in a linear fashion in regard to timespans without introducing a lot of gaps. _Variant 2_ would perform very good on completeness verification.

### Variant 3
This variant would introduce a new data structure. With this, the contract would be a lot more complex without providing crucial benefits.

### Variant 4
Flexibility would be very low with this solution. Auditors would be restricted to a period. Also, multiple audits on the same period would not be possible this way.


## Decision
Considering both theoretical and practical aspects, _Variant 2 - Helper array of audited timespans_ is the most flexible, cost efficient and practical implementation.

The benefits of this overweigh the slightly higher complexity on adding an audit.

As _Variant 1 - Array with shifting indices_ is very similar to _Variant 2_, we implemented both versions. In the next two chapters, we look at the implementation as well as resulting gas costs and method invocation times through tests.
