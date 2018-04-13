# Prototype

## Goal

The purpose of the prototype is to build something early that can already be shown to different
stakeholders to collect feedback. This can be in the form of: Click dummies, wireframes, mockups, specifications
or actual functional prototypes.

## Specification

We suggested the following specifications to the customer and coaches and they approved them (TODO).

### Must

These are the minimum tasks that need to be done after the project week.

#### Melon Auditing Contract Standard Proposal

Introduce new functionality to the community is through a Solidity interface specification proposal. In Ethereum they are called ERC. We create an interface specification proposal for the auditing contract so that the core Melon smart contract developers can see the direction we are going and give early feedback.

* A good example is the [ERC-223 Token Standard Proposal](https://github.com/ethereum/EIPs/issues/223)
* We will submit this as a [MIP (Melon Improvement Proposal)](https://github.com/melonproject/MIP/issues)

#### Standard Report Mockup Draft

To have something to show potential users of the system we create a fictional report that is inspired by the legacy reports that we researched in chapter "Research". This will be in the form of a fictional mockup draft: The deliverable is a static image export from Sketch:

* All applicable information from KIID but also timely reports. E.g. Strategy, SRRI, past performance, benchmark, ...
* All applicable information from the blockchain. E.g. Holdings, recent trades, fund name, risk engineering settings, ...
* Draft means: Not a pixel perfect design, but all information already visible or indicated.
* Fictional: We do not work with real data but we invent data that could be real.

#### Interchangeable Fund Data Format Draft

Create a general interchangeable fund data format that is the basis for all the different reports and also the data that is actually hashed and signed by the auditing contract.

* A annotated JSON Schema and/or GraphQL Schema
* An example JSON

### Bonus

The "must" tasks are estimated pessimistic so there should be time left for some of the following tasks:

#### Deploy Auditing Contract Draft To Kovan

Deploy a first draft of the auditing contract to Kovan and link it to the current Melon smart contracts.

* Auditing smart contracts coded and ready to deploy
* Deployed to Kovan

#### Auditing Web Interface Draft

Write a simple web interface to interact with the auditing smart contracts.

#### Standard Report Web Interface Draft

Start with the web interface that can transform the interchangeable fund data into a standard report.

## Bla

### First draft of auditing contract

In a rough first draft for the auditing part of the project, we had the idea of storing the datahash of the audit along with a signature. To proof an audit as legit, the auditor had to create the signature with `web3.eth.sign` {{"web.eth.sign"|cite}} and split it up into the values `r`, `s`, `v`.
The auditor then called the function `audit` of the auditing smart contract with the _fund address_, the _datahash_ and the values _r_, _s_ and _v_.
On the Solidity contract, it was a requirement that the provided signature is valid before storing the audit data on the ledger. With the function `checkSignature`, we recovered the datahash and signature values with the elliptic curve recovery function `ecrecover` {{"SolidityCryptoFunctions"|cite}} to the auditor address. This address has to be equal to the sender address.

After receiving feedback from Markus Knecht about this approach, we discussed the necessity of signing the audits "by hand". Basically, a transaction on the blockchain is by itself a signature. The only reasonable use case of an additional signature is when additional participants have to identify themselves. An example for this is the [0x protocol](https://0xproject.com/) where on-chain data and off-chain data is mixed. This is not the case for auditing (there is only one auditor), so we dropped this functionality for the prototype.

### Prototype design

### Auditing contract

### Test frontend for the auditing contract
