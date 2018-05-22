import getVersionContract from '../contracts/getVersionContract';

/**
 * Returns a mapping of manager addresses linked to a fundId list.
 */
const getManagersMapping = async environment => {
  const versionContract = await getVersionContract(environment);

  const managersMapping = await versionContract.instance.managers.call();

  return managersMapping;
};

export default getManagersMapping;
