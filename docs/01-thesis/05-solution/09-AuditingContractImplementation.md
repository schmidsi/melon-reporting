# Auditing Contract Implementation

* Implement two versions of storing
* Compare gas costs
* Compare method invocation times (isComplete)

Variant 1: storing in array, index shifting
Variant 2: ???

## Implementation

### Differences
* isComplete()
* insertAudit()

## Gas cost
This is the default gas value that a block currently can hold:
**Block gas limit: 4'712'388** [(Source)](https://github.com/ethereum/go-ethereum/blob/release/1.8/eth/tracers/testdata/call_tracer_throw.json)

### Variant 1
> Gas cost for adding one audit when **one** audit is present:
> Gas cost "add to array end" (no index shift):                       201095
> Gas cost "add to array start" (one index shift):                    256223
> Extra gas cost for one index shift (one shift - no shift):           55128

> Gas cost for adding one audit when **ten** audits are present:
> Gas cost "add to array end" (no index shift):                       201167
> Gas cost "add to array start" (one index shift):                    765065
> Extra gas cost for one index shift (ten shifts - no shift / 10):     56390

> Gas cost for adding one audit when **100** audits are present:
> Gas cost "add to array end" (no index shift):                       201167
> Gas cost "add to array start" (one index shift):                    765065
> Extra gas cost for one index shift (ten shifts - no shift / 10):     56390

NOTE: "add to array start" implies that **X** values have to be shifted.


### isComplete method invocation time