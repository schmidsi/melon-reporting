# Implementation

## First draft of auditing contract

In a rough first draft for the auditing part of the project, we had the idea of storing the datahash of the audit along with a signature. To proof an audit as legit, the auditor had to create the signature with `web3.eth.sign` {{"web.eth.sign"|cite}} and split it up into the values `r`, `s`, `v`.
The auditor then called the function `audit` of the auditing smart contract with the _fund address_, the _datahash_ and the values _r_, _s_ and _v_.
On the Solidity contract, it was a requirement that the provided signature is valid before storing the audit data on the ledger. With the function `checkSignature`, we recovered the datahash and signature values with the elliptic curve recovery function `ecrecover` {{"SolidityCryptoFunctions"|cite}} to the auditor address. This address has to be equal to the sender address.

After receiving feedback from Markus Knecht about this approach, we discussed the necessity of signing the audits "by hand". Basically, a transaction on the blockchain is by itself a signature. The only reasonable use case of an additional signature is when additional participants have to identify themselves. An example for this is the [0x protocol](https://0xproject.com/) where on-chain data and off-chain data is mixed. This is not the case for auditing (there is only one auditor), so we dropped this functionality for the prototype.

## Prototype design

## Auditing contract

To receive feedback from the Melonport staff about our prototype implementation of the auditing contract, we set up a MIP (Melon Improvement Proposal)

## Test frontend for the auditing contract
