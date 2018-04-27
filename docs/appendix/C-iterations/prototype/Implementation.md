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


## Melon Fund Report Data Schema

We replaced the first name of the report data schema from _Interchangeable Fund Data Format_ to _Melon Fund Report Data Schema_ (MFRDS) because it describes its use better.

### Ethereum Address
Ethereum addresses have the following attributes:
* starting with 0x
* followed by 40 hex characters

This considered, we defined this regular expression to validate Ethereum addresses: 
```regex
^0x(\\d|[A-F]|[a-f]){40}$
```

*Note*: The uppercase chars are checksums described in [EIP-55](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-55.md)

### ERC20 token symbols
For ERC20 token symbol standards, we found this discussion: [Link](https://ethereum.stackexchange.com/questions/25619/is-there-length-limits-on-token-symbols)

So there are currently only symbols on the chain with the following attributes:
* type: string
* length: 1 to 9
* all uppercase letters

This considered, we defined this regular expression to validate ERC20 token symbols: 
```regex
^([A-Z]){1,9}$
```

### Legal Entity and Strategy
Legal Entity and Strategy are optional, because this data is not (yet) saved on the blockchain.
It will be part of the "future work" chapter.

### Big Numbers
In Ethereum, big numbers are often used. For melon, we see this in places like "token quantity".

These numbers will have the following attributes:
* type: string
* numbers followed by a dot (.) followed by numbers

This considered, we defined this regular expression to validate big numbers: 
```regex
^\d*.\d*$
```

### Market Cap Range
The "max" value of `marketCapRange` is not required. When none is supplied, the property is undefined, which means "max" is (positive) infinity.

### Fund Report Data Example

This was a rough first draft of an *MFRDS* instance:

```json
{
  "name": "Example Fund",
  "inception": "yyyy-mm-dd hh:mm:ss",
  "description": "This fund is high risk",
  "manager": "0xbad...a55",
  "nav": 1000,
  "quoteSymbol": "MLN",
  "gav": 1100,
  "timestamp": "yyyy-mm-dd hh:mm:ss",
  "holdings": [
    {
      "symbol": "ETH",
      "amount": 1000
    }
  ],
  "trades": [
    {
      "buySymbol": "ETH",
      "sellSymbol": "MLN",
      "buyAmount": 100,
      "sellAmount": 50,
      "timestamp": "yyyy-mm-dd hh:mm:ss",
      "market": "0xdead...beef"
    }
  ],
  "audits": [
    {
      "timestamp": "yyyy-mm-dd hh:mm:ss",
      "auditor": "0xdead...beef1",
      "dataHash": "QmXZcdco6wZEA2paGeUnoshSB4HJiSTDxagqXerDGop6or",
      "signature": "0x23rasdfasdlfjhasldkfhas"
    }
  ]
}
```

This is the example data after the prototype schema definition, following the rules of the schema v0.1:
```json
// copy paste example here
```
