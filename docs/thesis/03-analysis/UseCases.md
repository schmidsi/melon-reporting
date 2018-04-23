# Use Cases

## Use case diagram
![](/assets/UseCaseDiagram.svg)

## Use case description

### Actors
#### Auditor
#### Manager
#### Investor
#### Regulator

### View report
All actors (Auditor, Manager, Investor, Regulator) can view reports about a melon fund. The actor defines a timespan to determine what data is in the scope. 

A report consists of the following attributes:

**Basic Information**
* Fund Name
* Start timestamp of data
* End timestamp of data
* Ticker
* NAV
* AUM
* Date of Inception
* Management Fee
* Performance Fee

**Performance**
* Since Inception
* YTD
* 1 year
* 2 year
* 3 year
* Volatility (1 year)
* Share ratio

**Audits**
* Signature
* Name of auditor (from address)
* Timespan of audit

**Additional data**
* Overview (fund description)
* Historical performance
* Monthly performance
* Hash of dataset
* Timeline of past audits (optional)

### Generate report
The report is generated "on the fly".

Input arguments are: 
* Fund (address, name?)
* Timespan (timestamp to timestamp)

When a report is generated with the same arguments, the datahash of the report will always be the same.

### Audit report
When an auditor has reviewed a report, he can create an audit on the blockchain.

Input arguments are:
* Fund address
* Datahash of report

### Comment timespan
A fund manager can add a comment to the fund over a specific timespan.

### Verify audit
A regulator can verify an audit.
This is basically the ability to make a spot check of audits.