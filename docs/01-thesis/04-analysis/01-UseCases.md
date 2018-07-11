# Use Cases

## Use case diagram

![](/assets/UseCaseDiagram.svg)

## Actors

- Investor: John Orthwein
- Manager: Mona El Isa
- Auditor: tbd??
- Regulator: tbd??

### Investor

Investors want a report to be presented to them as quickly as possible.
They care about the performance of a fund since its inception.
They are also interested if a fund is regularly audited.
This information contributes to the decision whether an investor is willing to invest in a fund or not.
Investors also want to rely on risk modules by having the option to forbid new trades if funds are not regularly or properly audited.

### Manager

Managers may want to analyze funds in a more specific scope so they can adjust their trading approaches.
They are also interested in comparing their fund to others.

### Auditor

Auditors rely heavily on the integrity of the presented data as they are the ones to sign it.
They want to set an opinion on a specific timespan after revieving the data.
They are interested in past audits of a fund so they know where additional audits are needed.

### Regulator

Regulators need a way to verify if a fund is regularly audited and the signed data of an audit is valid.

## Use case description

### Extract Data

Actors can extract report data of a fund on the timespan they provide.

### View Report

Actors can view a visual representation of the extracted data with a report.

### Audit Report

Actors can add an audit on a fund over a timespan with a comment in form of an opinion.

### Verify audit

Actors can verify an audit by comparing the hash of the audit and the hash of their created report.
