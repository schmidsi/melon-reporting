# Use Cases

_Note:_ The following use cases serve as the official project scope agreed upon by the coaches and the client during the prototype presentation meeting on 3rd Mai 2018 in Zug.

## Use case diagram

![](/assets/UseCaseDiagram.svg)

## Actors

- Investor: John Orthwein
- Manager: Mona El Isa
- Auditor: tbd??
- Regulator: tbd??

### Investor

- Timespan: Mainly inception to now
- Comparable and complete fund reports
- Is a fund regularly audited
- Key information:
  - Share price & history
  - Assets under management
  - Tokens & allocation
  - Audit interval & coverage
  - Auditors
  - Manager
  - Legal entity
  - Fees

### Manager

- Timespans:
  - Inception to now
  - Monthly, quarterly, yearly, year to date (YTD)
  - Custom
- Compare own fund to others
- Auditing status
- Key information: All of investor plus:
  - Participation allocation & history
  - Detailed trades history and analysis

### Auditor

All of manager plus:

- Inspect & validate data especially trade history
- Sign & add a report

### Regulator

- Check if a fund is regularly audited
- Perform spot checks of audits
  - Is the signed data of an audit valid

## Use case description

### Extract Data

- Extract report data on-chain & off-chain.
- When data is extracted with the same arguments, the datahash will always be the same.

Input arguments are:

- Fund (address)
- Timespan (timestamp to timestamp)

The system extracts following data:

- General: Fund name, share price, policies, etc.
- Holdings: List of tokens with quantity, price (history), ...
- Trades: List of trades in the defined timespan
- Participation: List of invests/redeem in the defined timespan
- Audits: List of audits in the defined timespan

### View Report

- All actors (Auditor, Manager, Investor, Regulator) can view reports.
- Create a report out of the fund data and display it to the user.
- This rendering is complete and comparable.
  - Complete: All underlying report data is visually represented
  - Comparable: For different funds with the same timespan the rendered reports look similar.

_Bonus_: Make the report printable

### Audit Report

When an auditor has reviewed a report, he can create an audit on the blockchain.

Input arguments are:

- Fund (address)
- Datahash (of report data)
- Timespan (timestamp to timestamp)

### Comment Timespan

A fund manager can add a comment to the fund over a specific timespan.

### Verify audit

A regulator can verify an audit.
This is basically the ability to make a spot check of audits:

- Recreate report according to fund address and timespan
- Check if datahash matches
- Validate data. Although if the auditor trusts its report generation algorithm and datahash matches, than the report is considered valid.
