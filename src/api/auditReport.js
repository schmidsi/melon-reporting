import Web3 from 'web3';
import auditingabi from '../contracts/abi/AuditingContract';
import hashReport from './hashReport';
const auditingContractAddress = "0x263072c3df847F40c979b94ab885e61d34cf2838";

const auditReport = async (data) => {
  const web3 = new Web3(Web3.givenProvider);
  const auditingContract = new web3.eth.Contract(auditingabi, auditingContractAddress);

  const accounts = await web3.eth.getAccounts();
  const auditorAccount = accounts[0];

  const dataHash = hashReport(data);
  const timespanStart = data.meta.timeSpanStart;
  const timespanEnd = data.meta.timeSpanEnd;
  const opinion = 0;

  console.log(data);
  console.log(dataHash);

  auditingContract.methods.add(data.meta.fundAddress, dataHash, timespanStart, timespanEnd, opinion)
    .send({
      from: auditorAccount
    })
}

export default auditReport;