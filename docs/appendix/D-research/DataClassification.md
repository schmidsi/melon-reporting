# Data classification

## Source

* **On-chain call**: Data can be retrieved from the blockchain directly by calling a function. _Examples_: current price, fund name, recent trades, ...
* **On-chain event**: Data can be retrieved from the blockchain by searching for events. This data cannot be used by smart contracts. I.e. a smart contract cannot check if a certain event happened. _Examples_: Price history
* **Off-chain**: Data that is not retrievable from the blockchain.
* **Free text**: General text. Usually lawyer jargon.
* **Given**: Data that is given (and the same) by a template/recommendation

## Availability

* **Easy**: Data is directly available through a simple (API-) call. _Example_: Fund name, AUM, asset prices, orderbook ...
* **Complicated**: Data is generally available but we need to build special tools to extract it. _Examples_: Historical prices
* **N/A**: Data is not available (yet)

## Consistency

* **Static**: Once written this data does not change anymore. _Examples_: Fund name, ...
* **Configuration**: Data that is configured out of a predefined set of possible options.
* **Generated**: Data that is generated automatically. _Examples_: Address, indexes, ...
* **Live**: Data that can change frequently. _Examples_: Prices, orderbook, AUM, ...
* **Archive**: List data that stays once written. Archive data can be consolidated for display purposes but needs to be preserved. _Examples_: Trade history, participation history, ...
* **Historic**: List data that stays once written but it's importance/density lessens with age: _Examples_: Price history; It is important to know the exact price for every minute for the last 24h but older prices can be store in less density, e.g every hour. The older the lesser the density.
  ![](/assets/data-loosing.png)
  _Red lines: saved data, black lines: available data_
