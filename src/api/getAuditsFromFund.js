import * as R from 'ramda';
import abi from '../contracts/abi/AuditingContract';
const auditingContractAddress = '0x263072c3df847F40c979b94ab885e61d34cf2838';

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
      .then(([auditor, dataHash, timespanStart, timespanEnd, opinion]) => ({
        auditor,
        dataHash: dataHash.reduce(
          (carry, current) => carry + current.toString(16),
          '0x',
        ),
        timespanStart: timespanStart.toNumber(),
        timespanEnd: timespanEnd.toNumber(),
        opinion: opinionMap[opinion],
      })),
  );

  const audits = await Promise.all(auditPromises);

  return audits;
};

export default getAuditsFromFund;
