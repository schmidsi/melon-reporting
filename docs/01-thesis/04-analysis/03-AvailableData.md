# Available Data

## On-Chain Data

The following ERM is a representation of the minimalistic data available on the blockchain of a fund to build charts and reports. All data can be derived from this model.

Please note:

- The data is not actually stored like this on the blockchain, this is just for better understanding
- The Audit entity is added by this thesis

![](/assets/Melon-DB-ERM.drawio.png)

**Quantifiers** (same as regex):

- 1: Only one
- \*: Zero or more
- +: One or more
- ?: Zero or one
- 2+: Two or more

### Explanation

- All data is considered immutable. Example: Once a fund is setup with certain parameters, it cannot change anymore.
- **Fund**: The fund is in the center and the starting point.
  - Every fund has one quote asset in which its value is denominated. Usually ETH or DAI.
- **Investment**: In the beginning one or more investors invest in the fund. Usually with the quote asset.
  - Example of first investment: Buying 1 share buy putting one ETH in the fund. --> Shareprice of 1.
- **Asset**: Basically a fund holds different assets, one of them the quote asset. Example: The fund holds 2 ETH and 3 MLN.
- **Price**: Every trading pair (base asset / quote asset) has a recent price and a price history. Example: The price of MLN/ETH is 0.05 and was 0.06 two weeks ago.
- **Trade**: The fund can exchange those assets through trades. Example: Selling 20 MLN for 1 ETH.
- **Audit**: This thesis adds the audit functionality on top of the fund.
  - An audit is a timespan with an opinion and an optional comment.
  - Example: PwC audited the fund with address 0x123 for the timespan from 1. January 2018 to 31. March 2018 with a "unqualified opinion" and a comment of "all good".

## Off-Chain Data

The data extractor shall always produce the report on same input arguments. An extractor function must therefore be deterministic. With off-chain data, determinism is not given naturally like with on-chain data.

There might be a way to include off-chain data into the current architecture nontheless, if this will be of need in the future.

One could hash off-chain data and put this hash on the chain as an anchor. This anchor could then be used to resolve the data.

But for this thesis we do not include off-chain data.
