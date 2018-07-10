# Auditing Contract Implementation

* Implement two versions of storing
* Compare gas costs
* Compare method invocation times (isComplete)

Variant 1: storing in array, index shifting on adding out-of-order audits
Variant 2: 

## Implementation

### Differences
* insertAudit() --> gas cost
* isComplete() --> method invocation time


## insertAudit() Gas cost
This is the default gas value that a block currently can hold:
**Block gas limit: 4'712'388** [(Source)](https://github.com/ethereum/go-ethereum/blob/release/1.8/eth/tracers/testdata/call_tracer_throw.json)

### Variant 1
> Gas cost for adding one audit when **one** audit is present:
> Gas cost "add to array end" (no index shift):                       201501
> Gas cost "add to array start" (one index shift):                    256201
> Extra gas cost for index shift (one shift - no shift):               54700

> Gas cost for adding one audit when **ten** audits are present:
> Gas cost "add to array end" (no index shift):                       201573
> Gas cost "add to array start" (ten index shifts):                   765043
> Extra gas cost for index shift (ten shifts - no shift / 10):         56347

> Gas cost for adding one audit when **100** audits are present:
> Gas cost "add to array end" (no index shift):                       201573
> Gas cost "add to array start" (hunred index shifts):               5853463
> Extra gas cost for index shift (hundred shifts - no shift / 100):    56519

NOTE: "add to array start" implies that **X** values have to be shifted.

### Variant 2
> Gas cost for adding one audit when **one** audit is present:
> Gas cost "add to array end":                                        369429
> Gas cost "add to array start":                                      394581
> Extra gas cost:                                                      25152

> Gas cost for adding one audit when **ten** audits are present:
> Gas cost "add to array end":                                        369429
> Gas cost "add to array start":                                      394581
> Extra gas cost:                                                      25152

> Gas cost for adding one audit when **100** audits are present:
> Gas cost "add to array end":                                        369429
> Gas cost "add to array start":                                      394581
> Extra gas cost:                                                      25152

## isComplete() method invocation time
