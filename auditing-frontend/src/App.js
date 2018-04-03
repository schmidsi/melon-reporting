import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';

let abi = require('./auditing.json');
let sigUtil = require('eth-sig-util');

let web3;
let auditingcontract;

const testFund = "0x009dd341EaFAeD46DF6B81EE0615bAED441D10de";
const auditorAccount = "0x00e16caA9073Ef442404BCAcA083914D31CD1984";
const testAccount = "0x00e7d938D62E09439bcB0311A54430C1322B3e5d";
const auditingsigning = "0xbAdCBDd2B01E4E77d539f35D6CC27e0557986A66";
const activecontract = auditingsigning;

class App extends Component {

  constructor(props) {
    super(props);
    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
    } else {
      web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
    }

    auditingcontract = new web3.eth.Contract(abi, activecontract);

    // override the injected web3 from parity so we can use web3 1.0.0 functions like utils...
    // NOTE: do not do this in production!
    window.web3 = web3;
    window.auditingcontract = auditingcontract;
    window.sig = sigUtil;

    this.state = {
      auditCount: 0,
      datahash: "0x0",
      signature: "0x0"
    };

    // print the json interface to console for convenience
    console.log(auditingcontract.options.jsonInterface);
  }

  listAllEvents = () => {
    auditingcontract.getPastEvents("AuditReported", {
      // list events from all blocks since the beginning
      fromBlock: 0,
      toBlock: 'latest'
    })
      .then(function (events) {
        var text = "";
        events.forEach(function (e) {
          text += e.returnValues._index + " " + e.returnValues._fundAddress;
          text += "\n";
        });
        document.getElementById('allEvents').innerText = text;
      });
  }

  handleDatahashChange = (event) => {
    this.setState({ datahash: event.target.value });
  }

  getAuditCount = () => {
    auditingcontract.methods.getAuditCount(testFund)
      .call()
      .then(function (result) {
        document.getElementById('auditCount').innerText = result;
      });
  }

  checkSignature = () => {
    var dataHash = "0xfafa000000000000000000000000000000000000000000000000000000000000";
    var r = "0x78dc8a6cc6906e97837a2e37be98c5c80c1e4037be7615c45935b83e13d17309";
    var s = "0x408031b69f44467ac4bc6297b0a7d00c0c0f5bcffbede62720695c7a95ddfc29";
    var v = 28;
    auditingcontract.methods.checkSignature(dataHash, r, s, v, testAccount)
    .call()
    .then(function (result) {
      console.log(result);
    });
  }

  getLastAudit = () => {
    auditingcontract.methods.getLastAudit(testFund)
      .call()
      .then(function (result) {
        document.getElementById('lastAuditAuditor').innerText = "Auditor: " + result.auditor;
        document.getElementById('lastAuditDatahash').innerText = "Datahash: " + result.dataHash;
        document.getElementById('lastAuditR').innerText = "r: " + result.r;
        document.getElementById('lastAuditS').innerText = "s: " + result.s;
        document.getElementById('lastAuditV').innerText = "v: " + result.v;
        document.getElementById('lastAuditTimestamp').innerText = "Timestamp: " + new Date(result.timestamp * 1000);
      });
  }

  audit = (event) => {
    event.preventDefault();

    // data hex has to have 64 characters
    var dataHash = web3.utils.padRight(this.state.datahash, 64);

    // create a signature hex from the provided dataHash
    var signature = web3.eth.sign(dataHash, testAccount)
    .then((result) => {
      var bytesSignature = web3.utils.hexToBytes(result);

      // slice first 32 bytes from signature and convert them back to hex
      var rbytes = bytesSignature.slice(0, 32);
      var r = web3.utils.bytesToHex(rbytes);

      // slice next 32 bytes from signature and convert them back to hex
      var sbytes = bytesSignature.slice(32, 64);
      var s = web3.utils.bytesToHex(sbytes);

      // the last byte is v
      var v = bytesSignature[64];

      auditingcontract.methods.audit(testFund, dataHash, r, s, v)
      .send({ from: testAccount })
    });

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Melon Auditing</h1>
        </header>

        <button className="btn btn-default" onClick={this.getAuditCount}>
          getAuditCount
        </button>
        <div id='auditCount'>
        </div>

        <br />

        <button className="btn btn-default" onClick={this.getLastAudit}>
          getLastAudit
        </button>
        <div id='lastAuditAuditor' />
        <div id='lastAuditDatahash' />
        <div id='lastAuditR' />
        <div id='lastAuditS' />
        <div id='lastAuditV' />
        <div id='lastAuditTimestamp' />

        <br />

        <form>
          <label>
            Datahash:
            <input type="text" value={this.state.datahash} onChange={this.handleDatahashChange} />
          </label>
          <br />
          <button type="button" onClick={this.audit}>
            audit
          </button>
          <br />
          <br />
          <button type="button" onClick={this.checkSignature}>
            checkSignature
          </button>
        </form>

        <br />

        <button className="btn btn-default" onClick={this.listAllEvents}>
          listAllEvents
        </button>
        <div id='allEvents'>
        </div>

      </div>
    );
  }
}

export default App;
