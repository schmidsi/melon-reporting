/* eslint-disable no-underscore-dangle */
const constructTransactionObject = (contract, method, parameters, options) => {
  const functionABI = contract.abi._interface.find(e => e._name === method);

  const encodeOptions = contract._encodeOptions(
    functionABI,
    options,
    parameters,
  );
  return encodeOptions;
};

export default constructTransactionObject;
