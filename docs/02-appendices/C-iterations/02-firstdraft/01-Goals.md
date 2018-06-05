# Goals

These are the specifications for the goals of the second iteration that we propose. The general goal is a fully functional product. I.e. 80% according to the Pareto principle. With the outcome of this iteration we should be able to do real user testings and gather feedback from a broad audience. So that we can implement this feedback in the last iteration.

## Report Data Extractor

- A function that extracts all necessary data for a fund report from the blockchain in one go
- `extractData(fundAddress, timespanStart, timespanEnd): FundReportJSON`
- The function is deterministic. I.e. for the same arguments it returns always the same result.
- The result is a valid JSON according to the Fund Report Data Schema.
- The vision for this is a decentralized possibility to create, recreate and validate fund reports without the need of running a Fund Database and Blockchain Sync Service even if it takes some time (~5-50 minutes)

### Boundaries

- We don't know yet if it is possible to extract all required data out of the blockchain in one go.
  - We already know that Ethereum-Nodes can crash or just return nothing if queries are too big.
  - If it gets too complicated, we fall back to the Fund Database and Blockchain Sync Service.
- We aim to work with **@melonproject/smart-contracts@~0.8.0**, the version for the Paros Olympiad if possible. If not, we fall back to whatever is deployed with useful data on Kovan or Main Chain.

## Fund Database

We already assume that the Report Data Extractor either runs too slowly or is too complicated to implement without a database. Therefore as a fallback but also as a performance and user experience improvement we will implement a database that holds all data about funds for reports.

- Complete database schema for funds according to the ERM.
- Methods (queries) to get the same data as in Report Data Extractor: `queryReportData(fundAddress, timespanStart, timespanEnd): FundReportJSON`
- `extractData(fundAddress, timespanStart, timespanEnd) === queryReportData(fundAddress, timespanStart, timespanEnd)`
- Mutations to add data to the database. I.e.
  - `addFund`
  - `updatePrice`
  - `addParticipation`
  - `addTrade`
  - More if necessary

## Blockchain Sync Service

- A service that watches the blockchain for relevant events and updates the Fund Database accordingly
- Read the current state of the Melon smart contracts on startup
- Sync the changes
- Bonus: Possibility to shut service down and restart it and it can sync the missed blocks.

## Standard Report Web Interface

- Implementation of the Mockup as a web interface
- URL Scheme: `/report/:fundAddress/:timeSpanStart/:timeSpanEnd`

### Boundaries

- Bonus: ENS Name lookups
- Bonus: KYC indicators
- Bonus: Printing functionality. It is not sure that printing will work without problems.
- Bonus: Sorting and other interactions
- Without risk management and other data/fields that are not implemented in the smart contracts yet. I.e. Strategy, category, ...

## Auditing Web App

- Functionality on top of the Standard Report Web Interface to add an audit to the viewed data.
- We will use MetaMask for the sake of simplicity.

# Finalizing

Lastly, we will finalize the work from the prototype iteration according to the received feedback:

- Report Schema
- Standard Report Mockup
- Auditing Contract Standard
- Auditing Contract Reference Implementation
