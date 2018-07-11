# Data classification

## Classifications

### Data Type
* **Short text**: A name, some key words or a character.
* **Long text**: A long text, usually written in prose.
* **Number**: Any representation of a number, e.g. a price or a percentage.
* **Address**: Data that is considered to be an address, e.g. an Ethereum address.
* **Time**: Any format representing time. This is mostly a unix timestamp, so the accuracy is at most one second.
* **Container**: A more complex type, holding multiple values.

### Source

* **On-chain call**: Data can be retrieved from the blockchain directly by calling a function. _Examples_: current price, fund name, recent trades, ...
* **On-chain event**: Data can be retrieved from the blockchain by searching for events. This data cannot be used by smart contracts. I.e. a smart contract cannot check if a certain event happened. _Examples_: Price history
* **Off-chain**: Data that is not retrievable from the blockchain.
* **Free text**: General text. Usually lawyer jargon.
* **Given**: Data that is given by a template/recommendation, or is known through other sources.

### Availability

* **Simple**: Data is directly available through a simple (API-) call. _Example_: Fund name, AUM, asset prices, orderbook ...
* **Complex**: Data is generally available but we need to build special tools to extract it. _Examples_: Historical prices
* **N/A**: Data is not available (yet)

### Consistency

* **Static**: Once written this data does not change anymore. _Examples_: Fund name, ...
* **Configuration**: Data that is configured out of a predefined set of possible options.
* **Generated**: Data that is generated automatically. _Examples_: Address, indexes, ...
* **Live**: Data that can change frequently. _Examples_: Prices, orderbook, AUM, ...
* **Archive**: List data that stays once written. Archive data can be consolidated for display purposes but needs to be preserved. _Examples_: Trade history, participation history, ...
* **Historic**: List data that stays once written but it's importance/density lessens with age: _Examples_: Price history; It is important to know the exact price for every minute for the last 24h but older prices can be stored in less density, e.g every hour. The older the data, the lesser the density.
  ![](/assets/data-loosing.png)
  _Red lines: saved data, black lines: available data_

## Data

| Data                | Data Type          | Source               | Availability          | Consistency
| ------------------- | ------------------ | -------------------- | --------------------- | ------------
| Fund name           | Short text         | On-chain call        | Simple                | Static
| Fund address        | Address            | Given                | Simple                | Generated 
| Timespan start      | Time               | Given                | Simple                | Configuration 
| Timespan end        | Time               | Given                | Simple                | Configuration 
| Manager             | Address            | On-chain call        | Simple                | Static 
| Inception           | Time               | On-chain call        | Simple                | Generated
| Quote symbol        | Short text         | On-chain call        | Simple                | Static 
| Quote address       | Address            | On-chain call        | Simple                | Static 
| Exchange address    | Address            | On-chain call        | Simple                | Static 
| Exchange name       | Short text         | On-chain call        | Simple                | Static 
| Total supply        | Number             | On-chain call        | Simple                | Live
| Participation       | Container          | On-chain event       | Complex               | Archive
| Audit               | Container          | On-chain call        | Simple                | Archive
| Holding symbol      | Short text         | On-chain call        | Simple                | Static
| Holding address     | Address            | On-chain call        | Simple                | Static
| Holding balance     | Number             | On-chain call        | Simple                | Live
| Price history       | Number             | On-chain event       | Complex               | Archive

## Reasoning
The reasoning behind this classification is described in [Appendix D](/appendix/D-research/DataClassification.md).

