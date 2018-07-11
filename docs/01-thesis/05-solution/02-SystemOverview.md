# System Overview

![](/assets/system-overview.svg?v1)

## Explanation

- At highest level the system can be divided in blockchain and non-blockchain parts
- The non-blockchain parts communicate with the blockchain through the Ethereum JSON RPC protocol {{"JSONRPC"|cite}}
- Code that runs on the blockchain is written in Solidity
- Code that interacts with the blockchain is written in JavaScript/React
- At the core of the system is the Melon Protocol, which is provided by Melonport
- The Auditing Contracts adds the auditing functionality on top of the Melon Protocol
- In the future the Melon Protocol risk management module might use the Auditing Contract to permit/forbit trades wether the fund is properly audited or not.
- The data extractor can extract data from the blockchain in the specified Report Data Schema format. It has different strategies to do so:
  - Directly call a function of the Melon Protocol (easy and fast)
  - Search the logs for events of the Melon Protocol (cumbersome and slow)
  - Use a on-chain data extractor helper (fast but troublesome to set up)
  - Directly call a function of the Auditing Contract (easy and fast)
- The Report Web Interface uses this extracted data to render a standard report as a web app.
  - This web app has some interactive features such as selecting the timespan but is fairly static to also be usable on paper.
  - Also this web app has the functionality to add an audit over a given timespan and put this back on the blockchain.
  - Cryptographically speaking: The report data for the given timespan is hashed and put on the blockchain through a transaction signed by the auditor.
