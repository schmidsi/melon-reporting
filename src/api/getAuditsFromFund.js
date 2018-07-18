import * as R from 'ramda';
import abi from '../contracts/abi/Auditing';
const auditingContractAddress = '0xeedaaab170b755b0c43efb809a07ea49b0ce836d';

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
      .then(([auditor, dataHash, timespanStart, timespanEnd, opinion, comment]) => ({
        auditor,
        dataHash: dataHash.reduce(
          (carry, current) => carry + current.toString(16),
          '0x',
        ),
        timespanStart: timespanStart.toNumber(),
        timespanEnd: timespanEnd.toNumber(),
        opinion: opinionMap[opinion],
        comment: R.takeWhile(c => c !== '\0', comment.reduce( 
          (carry, current) => carry + String.fromCharCode(current),
          '',
        )),
      })),
  );

  const audits = await Promise.all(auditPromises);

  return audits;
};

export default getAuditsFromFund;
