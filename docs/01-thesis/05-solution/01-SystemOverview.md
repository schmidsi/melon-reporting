# System Overview

![](/assets/DataConsolidation.svg)

## Report Data Extractor

- A function that extracts all necessary data for a fund report from the blockchain in one go
- `extractData(fundAddress, timespanStart, timespanEnd): FundReportJSON`
- The function is deterministic. i.e. for the same arguments it returns always the same result.
- The result is a valid JSON according to the Fund Report Data Schema.
- The vision for this is a decentralized possibility to create, recreate and validate fund reports without the need of running a Fund Database and Blockchain Sync Service even if it takes some time (~5-50 minutes)

### Boundaries

- We aim to work with **@melonproject/smart-contracts@~0.8.0**, the version for the Paros Olympiad if possible. If not, we fall back to whatever is deployed with useful data on Kovan or Main Chain.

## Standard Report Web Interface

- Implementation of the Mockup as a web interface
- URL Scheme: `/report/:fundAddress/:timeSpanStart/:timeSpanEnd`

### Boundaries

- Recommended: Add positions (open/close & P&L per position)
- Optional: ENS Name lookups
- Optional: KYC indicators
- Optional: Printing functionality. It is not sure that printing will work without problems.
- Optional: Sorting and other interactions
- Without risk management and other data/fields that are not implemented in the smart contracts yet. I.e. Strategy, category, ...

## Auditing Web App

- Functionality on top of the Standard Report Web Interface to add an audit to the viewed data.
- We sign the contract data with Metamask.
