# Available data

The following ERM is a representation of the minimalistic data available on the blockchain of a fund to build charts and reports. All data can be derived from this model. It is still a challenge to obtain historical data (price feed history) since we need to search the blockchain for events. But this is subject to another chapter. For research purposes it is sufficient to know that this data is available.

![](../assets/Melon-DB-ERM.svg)

## Explanation

* The fund is in the center. Once setup a fund cannot change its name/address/owner
* Every fund has one quote asset in which its value is denominated. Usually MLN.
* Total number of shares ($$ s $$) can be retrieved with the following formula:

  <!-- prettier-ignore -->
  $$
  s = \displaystyle\sum_{i \in I} q_i
  $$

  Where $$ I $$ is the set of all investments and $$ q_i $$ the quantity of shares per investment.

* AUM ($$ aum $$) can be retrieved with the following formula:

  <!-- prettier-ignore -->
  $$
  aum = \displaystyle\sum_{a \in A} h_a * p_a
  $$

  Where:

  * $$ A $$ is the set of all assets a fund is invested in
  * $$ h_a $$ the amount of holdings the fund has of asset $$ a $$
  * $$ p_a $$ the price of asset $$ a $$

* Shareprice ($$ sp $$):

  <!-- prettier-ignore -->
  $$
  sp = \frac{aum}{s}
  $$

## Data classifications

### Source

* **On-chain call**: Data can be retrieved from the blockchain directly by calling a function. _Examples_: current price, fund name, recent trades, ...
* **On-chain event**: Data can be retrieved from the blockchain by searching for events. This data cannot be used by smart contracts. I.e. a smart contract cannot check if a certain event happened. _Examples_: Price history
* **Off-chain**: Data that is not retrievable from the blockchain.
* **Free text**: General text. Usually lawyer jargon.
* **Given**: Data that is given (and the same) by a template/recommendation

### Availability

* **Easy**: Data is directly available through a simple (API-) call. _Example_: Fund name, AUM, asset prices, orderbook ...
* **Complicated**: Data is generally available but we need to build special tools to extract it. _Examples_: Historical prices
* **N/A**: Data is not available (yet)

### Consistency

* **Static**: Once written this data does not change anymore. _Examples_: Fund name, ...
* **Configuration**: Data that is configured out of a predefined set of possible options.
* **Generated**: Data that is generated automatically. _Examples_: Address, indexes, ...
* **Live**: Data that can change frequently. _Examples_: Prices, orderbook, AUM, ...
* **Archive**: List data that stays once written. Archive data can be consolidated for display purposes but needs to be preserved. _Examples_: Trade history, participation history, ...
* **Historic**: List data that stays once written but it's importance/density lessens with age: _Examples_: Price history; It is important to know the exact price for every minute for the last 24h but older prices can be store in less density, e.g every hour. The older the lesser the density.
  ![](../assets/data-loosing.png)
  _Red lines: saved data, black lines: available data_
