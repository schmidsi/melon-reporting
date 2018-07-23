import * as R from 'ramda';
import abi from '../contracts/abi/Auditing';
import Web3 from 'web3';
const auditingContractAddress = '0xeedaaab170b755b0c43efb809a07ea49b0ce836d';

//const web3 = new Web3(new Web3.providers.HttpProvider(process.env.JSON_RPC_ENDPOINT));
const web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/l8MnVFI1fXB7R6wyR22C'));

const opinionMap = {
  0: 'Unqualified Opinion',
  1: 'Qualified Opinion',
  2: 'Adverse Opinion',
  3: 'Disclaimer of Opinion',
};

const getAuditsFromFund = async (environment, {
  fundAddress
}) => {
  const auditingContract = await environment.api.newContract(
    abi,
    auditingContractAddress,
  );

  const len = await auditingContract.instance.getLength.call({}, [fundAddress]);

  const auditPromises = R.range(0, len.toNumber()).map(i =>
    auditingContract.instance.getByIndex
    .call({}, [fundAddress, i])
    .then(([auditor, dataHash, timespanStart, timespanEnd, opinion, comment]) => ({
      auditor,
      dataHash: dataHash.reduce(
        (carry, current) => carry + current.toString(16),
        '0x',
      ),
      timespanStart: timespanStart.toNumber(),
      timespanEnd: timespanEnd.toNumber(),
      opinion: opinionMap[opinion],
      comment: web3.utils.hexToAscii(comment)
    })),
  );

  const audits = await Promise.all(auditPromises);

  return audits;
};

export default getAuditsFromFund;
