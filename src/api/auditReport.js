import Web3 from 'web3';
import auditingabi from '../contracts/abi/Auditing';
import hashReport from './hashReport';

const auditingContractAddress = '0xeedaaab170b755b0c43efb809a07ea49b0ce836d';

const auditReport = async (data, opinion, comment) => {
  const web3 = new Web3(Web3.givenProvider);
  const auditingContract = new web3.eth.Contract(auditingabi, auditingContractAddress);

  const accounts = await web3.eth.getAccounts();
  const auditorAccount = accounts[0];

  const dataHash = hashReport(data);
  const timespanStart = data.meta.timeSpanStart;
  const timespanEnd = data.meta.timeSpanEnd;
  const opinionValue = parseInt(opinion);
  const commentValue = web3.utils.fromAscii(comment);

  auditingContract.methods.add(data.meta.fundAddress, dataHash, timespanStart, timespanEnd, opinionValue, commentValue)
    .send({
      from: auditorAccount
    })
}

export default auditReport;