import * as tokenInfo from '@melonproject/smart-contracts/utils/info/tokenInfo';
import BigNumber from 'bignumber.js';

const getTokenInfo = tokenSymbol => tokenInfo.live[tokenSymbol];

const getSymbol = address =>
  Object.entries(tokenInfo.live).find(
    ([symbol, info]) => info.address.toLowerCase() === address.toLowerCase(),
  )[0];

const getDecimals = tokenSymbol => getTokenInfo(tokenSymbol).decimals;

const toReadable = (quantity, tokenSymbol) => {
  const decimals = getDecimals(tokenSymbol);
  return new BigNumber(quantity).div(10 ** decimals);
};

const getPrices = order => ({
  buy: new BigNumber(order.sell.howMuch).div(order.buy.howMuch),
  sell: new BigNumber(order.buy.howMuch).div(order.sell.howMuch),
});

const formatRelayerOrderbook = exchange => (bids, asks) => {
  const formattedBids = bids.map(order => ({
    id: order.salt,
    owner: order.maker,
    isActive: true,
    sell: {
      symbol: getSymbol(order.makerTokenAddress),
      howMuch: toReadable(
        order.makerTokenAmount,
        getSymbol(order.makerTokenAddress),
      ),
    },
    buy: {
      symbol: getSymbol(order.takerTokenAddress),
      howMuch: toReadable(
        order.takerTokenAmount,
        getSymbol(order.takerTokenAddress),
      ),
    },
    type: 'buy',
    makerFee: order.makerFee,
    takerFee: order.takerFee,
    signature: order.ecSignature,
    expiration: order.expirationUnixTimestampSec,
    feeRecipient: order.feeRecipient,
    exchangeContractAddress: order.exchangeContractAddress,
    exchange,
  }));
  const formattedAsks = asks.map(order => ({
    id: order.salt,
    owner: order.maker,
    isActive: true,
    sell: {
      symbol: getSymbol(order.makerTokenAddress),
      howMuch: toReadable(
        order.makerTokenAmount,
        getSymbol(order.makerTokenAddress),
      ),
    },
    buy: {
      symbol: getSymbol(order.takerTokenAddress),
      howMuch: toReadable(
        order.takerTokenAmount,
        getSymbol(order.takerTokenAddress),
      ),
    },
    type: 'sell',
    makerFee: order.makerFee,
    takerFee: order.takerFee,
    signature: order.ecSignature,
    expiration: order.expirationUnixTimestampSec,
    feeRecipient: order.feeRecipient,
    exchangeContractAddress: order.exchangeContractAddress,
    exchange,
  }));

  const orderbook = [...formattedBids, ...formattedAsks].map(order => ({
    ...order,
    price: order.type === 'buy' ? getPrices(order).buy : getPrices(order).sell,
  }));

  return orderbook;
};

export default formatRelayerOrderbook;
