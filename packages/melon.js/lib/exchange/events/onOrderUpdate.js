import getOrder from '../calls/getOrder';

/**
 * Helper function used in melonTracker to enhance order:
 * OrderUpdate event is triggered with `id` param only.
 * @param {Object} params
 * @param {BigNumber} params.id the id of the order
 */
const onOrderUpdate = async ({ id }) => getOrder(id.toNumber());

export default onOrderUpdate;
