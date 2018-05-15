const orderbookTest = (orderbook, assetPairArray) =>
  orderbook.reduce((previous, current) => {
    expect(assetPairArray).toContain(current.buy.symbol);
    expect(assetPairArray).toContain(current.sell.symbol);
    if (previous) expect(current.price.lt(previous.price)).toBeTruthy();
    if (previous && previous.type !== current.type)
      expect(previous.type).toBe('sell');

    if (previous && current.type === 'sell')
      expect(
        previous.cumulativeVolume.minus(current.cumulativeVolume).toNumber(),
      ).toBe(previous.sell.howMuch.toNumber());

    if ((previous.type === current.type) === 'buy')
      expect(
        current.cumulativeVolume.minus(previous.cumulativeVolume).toNumber(),
      ).toBe(current.buy.howMuch.toNumber());
    return current;
  });

export default orderbookTest;
