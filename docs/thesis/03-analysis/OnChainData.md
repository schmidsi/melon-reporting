# On-Chain data

The following ERM is a representation of the minimalistic data available on the blockchain of a fund to build charts and reports. All data can be derived from this model. It is still a challenge to obtain historical data (price feed history) since we need to search the blockchain for events. But this is subject to another chapter. For research purposes it is sufficient to know that this data is available.

![](/assets/Melon-DB-ERM.svg)

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
