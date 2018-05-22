const allOrders = parent => parent.allOrders;
const buyEntries = parent => parent.buyEntries;
const sellEntries = parent => parent.sellEntries;
const totalBuyVolume = parent => parent.totalBuyVolume;
const totalSellVolume = parent => parent.totalSellVolume;

export default {
  allOrders,
  buyEntries,
  sellEntries,
  totalBuyVolume,
  totalSellVolume,
};
