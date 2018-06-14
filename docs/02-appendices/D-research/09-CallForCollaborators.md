# Call for collaborators

## Summary

Attached to this brief is

There is a short refresher about blockchain/smart-contracts/melon-protocol at
the end of this brief.

## The case for reporting / auditing

Melonport is already talking to people who want to setup and manage crypto
funds powered by the Melon protocol fully regulated. In order to be compliant
they need to incorporate a solid reporting and auditing process. Some aspects
of this process differ from the traditional process. Namely data sourcing:
One can extract almost all relevant data reliably directly from the immutable
blockchain:

- Investments: Every invest/redeem into the fund is directly linked to an
  address and through the transaction hash to the exact block.
- Trades: It is possible to retrace every trade of the fund manager, also with
  a verifiable distinct transaction hash.
- Policy: A fund is setup with certain policies which are immutable and
  automatically enforced like KYC, fees, asset whitelist, best price exection,
  ... See [Risk Engineering](http://www.docs.melonport.com/chapters/risk_engineering.html#risk-engineering)
- Identification: It's possible to resolve some addresses to persons through
  projects like uPort.

In this thesis we create:

- A data extractor to extract this data from the blockchain
- A data schema that describes the format of this data
- A data visualiser to make this raw data easily verifiable
- A data signer to cryptographically sign & approve a certain set of data

## Call to action

In order to test the assumptions made in this thesis we need a knowledgeable
sparring partner from the industry who understands:

- The blockchain
- The Melon protocol
- Its implications on the financial sector in general
- Its implications on reporting and auditing in specific

Who can help us to

## Refresher

### Blockchain (Ethereum)

- The blockchain is a decentralized and trustless computer with with a guaranteed
  transaction history that cannot be tampered with.

- It is possible to write smart contracts which are nothing more than just code
  consisting of:

  - A data schema with an initial state
  - Rules to change this state
  - E.g. An ERC20 token is just a registry of token holders with their balances
    and rules how they can "transfer" these tokens or change the balances.

- Smart contracts running on the same blockchain can interact with each other.

- Users are identified through a public-key/private-key cryptographic mechanisms.

### Melon Protocol

- The Melon protocol is a set of smart contracts on the Ethereum blockchain that
  enables setting up and managing a fund consisting of ERC20 tokens.
- Technically, a Melon fund is more like a managed account.

- It has two main actors:

  - Manager:
    - Sets up the fund: Defining the rules like:
      - Allowed exchanges
      - Performance fee
      - Management fee
      - Best price execution
      - Asset (Token) white-list
      - ...
    - Manages the fund:
      - Executes trades on decentralised exchanges in the name of the fund
  - Investor:
    - Invests into a fund and receives shares for it
    - Can redeem at any time and receives the tokens according to his shares

- Under the following guarantees:
  - Rules set at fund setup cannot be changed later
  - The fund manager cannot embezzle the assets in the fund

http://www.docs.melonport.com/
