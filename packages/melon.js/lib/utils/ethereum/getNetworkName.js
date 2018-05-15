// @flow
import networks from '../constants/networks';

/**
 * `id` to name mapping helper
 */
const getNetworkName = (id: string | number) => {
  const networkEntry = Object.entries(networks).find(
    ([, value]) => id.toString() === value,
  );
  return networkEntry ? networkEntry[0].toLowerCase() : null;
};

export default getNetworkName;
