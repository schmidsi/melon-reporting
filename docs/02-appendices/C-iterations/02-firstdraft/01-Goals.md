# Goals

The subsystems in [System Overview](/docs/01-thesis/05-solution/01-SytemOverview) are the goals of the second iteration that we propose. The general goal is a fully functional product. I.e. 80% according to the Pareto principle. With the outcome of this iteration we should be able to do real user testings and gather feedback from a broad audience. So that we can implement this feedback in the last iteration.

Besides the subsystems from _System Overview_, here follow the rest of the goals.

## Finalizing

We will finalize the work from the prototype iteration according to the received feedback:

- Report Schema
- Standard Report Mockup
- Auditing Contract Standard
- Auditing Contract Reference Implementation

## Yet unknown

Feedback from industry stakeholders (e.g. PwC, Deloitte, SFAMA and others) will be assessed when available and either directly implemented if possible or documented in chapter "Future work".

## Optional

Depending on the outcome of the above tasks, we might do one of the following if time permits and it is meaningful for the stakeholders.

### Fund Database

If the Report Data Extractor either runs too slowly or is too complicated to implement without a database, we can create as a fallback but also as a performance and user experience improvement a database that holds all data about funds for reports.

- Complete database schema for funds according to the ERM.
- Methods (queries) to get the same data as in Report Data Extractor: `queryReportData(fundAddress, timespanStart, timespanEnd): FundReportJSON`
- `extractData(fundAddress, timespanStart, timespanEnd) === queryReportData(fundAddress, timespanStart, timespanEnd)`
- Mutations to add data to the database. I.e.
  - `addFund`
  - `updatePrice`
  - `addParticipation`
  - `addTrade`
  - More if necessary

### Blockchain Sync Service

- A service that watches the blockchain for relevant events and updates the Fund Database accordingly
- Read the current state of the Melon smart contracts on startup
- Sync the changes
- Optional: Possibility to shut service down and restart it and it can sync the missed blocks.

### Report database

An easier way to enhance the user experience for the use case "View Report" is to just create a database where auditors store the extracted report data once audited. The other actors can then easily access these reports and check their validity simply by executing the function `Audit.exists(fundAddress, dataHash)`.