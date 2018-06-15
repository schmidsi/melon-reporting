# Auditing Contract Implementation

* Implement two versions of storing
* Compare gas costs
* Compare method invocation times (isComplete)

Variant 1: storing in array, index shifting
Variant 2: ???

## Implementation

### Differences
isComplete()

insertAudit()

## Gas cost

### Variant 1
Gas cost for adding one audit when **one** audit is present:
Gas cost "add to array end" (no index shift):                       201095
Gas cost "add to array start" (one index shift):                    256223
Extra gas cost for one index shift (one shift - no shift):           55128

Gas cost for adding one audit when **ten** audits are present:
Gas cost "add to array end" (no index shift):                       201167
Gas cost "add to array start" (one index shift):                    765065
Extra gas cost for one index shift (ten shifts - no shift / 10):     56390



### isComplete method invocation time