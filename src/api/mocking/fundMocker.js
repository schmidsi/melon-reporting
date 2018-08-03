import * as R from 'ramda';
import faker from 'faker';

import {
  multiply,
  add,
  divide,
  greaterThan,
} from '~/utils/functionalBigNumber';

import fundSimulator from '~/api/fundSimulator';
import isSameToken from '~/api/queries/isSameToken';
import { randomBigNumber, randomHexaDecimal } from './utils';

import getDebug from '~/utils/getDebug';

const secondsPerDay = 60 * 60 * 24;

const debug = getDebug(__filename);

const getHolding = (calculations, token) =>
  calculations.allocation.find(holding => isSameToken(holding.token, token))
    .quantity;

const getPrice = (calculations, token) =>
  calculations.allocation.find(holding => isSameToken(holding.token, token))
    .price;

const getOrthogonalPrice = (calculations, buyToken, sellToken) => {
  const buyTokenPrice = getPrice(calculations, buyToken);
  const sellTokenPrice = getPrice(calculations, sellToken);
  return divide(sellTokenPrice, buyTokenPrice);
};

const getTimestamp = (data, dayIndex) =>
  add(data.meta.timeSpanStart, multiply(dayIndex, secondsPerDay));

const getToken = R.prop('token');

const defaultActionWeights = {
  invest: 3,
  redeem: 1,
  trade: 20,
  nothing: 15,
};

const selectRandomWeightedAction = actions => {
  const list = R.toPairs(actions);

  const accumulator = (carry, [action, weight]) => [
    carry + weight,
    [action, carry + weight],
  ];

  const [total, prepared] = R.mapAccum(accumulator, 0, list);

  const selector = Math.random() * total;
  const [finalAction] = prepared.find(([action, weight]) => weight >= selector);

  return finalAction;
};

const fundMocker = initialData => {
  const fund = fundSimulator(initialData);

  fund.dispatch({
    type: 'INVEST',
    value: '100',
    timestamp: getTimestamp(initialData, 0),
    investor: initialData.meta.manager,
  });

  const reportDays = Math.round(
    (initialData.meta.timeSpanEnd - initialData.meta.timeSpanStart) /
      secondsPerDay,
  );

  R.range(0, reportDays).map(dayIndex => {
    const { data, calculations } = fund.getState();

    const dispatchAction = R.cond([
      [
        R.equals('invest'),
        () =>
          fund.dispatch({
            type: 'INVEST',
            value: randomBigNumber(1, 100),
            timestamp: getTimestamp(data, dayIndex),
            investor: faker.random.arrayElement(data.participations.investors),
          }),
      ],
      [
        R.equals('redeem'),
        () => {
          const investor = faker.random.arrayElement(
            calculations.investors.filter(i => greaterThan(i.shares, 0)),
          );

          fund.dispatch({
            type: 'REDEEM',
            timestamp: getTimestamp(data, dayIndex),
            investor,
            shares: randomBigNumber(0, investor.shares),
          });
        },
      ],
      [
        R.equals('trade'),
        () => {
          const sellToken =
            Math.random() >= 0.5
              ? data.meta.quoteToken
              : getToken(
                  faker.random.arrayElement(
                    data.holdings.filter(holding =>
                      greaterThan(holding.quantity, 0),
                    ),
                  ),
                );

          const buyToken = isSameToken(sellToken, data.meta.quoteToken)
            ? getToken(
                faker.random.arrayElement(
                  data.holdings.filter(
                    holding => !isSameToken(sellToken, holding.token),
                  ),
                ),
              )
            : data.meta.quoteToken;

          const type = isSameToken(sellToken, data.meta.quoteToken)
            ? 'buy'
            : 'sell';

          const orthogonalPrice = getOrthogonalPrice(
            calculations,
            buyToken,
            sellToken,
          );

          const sellHowMuch =
            type === 'buy'
              ? randomBigNumber(
                  0,
                  divide(getHolding(calculations, sellToken), 2),
                )
              : randomBigNumber(0, getHolding(calculations, sellToken));

          const buyHowMuch = multiply(sellHowMuch, orthogonalPrice);

          fund.dispatch({
            type: 'TRADE',
            sellToken,
            sellHowMuch,
            buyToken,
            buyHowMuch,
            timestamp: getTimestamp(data, dayIndex),
            exchange: faker.random.arrayElement(data.meta.exchanges),
            transaction: randomHexaDecimal(64),
          });
        },
      ],
      [
        R.equals('nothing'),
        () =>
          fund.dispatch({
            type: 'NOTHING',
            timestamp: getTimestamp(data, dayIndex),
          }),
      ],
    ]);

    dispatchAction(selectRandomWeightedAction(defaultActionWeights));
  });

  const finalState = fund.getState();

  debug('Final Mock State', finalState);

  return finalState;
};

export default fundMocker;
