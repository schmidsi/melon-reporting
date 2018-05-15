import BigNumber from 'bignumber.js';

import executeRequest from '../../../../lib/participation/transactions/executeRequest';
import getBalance from '../../../../lib/assets/calls/getBalance';
import getConfig from '../../../../lib/version/calls/getConfig';
import getEnvironment from '../../../../lib/utils/environment/getEnvironment';
import getFundForManager from '../../../../lib/version/calls/getFundForManager';
import getFundRecentTrades from '../../../../lib/exchange/calls/getFundRecentTrades';
import getNativeAssetSymbol from '../../../../lib/version/calls/getNativeAssetSymbol';
import getOpenOrders from '../../../../lib/fund/calls/getOpenOrders';
import getParityProvider from '../../../../lib/utils/parity/getParityProvider';
import getParticipation from '../../../../lib/participation/calls/getParticipation';
import getLastRequest from '../../../../lib/participation/calls/getLastRequest';
import getParticipationAuthorizations from '../../../../lib/fund/calls/getParticipationAuthorizations';
import getQuoteAssetSymbol from '../../../../lib/pricefeeds/calls/getQuoteAssetSymbol';
import getRanking from '../../../../lib/version/calls/getRanking';
import getRecentTrades from '../../../../lib/exchange/calls/getRecentTrades';
import getVersionContract from '../../../../lib/version/contracts/getVersionContract';
import importWalletFromMnemonic from '../../../../lib/utils/wallet/importWalletFromMnemonic';
import invest from '../../../../lib/participation/transactions/invest';
import redeem from '../../../../lib/participation/transactions/redeem';
import awaitDataFeedUpdates from '../../../../lib/pricefeeds/events/awaitDataFeedUpdates';
import makeOrderFromAccount from '../../../../lib/exchange/transactions/makeOrderFromAccount';
import performCalculations from '../../../../lib/fund/calls/performCalculations';
import makeOrder from '../../../../lib/fund/transactions/makeOrder';
import cancelOrder from '../../../../lib/fund/transactions/cancelOrder';
import setEnvironment from '../../../../lib/utils/environment/setEnvironment';
import setupFund from '../../../../lib/version/transactions/setupFund';
import shutDownFund from '../../../../lib/fund/transactions/shutDownFund';
import signTermsAndConditions from '../../../../lib/version/transactions/signTermsAndConditions';
import takeOrder from '../../../../lib/fund/transactions/takeOrder';
import toggleInvestment from '../../../../lib/fund/transactions/toggleInvestment';
import toggleRedemption from '../../../../lib/fund/transactions/toggleRedemption';
import toReadable from '../../../../lib/assets/utils/toReadable';
import trace from '../../../../lib/utils/generic/trace';

const INITIAL_SUBSCRIBE_QUANTITY = 10;

const shared = { etherBalance: {}, participation: {}, melonBalance: {} };

const randomString = (length = 4) =>
  Math.random()
    .toString(36)
    .substr(2, length);

fit(
  'Create fund, invest, take order, redeem',
  async () => {
    console.log('\n');

    const { providerType, api } = await getParityProvider(-1);

    // // 1 - instantiate wallet

    const wallet = importWalletFromMnemonic(
      'dinosaur pulse rice lumber machine entry tackle off require draw edge almost',
    );

    setEnvironment({ api, account: wallet, providerType });

    const environment = getEnvironment();
    const config = await getConfig(environment);

    const quoteAssetSymbol = await getQuoteAssetSymbol(environment);
    const nativeAssetSymbol = await getNativeAssetSymbol(environment);

    trace(
      `ProviderType: ${
        environment.providerType
      }, quoteAssetSymbol: ${quoteAssetSymbol}, nativeAssetSymbol: ${nativeAssetSymbol}`,
    );

    trace({
      message: `Start walkthrough with defaultAccount: ${
        environment.account.address
      }`,
    });

    shared.etherBalance.initial = await environment.api.eth
      .getBalance(environment.account.address)
      .then(balance => toReadable(config, balance, config.nativeAssetSymbol));
    trace({ message: `Etherbalance: Ξ${shared.etherBalance.initial} ` });

    shared.melonBalance.initial = await getBalance(environment, {
      tokenSymbol: quoteAssetSymbol,
      ofAddress: environment.account.address,
    });
    trace({ message: `Melon Balance: Ⓜ  ${shared.melonBalance.initial} ` });
    expect(shared.melonBalance.initial.toFixed()).toBeGreaterThan(
      INITIAL_SUBSCRIBE_QUANTITY,
    );

    shared.config = await getConfig(environment);
    trace({
      message: `Got config w OasisDex exchange at ${
        shared.config.matchingMarketAddress
      }, 0x exchange at ${shared.config.zeroExV1Address} and priceFeed at ${
        shared.config.canonicalPriceFeedAddress
      }`,
      data: shared.config,
    });

    const versionContract = await getVersionContract(environment);
    let managerToFunds = await versionContract.instance.managerToFunds.call(
      {},
      [wallet.address],
    );

    // // // If wallet already has a fund, need to shut it down before creating a new one -Only for integration purposes
    if (managerToFunds !== '0x0000000000000000000000000000000000000000') {
      console.log('Existing fund needs to be shut down: ', managerToFunds);
      await shutDownFund(environment, { fundAddress: managerToFunds });
      console.log('Shutting down existing fund');
      managerToFunds = await versionContract.instance.managerToFunds.call({}, [
        environment.account.address,
      ]);
    }

    const signature = await signTermsAndConditions(environment);
    shared.vaultName = randomString();
    shared.vault = await setupFund(environment, {
      name: shared.vaultName,
      signature,
      exchangeNames: ['MatchingMarket', 'ZeroExExchange'],
    });

    expect(shared.vault.name).toBe(shared.vaultName);
    expect(shared.vault.address).toBeTruthy();
    expect(shared.vault.inception instanceof Date).toBeTruthy();
    trace({
      message: `vaultCreated: ${shared.vault.name} (${shared.vault.id}) at ${
        shared.vault.address
      }`,
      data: shared,
    });

    const fundCreatedByManager = await getFundForManager(environment, {
      managerAddress: environment.account.address,
    });
    expect(fundCreatedByManager).toBe(shared.vault.address);

    shared.participation.initial = await getParticipation(environment, {
      fundAddress: shared.vault.address,
      investorAddress: environment.account.address,
    });
    expect(shared.participation.initial.personalStake.toNumber()).toBe(0);
    expect(shared.participation.initial.totalSupply.toNumber()).toBe(0);

    shared.initialCalculations = await performCalculations(environment, {
      fundAddress: shared.vault.address,
    });

    trace({
      message: `Initial calculations- GAV: ${
        shared.initialCalculations.gav
      }, NAV: ${shared.initialCalculations.nav}, Share Price: ${
        shared.initialCalculations.sharePrice
      }, totalSupply: ${shared.initialCalculations.totalSupply}`,
      data: shared,
    });
    expect(shared.initialCalculations.sharePrice.toNumber()).toBe(1);
    expect(shared.initialCalculations.gav.toNumber()).toBe(0);

    shared.subscriptionRequest = await invest(environment, {
      fundAddress: shared.vault.address,
      numShares: new BigNumber(2),
      offeredValue: new BigNumber(20),
      isNativeAsset: false,
    });

    trace({
      message: `Subscribe requested. shares: ${
        shared.subscriptionRequest.numShares
      }`,
      data: shared,
    });

    shared.lastRequest = await getLastRequest(environment, {
      fundAddress: shared.vault.address,
      investorAddress: environment.account.address,
    });

    expect(shared.lastRequest.canBeExecutedInMs).toBe(0);

    shared.executedSubscriptionRequest = await executeRequest(environment, {
      id: shared.subscriptionRequest.id,
      fundAddress: shared.vault.address,
      // 0,
    });

    trace(`executedSubscriptionRequest ${shared.executedSubscriptionRequest}`);

    shared.participation.invested = await getParticipation(environment, {
      fundAddress: shared.vault.address,
      investorAddress: environment.account.address,
    });

    // expect(shared.participation.invested.personalStake.toNumber()).toBe(
    //   INITIAL_SUBSCRIBE_QUANTITY,
    // );
    // expect(shared.participation.invested.totalSupply.toNumber()).toBe(
    //   INITIAL_SUBSCRIBE_QUANTITY,
    // );

    trace({
      message: `Subscribe request executed. Personal stake: ${
        shared.participation.invested.personalStake
      }`,
    });

    shared.midCalculations = await performCalculations(environment, {
      fundAddress: shared.vault.address,
    });

    trace({
      message: `Mid calculations- GAV: ${shared.midCalculations.gav}, NAV: ${
        shared.midCalculations.nav
      }, Share Price: ${shared.midCalculations.sharePrice}, totalSupply: ${
        shared.midCalculations.totalSupply
      }`,
      data: shared,
    });

    shared.simpleOrder = await makeOrderFromAccount(environment, {
      sell: {
        howMuch: new BigNumber(1),
        symbol: nativeAssetSymbol,
      },
      buy: {
        howMuch: new BigNumber(7),
        symbol: 'MLN-T',
      },
    });

    trace({
      message: `Regular account made order with id: ${shared.simpleOrder.id}`,
    });
    // shared.vault = { address: '0xAecaFE82AfB48DD0b23B2D8622c1f393B780a220' };
    shared.fundOrder = await makeOrder(environment, {
      fundAddress: shared.vault.address,
      exchangeAddress: config.matchingMarketAddress,
      maker: shared.vault.address,
      taker: '0x0',
      makerAssetSymbol: 'MLN-T',
      takerAssetSymbol: nativeAssetSymbol,
      feeRecipient: '0x0',
      makerQuantity: new BigNumber(9),
      takerQuantity: new BigNumber(1),
      makerFee: 0,
      takerFee: 0,
      timestamp: 0,
      salt: '0x0',
      fillTakerTokenAmount: 0,
      dexySignatureMode: 0,
      identifier: '0x0',
      signature: {},
    });

    trace({
      message: `Fund made order with id: ${shared.fundOrder.id}`,
    });

    shared.openOrders = await getOpenOrders(environment, {
      fundAddress: shared.vault.address,
    });
    console.log(shared.openOrders);

    shared.cancelOrder = await cancelOrder(environment, {
      fundAddress: shared.vault.address,
      exchangeAddress: config.matchingMarketAddress,
      makerAssetSymbol: 'MLN-T',
      takerAssetSymbol: 'WETH-T',
      identifier: shared.fundOrder.id,
    });
    trace({
      message: `Fund canceled its open order with id: ${
        shared.cancelOrder.id
      } on ${shared.cancelOrder.exchange} exchange`,
    });

    shared.offChainOrder = {
      maker: '0x00360d2b7d240ec0643b6d819ba81a09e40e5bcd',
      taker: '0x0000000000000000000000000000000000000000',
      feeRecipient: '0x0000000000000000000000000000000000000000',
      makerTokenAddress: '0xa27af8713623fcc239d49108b1a7b187c133e88b',
      takerTokenAddress: '0xdc5fc5dab642f688bc5bb58bef6e0d452d7ae123',
      exchangeContractAddress: '0xb34761bee0788100919106e3d59184fb7c0d5421',
      salt: '613993',
      makerFee: '0',
      takerFee: '0',
      makerTokenAmount: new BigNumber('380179538776789952').times(10 ** -18),
      takerTokenAmount: new BigNumber('3735408424271252864').times(10 ** -18),
      expirationUnixTimestampSec: '1525139211841',
      ecSignature: {
        v: 28,
        r: '0x421ce77a512aba0496c48610760cb5c7609c6fd4f4dbcf620dd7cdc9069c181d',
        s: '0x4ca0d4d39155744a57dc3e25e6a51fccd6f8c593963df5ea22637b24de562f8a',
      },
    };

    trace({
      message: `Regular account made order on 0x with orderHash: ${
        shared.offChainOrder.orderHash
      }`,
    });
    BigNumber.config({ ERRORS: false });

    shared.taken0xOrder = await takeOrder(environment, {
      fundAddress: shared.vault.address,
      exchangeAddress: config.zeroExV1Address, // MATCHING MARKET,
      maker: shared.offChainOrder.maker,
      taker: shared.offChainOrder.taker,
      makerAssetSymbol: 'WETH-T',
      takerAssetSymbol: 'MLN-T',
      feeRecipient: shared.offChainOrder.feeRecipient,
      makerQuantity: shared.offChainOrder.makerTokenAmount,
      takerQuantity: shared.offChainOrder.takerTokenAmount,
      makerFee: shared.offChainOrder.makerFee,
      takerFee: shared.offChainOrder.takerFee,
      timestamp: shared.offChainOrder.expirationUnixTimestampSec,
      salt: shared.offChainOrder.salt,
      fillTakerTokenAmount: shared.offChainOrder.takerTokenAmount,
      identifier: '0x0',
      signature: shared.offChainOrder.ecSignature,
    });

    trace({
      message: `Fund took order with id: ${shared.offChainOrder.orderHash}`,
      data: shared,
    });

    shared.fundEtherBalance = await getBalance(environment, {
      tokenSymbol: 'WETH-T',
      ofAddress: shared.vault.address,
    });

    trace({ message: `Fund WETH balance: ${shared.fundEtherBalance}` });

    shared.endCalculations = await performCalculations(environment, {
      fundAddress: shared.vault.address,
    });

    trace({
      message: `End calculations- GAV: ${shared.endCalculations.gav}\n NAV: ${
        shared.endCalculations.nav
      }, Share Price: ${shared.endCalculations.sharePrice}, totalSupply: ${
        shared.endCalculations.totalSupply
      }`,
      data: shared,
    });

    // Redemption in ETH
    shared.RedemptionRequest = await redeem(environment, {
      fundAddress: shared.vault.address,
      numShares: new BigNumber(1),
      requestedValue: shared.endCalculations.sharePrice,
      isNativeAsset: false,
    });

    trace({
      message: `Redemption requested. shares: ${
        shared.RedemptionRequest.numShares
      }`,
      data: shared,
    });

    shared.lastRequest = await getLastRequest(environment, {
      fundAddress: shared.vault.address,
      investorAddress: environment.account.address,
    });

    await awaitDataFeedUpdates(environment, 2);

    shared.executedRedemptionRequest = await executeRequest(environment, {
      id: shared.RedemptionRequest.id,
      fundAddress: shared.vault.address,
      isNativeAsset: true,
      // 0,
    });

    trace(`executedRedemptionRequest ${shared.executedRedemptionRequest}`);

    shared.participation.invested = await getParticipation(environment, {
      fundAddress: shared.vault.address,
      investorAddress: environment.account.address,
    });

    trace({
      message: `Redemption request executed. Personal stake: ${
        shared.participation.invested.personalStake
      }`,
    });

    shared.toggledSubscription = await toggleInvestment(environment, {
      fundAddress: shared.vault.address,
    });

    expect(shared.toggledSubscription).toBe(false);

    shared.toggledSubscription = await toggleInvestment(environment, {
      fundAddress: shared.vault.address,
    });

    expect(shared.toggledSubscription).toBe(true);

    shared.toggledRedemption = await toggleRedemption(environment, {
      fundAddress: shared.vault.address,
    });

    expect(shared.toggledRedemption).toBe(false);
    shared.toggledRedemption = await toggleRedemption(environment, {
      fundAddress: shared.vault.address,
    });
    expect(shared.toggledRedemption).toBe(true);

    shared.participationAuthorizations = await getParticipationAuthorizations(
      environment,
      { fundAddress: shared.vault.address },
    );
    expect(shared.participationAuthorizations.subscriptionAllowed).toBe(true);
    expect(shared.participationAuthorizations.redemptionAllowed).toBe(true);

    shared.recentTrades = await getRecentTrades(environment, {
      baseTokenSymbol: nativeAssetSymbol,
      quoteTokenSymbol: quoteAssetSymbol,
    });
    shared.fundRecentTrades = await getFundRecentTrades(environment, {
      fundAddress: shared.vault.address,
    });
    expect(shared.recentTrades.length).toBeGreaterThanOrEqual(1);
    // expect(shared.fundRecentTrades.length).toBe(1);

    shared.ranking = await getRanking(environment);
    expect(shared.ranking.length).toBeGreaterThanOrEqual(1);
    expect(
      shared.ranking.find(
        ({ address, name }) =>
          address.toLowerCase() === shared.vault.address.toLowerCase() &&
          name === shared.vaultName,
      ),
    ).toBeTruthy();

    return true;
  },
  10 * 60 * 1000,
);
