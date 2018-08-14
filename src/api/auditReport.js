import Web3 from 'web3';
import { Connect, SimpleSigner } from 'uport-connect';
import { decode } from 'mnid';
import auditingabi from '../contracts/abi/Auditing';
import hashReport from './hashReport';

// const auditingContractAddress = '0xe05339048101af344575e651ce343e04cbbc93d8'; // kovan old
const auditingContractAddress = '0x6fb37805dc69ddccf56b89fd22d25aec29650c17'; // kovan
// const auditingContractAddress = '0xfbc97ba63be3217e4b32164707ce31c96f65dd3b'; // rinkeby

const auditReport = async (data, opinion, comment) => {
  const uport = new Connect('Melon Auditing', {
    clientId: '2oov3owJ3fz8iz3V1pkKhGQ8MivyHpvctBz',
    network: 'kovan',
    signer: SimpleSigner(process.env.SIGNER_KEY),
  });

  // Request credentials to login
  const credentials = await uport.requestCredentials({
    requested: ['name', 'phone', 'country'],
    notifications: true, // We want this if we want to recieve credentials
  });

  console.log(credentials);

  // const web3 = new Web3(Web3.givenProvider);
  const web3 = new Web3(uport.getProvider());
  const auditingContract = new web3.eth.Contract(
    auditingabi,
    auditingContractAddress,
  );

  // const accounts = await web3.eth.getAccounts();
  // const auditorAccount = accounts[0];
  console.log(decode(credentials.address));
  const auditorAccount = decode(credentials.address).address;
  console.log(auditorAccount);

  if (!auditorAccount) alert('uPort login failed.');

  const dataHash = hashReport(data);
  const timespanStart = data.meta.timeSpanStart;
  const timespanEnd = data.meta.timeSpanEnd;
  const opinionValue = parseInt(opinion, 10);
  const commentValue = web3.utils.fromAscii(comment);

  auditingContract.methods
    .add(
      data.meta.fundAddress,
      dataHash,
      timespanStart,
      timespanEnd,
      opinionValue,
      commentValue,
    )
    .send({
      from: auditorAccount,
      gas: 8000000,
    });
};

export default auditReport;
