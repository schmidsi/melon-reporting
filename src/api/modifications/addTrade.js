import setPath from '~/api/utils/setPath';

const addTrade = ({
  buyToken,
  buyHowMuch,
  sellToken,
  sellHowMuch,
  exchange,
  timestamp,
  transaction,
}) =>
  setPath(['data', 'trades'], ({ data, calculations }) => [
    ...data.trades,
    {
      buy: {
        token: buyToken,
        howMuch: buyHowMuch,
      },
      sell: {
        token: sellToken,
        howMuch: sellHowMuch,
      },
      exchange,
      timestamp,
      transaction,
    },
  ]);

export default addTrade;
