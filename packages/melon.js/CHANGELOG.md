#Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to
[Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [0.8]

### Added
* `preflightMakeOrder` function
* `preflightTakeOrder` function
* `callOnExchange`function (called both in makeOrder and takeOrder)
* `make0xOffChainOrder` function: order signature with ethers-wallet is not validated by 0x yet. This is a non blocking issue for the integration since we do not need to make orders. Still investigating this issue. 
* `getExchangeList`function
* `getExchangeName`function
* `getExchangeIndex` function
* `getMethodNameSignature` function
* `getOperators` function
* `getPriceByPriceFeed` function
* `getPriceFeedsByOwner` function 
* `getRegisteredAssets` function
* `getStakersAndAmounts` function
* `getStakingPriceFeedOwner` function
* `getStakingToken` function
* `getTotalStaked` function
* `getTotalStakedByAddr` function
* `getUpdateInterval` function
* `getStakingPriceFeedContract` function
* `collectAndUpdate` function
* `depositStake` function
* `withdrawStake` function
* `setupPriceFeed` function
* `updatePriceFeed` function
* `getOlympiadContract` function
* `registerForCompetition` function
* `signOlympiadTermsAndConditions` function
* `getRegistrandFund` function


### Changed
* setupFund signature: `(
  environment: Environment,
  { name, signature, exchangeNames },
)`
* `makeOrder` signature: `(
  environment: Environment,
  {
    fundAddress,
    exchangeAddress,
    maker,
    taker,
    makerAssetSymbol,
    takerAssetSymbol,
    feeRecipient = '0x0',
    makerQuantity,
    takerQuantity,
    makerFee = 0,
    takerFee = 0,
    timestamp = 0,
    salt = '0x0',
    fillTakerTokenAmount = 0,
    dexySignatureMode = 0,
    identifier = '0x0',
    signature = {},
  },
)`
  * `takeOrder` signature: `(
  environment: Environment,
  {
    fundAddress,
    exchangeAddress,
    maker,
    taker,
    makerAssetSymbol,
    takerAssetSymbol,
    feeRecipient,
    makerQuantity,
    takerQuantity,
    makerFee,
    takerFee,
    timestamp,
    salt,
    fillTakerTokenAmount,
    dexySignatureMode = 0,
    identifier = '0x0',
    signature = {},
  },
)`
**Notable change**: Before this release, when taking an order we used to pass in the makerQuantity we wanted to fill. Now, the client needs to pass in the takerQuantity he wishes to fill. 
* `cancelOrder` signature: `(
  environment: Environment,
  {
    fundAddress,
    exchangeAddress,
    makerAssetSymbol,
    takerAssetSymbol,
    identifier,
  },
)`
* getConfig returns now: `{
  assets: Array<AssetConfig>,
  complianceAddress: Address,
  matchingMarketAddress: Address,
  matchingMarketAdapter: Address,
  zeroExV1Address: Address,
  zeroExV1AdapterAddress: Address,
  nativeAssetSymbol: TokenSymbol,
  canonicalPriceFeedAddress: Address,
  stakingPriceFeedAddress: Address,
  quoteAssetSymbol: TokenSymbol,
  rankingAddress: Address,
  riskManagementAddress: Address,
  versionAddress: Address,
  governanceAddress: Address,
}`;
* Investment/Redemption can happen in MLN or ETH by default. If isNativeAsset (passed to the function `invest` or `redeem` is true, investment/redemption happens in ETH. If false, it happens in MLN
* [label change] getPriceFeedContract -> getCanonicalPriceFeedContract
* toProcessable: inserted a third optional parameter "hack" to which we'll need to find a better solution. This hack is intended to help handle quantities coming from an off chain orders with more than 15 digits. It essentially prevent the rounding step (if number is rounded, order hash is different and then not validated by 0x contract)


## [0.7.6]

### Added

* `toDate` method to harmonize date parsing from the blockchain
* `getLastRequest` function enhanced with maxWaitingTime

### Changed

* Add dust check for makeOrder and makeOrderFromAccount (order size limit on OasisDex)
* Add exchange check isActive for getOpenOrders
* Fix offset in getActiveOrders

### Refactored

* Use `toDate` instead of new Date(value.times(1000).toNumber())

## [0.7.0]

### Changed

* MAIN -> LIVE in lib/utils/constants/networks.js
* Get the exchange address from exchangeInfo file exposed in protocol pkg in getConfig
* Protocol version bump to 0.7.0

## [0.6.44]

### Added

* getWhiteListedAssets function
* Flow Types for environment

### Changed

* [label] ConvertUnclaimedRewards -> calcSharePriceAndConvertFees
* Made getConfig more streamlined and the new single source of truth
* Cleaned up generalWalkthrough
* In-Browser wallet not available on Mainnet

### Refactored

* All asset related functions (getSymbol, toProcessable) have now `config` as
  first parameter

### Fixed

* Eslint and depcheck runs

### Removed

* Some unused functions
* All unit tests (they don't run anymore and if we redo them, we can look at
  the history)

## [0.6.43]

### Added

* Introduction of the environment concept: All interaction with the blockchain needs an argument "environment" explicitely instead of the global setup.
* isValidEnvironment helper

### Removed

* cacheAwait - I don't know why, but this tool made problems in Parity UI Dapp mode.
  Get config holds its own cache now

### Changed

* Breaking: getParityProvider is now async and tries to connect to local node first
* onBlock does not query the blocknumber anymore. See ipfs-frontend#212
* getParityProvider tries to use the injected providers from Parity UI/Chrome extension first
* Don't run unit tests on `npm test` anymore since they are broken. See #142

## [0.6.37]

### Changed

* Use new datafeed.hasRecentPrice in onBlock instead of isValid
* walkLib ' instead of "

### Fixed

* Changed promise detection in resolvePromiseObject to fix Firefox Bug: melonproject/ipfs-frontend#116
* Catch last order from new fund --> Added isValidId helper

## [0.6.0]

### Refactored

### Added

* sendTransaction function
* constructTransactionObject function
* getPastEvents (unused as of now; prepared it for later)
* getRankingContract function
* getRanking function
* createWallet function
* importWallet function
* signTermsAndConditions function
* parity and wallet folder in utils folder
* getParityProvider function
* getHoldingsAndPrices function
* getOpenOrders
* isRedeemRequestPermittedAndAllowed
* isSubscribeRequestPermittedAndAllowed
* isMakePermitted
* isTakePermitted

### Changed

* Switch from web3 to parity.js (parityfy all transactions/calls to the contracts)
* gasBoost function adjusted to parity.js
* getRecentTrades for an asset pair and getFundRecentTrades, using rpc call getLogs
* awaitDataFeedUpdate -used only for integration test
* Upgrade to protocol v0.5.2-alpha.1
* [labeling] Renamed 'creationDate' and 'timestamp' in setupFund an getFundInformations to 'inception'
* [labeling] Renamed 'timestamp' in convertUnclaimedRewards to 'date'
* [labeling] Harmonized in subscribe/redeem from atTimeStamp/atTimeStamp to timestamp
* onBlock function adjusted to parity.js
* getFundInformations also returns owner
* Pass in decrypted wallet instance as first argument to ALL functions performing an on-chain transaction
* Integrate protocol 0.6.2-deploy.9

### Removed

* depositAndApproveEther
* filterByAssetPair
* sortByPrice

### Deprecated

* "from" argument in functions; now uses wallet.address

### Fixed

* #69
* #76
* #86
* #87
* #89
* #90
* #91
* #92
* #94
* #113
* #129
* #130
* #131

## [0.3.5]

### Refactored

* Refactored /utils folder into subfolders: generic, ethereum and constants

### Added

* getWeb3 functionality
* onBlock function to query some status everyblock
* .eslintignore file instead of --ignore-path --> Ignores docs/
* Documentation.js build command: `npm run docs`
* Adding flow types & jsdocs to all library functions
* Retrieve all assets from Datafeed contract in getConfig
* Toggle Subscription and Toggle Redemption
* ConvertUnclaimedRewards
* shutDownFund

### Changed

* Renamed and refactored getNetworkName
* takeMultipleOrdersFromFund return value changed to remainingQuantity only
* Integrate protocol@0.3.8-alpha.5
* getFundById and getFundByManager
* Refactor getOrderbook
* Fix get recent trades / fund recent trades

### Deprecated

* awaitDataFeedUpdates
* depositAndApproveEther (needs more investigation)

### Fixed

* Fix #61
* Fix #60

## [0.3.2]

### Added

* getRecentTrades
* getFundRecentTrades

### Changed

* Integrate protocol@0.3.6-alpha.6
