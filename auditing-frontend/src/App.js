import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';

let abi = require('./auditing.json');

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

    this.state = {
      auditCount: 0,
      datahash: "0x0",
      verifydatahash: "0x0",
      r: "0x0",
      s: "0x0",
      v: 0,
      auditor: "0x0"
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

  handleVerifyDatahashChange = (event) => { this.setState({ verifydatahash: event.target.value }); }
  handleRChange = (event) => { this.setState({ r: event.target.value }); }
  handleSChange = (event) => { this.setState({ s: event.target.value }); }
  handleVChange = (event) => { this.setState({ v: event.target.value }); }
  handleAuditorChange = (event) => { this.setState({ auditor: event.target.value }); }

  getAuditCount = () => {
    auditingcontract.methods.getAuditCount(testFund)
      .call()
      .then(function (result) {
        document.getElementById('auditCount').innerText = result;
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

  verifyAudit = (event) => {
    event.preventDefault();

    var dataHash = this.state.verifydatahash;
    var r = this.state.r;
    var s = this.state.s;
    var v = this.state.v;
    var auditor = this.state.auditor;
    auditingcontract.methods.verifyAudit(testFund, dataHash, r, s, v, auditor)
    .call()
    .then(function (result) {
      document.getElementById('verified').innerText = "verified: " + result;
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
        </form>

        <br />

        <form>
          <label>
            Datahash:
            <input type="text" value={this.state.verifydatahash} onChange={this.handleVerifyDatahashChange} />
          </label>
          <br />
          <label>
            r:
            <input type="text" value={this.state.r} onChange={this.handleRChange} />
          </label>
          <br />
          <label>
            s:
            <input type="text" value={this.state.s} onChange={this.handleSChange} />
          </label>
          <br />
          <label>
            v:
            <input type="text" value={this.state.v} onChange={this.handleVChange} />
          </label>
          <br />
          <label>
            auditor:
            <input type="text" value={this.state.auditor} onChange={this.handleAuditorChange} />
          </label>
          <br />
          <button type="button" onClick={this.verifyAudit}>
            verifyAudit
          </button>
        </form>

        <br />

        <div id='verified'>
        </div>

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
