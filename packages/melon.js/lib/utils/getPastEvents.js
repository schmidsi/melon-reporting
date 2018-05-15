import Api from '@parity/api';

const getPastEvents = async (
  environment,
  { contract, address, eventSignature, fromBlock, toBlock, paramName },
) => {
  const hashed = Api.util.sha3(eventSignature);

  const filter = {
    fromBlock,
    toBlock,
    address,
    topics: [hashed],
  };

  const pastEvents = await environment.api.eth.getLogs(filter);

  const allReceipts = await Promise.all(
    pastEvents.map(async event =>
      environment.api.eth.getTransactionReceipt(event.transactionHash),
    ),
  );

  return allReceipts.map(receipt => {
    const decodedLogs = contract.parseEventLogs(receipt.logs);
    return `${decodedLogs[0].event} ; ${
      decodedLogs[0].params[paramName].value
    }`;
  });
};

export default getPastEvents;

// just decode data
