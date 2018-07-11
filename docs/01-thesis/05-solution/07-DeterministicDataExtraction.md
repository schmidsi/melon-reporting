# Deterministic Data Extraction

Assumption: A fund setup never changes. All settings on fund creation are persistent. This might change in the future (see [Future Work](...)).

- DailyPrice (see Decisions)
- Benchmark (Reference "Fund")

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

  - $$ A $$ is the set of all assets a fund is invested in
  - $$ h_a $$ the amount of holdings the fund has of asset $$ a $$
  - $$ p_a $$ the price of asset $$ a $$

* Shareprice ($$ sp $$):

  <!-- prettier-ignore -->
  $$
  sp = \frac{aum}{s}
  $$
