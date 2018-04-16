# Solidity research

## Resources

### Solidity
[Solidity](https://solidity.readthedocs.io/) is a programming language for smart contract development on the Ethereum blockchain. 

### Parity
[Parity](https://www.parity.io/) is a client to interact with the Ethereum blockchain. It provides an easy way to set up a development chain where we can test our own smart contracts without limitations.

### Web3.js
[Web3.js](https://web3js.readthedocs.io/en/1.0/index.html) is a JavaScript API for interacting with local or remote ethereum nodes. It enables us to develop clients which communicate with our smart contracts on the blockchain.

## Learnings
While learning *Solidity*, we created a cheatsheet to have a compact summary while developing our own smart contracts. The cheatsheet can be found in the appendix [Solidity cheatsheet](/08-appendix/Solidity.html).

The *ABI* (Application Binary Interface) can be understood as the API to a deployed smart contract. *Web3.js* or a similar library uses this interface to interact with the Ethereum ecosystem.

*Web3* requires us to specify a provider. Here we point to a running Ethereum client, in our case a running *Parity* instance.
Through the ABI, we can call functions on the contract instance through `contract.methods`. Methods that store value on the blockchain can be executed by `send()`, 
Read-only methods can be called with `call()`. The result is a JSON RPC response containing the requested values.
It is possible to catch the `error`, `transactionHash` or `receipt` with the web3-function `on()`.
All events on the chain can be retrieved with the `getPastEvents()` method. We could also subsrcibe on new events and get notified instantly when they are fired from withing smart contracts.

## Assessment
The *melon protocol* is already dependent on the Ethereum blockchain and uses smart contracts written in Solidity extensively.
Furthermore, smart contracts support us to store melon fund audit information in a secure and consistent way and provide us with the features we require to verify auditors.

We also looked into [truffle suite](http://truffleframework.com/) and [dapp tools](https://dapp.tools/).
*Parity* and *web3.js* provide us with all the features we need to develop smart contracts and interact with them for now though.

## Possible limitations and considerations
It is of upmost importance that the smart contracts we develop for this project are as light as possible. Storing data on the blockchain can be expensive. We presume that it is in the interest of the auditors that the fee of storing audit information of a fund is as small as possible.
For this, we will keep an eye on the *gas cost* that is required to store information.

As this project and the corresponding smart contracts are not dealing with *Ether* directly, we do not have to account security considerations as in sending or receiving currencies. Most of the data that we will be acquiring from the blockchain can be regarded as *read only*.
