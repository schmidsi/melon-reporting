import * as R from 'ramda';
import Web3 from 'web3';
import abi from '../contracts/abi/Auditing';

const auditingContractAddress = '0xe05339048101af344575e651ce343e04cbbc93d8';

const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.JSON_RPC_ENDPOINT),
);

const opinionMap = {
  0: 'Unqualified Opinion',
  1: 'Qualified Opinion',
  2: 'Adverse Opinion',
  3: 'Disclaimer of Opinion',
};

const getAuditsFromFund = async (environment, { fundAddress }) => {
  const auditingContract = await environment.api.newContract(
    abi,
    auditingContractAddress,
  );

  const len = await auditingContract.instance.getLength.call({}, [fundAddress]);

  const auditPromises = R.range(0, len.toNumber()).map(i =>
    auditingContract.instance.getByIndex
      .call({}, [fundAddress, i])
      .then(
        ([
          auditor,
          dataHash,
          timespanStart,
          timespanEnd,
          opinion,
          comment,
          timestamp,
        ]) => ({
          auditor: { address: auditor, name: 'unknown' },
          dataHash: dataHash.reduce(
            (carry, current) => carry + current.toString(16),
            '0x',
          ),
          timespanStart: timespanStart.toNumber(),
          timespanEnd: timespanEnd.toNumber(),
          opinion: opinionMap[opinion],
          comment: web3.utils.hexToAscii(comment),
          timestamp: timestamp.toNumber(),
        }),
      ),
  );

  const audits = await Promise.all(auditPromises);

  return audits;
};

export default getAuditsFromFund;
