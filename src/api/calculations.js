const calculateAumHistory = dailyHoldings => {
  //const aumHistory = [];

  //dailyHoldings.forEach(day => {});
  return dailyHoldings.map(holdingsOfDay => {
    return holdingsOfDay.reduce((aum, holding) => {
      return aum + holding.quantity * holding.price;
    }, 0);
  });
};

export { calculateAumHistory };
