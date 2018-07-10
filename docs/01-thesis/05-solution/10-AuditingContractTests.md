# Auditing Contract Tests

## Unit tests
TODO graphs of implemented tests (all the timelines...)

## insertAudit() Gas cost
This is the default gas value that a block currently can hold:
**Block gas limit: 8'000'029** [(Source)](https://ethstats.net/)
TODO IMG
(Screenshot from 2018-06-15)

### Variant 1
Gas cost for adding one audit when **one** audit is present:

| Case | Gas cost |
| ------------------------------- | ----------- |
| Gas cost "add to array end" (no index shift) | 201501
| Gas cost "add to array start" (one index shift) | 256201
| Extra gas cost for index shift (one shift - no shift) | 54700

Gas cost for adding one audit when **ten** audits are present:

| Case | Gas cost |
| ------------------------------- | ----------- |
| Gas cost "add to array end" (no index shift) | 201573
| Gas cost "add to array start" (ten index shifts) | 765043
| Extra gas cost for index shift (ten shifts - no shift / 10) | 56347

Gas cost for adding one audit when **100** audits are present:

| Case | Gas cost |
| ------------------------------- | ----------- |
| Gas cost "add to array end" (no index shift) | 201573
| Gas cost "add to array start" (hundred index shifts) | 5853463
| Extra gas cost for index shift (hundred shifts - no shift / 100) | 56519

Side note: "add to array start" implies that **X** values have to be shifted.

Adding an audit to the start of the array is a potential problem with _Variant 1_ considering the block gas limit, even if the auditors have audited the fund in a linear fashion beforehand (i.e. they did not produce gaps).

### Variant 2
Gas cost for adding one audit when **one** audit is present:

| Case | Gas cost |
| ------------------------------- | ----------- |
| Gas cost "add latest timespan" | 369429 |
| Gas cost "add earliest timespan" | 394581 |
| Extra gas cost | 25152 |

Gas cost for adding one audit when **ten** audits are present:

| Case | Gas cost |
| ------------------------------- | ----------- |
| Gas cost "add latest timespan" | 369429
| Gas cost "add earliest timespan" | 394581
| Extra gas cost | 25152

Gas cost for adding one audit when **100** audits are present:

| Case | Gas cost |
| ------------------------------- | ----------- |
| Gas cost "add latest timespan" | 369429 |
| Gas cost "add earliest timespan" | 394581 |
| Extra gas cost | 25152 |

With _Variant 2_, adding an audit as the earliest in regards to the timespan is not a gas limit issue.

## isComplete() method invocation time