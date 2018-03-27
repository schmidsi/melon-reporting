import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';

let abi = require('./auditing.json');

let web3;
let auditingcontract;

const testFund = "0x009dd341EaFAeD46DF6B81EE0615bAED441D10de";
const auditorAccount = "0x00e16caA9073Ef442404BCAcA083914D31CD1984";
const auditingstandard = "0xF633EF9af1716Edb016c27f0099A3d931c2da843";

class App extends Component {

  constructor(props) {
    super(props);
    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
    } else {
      web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
    }

    // override the injected web3 from parity so we can use web3 1.0.0 functions like utils...
    // NOTE: do not do this in production!
    window.web3 = web3;

    auditingcontract = new web3.eth.Contract(abi, auditingstandard);

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

  handleSignatureChange = (event) => {
    this.setState({ signature: event.target.value });
  }

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
        document.getElementById('lastAuditSignature').innerText = "Signature: " + result.signature;
        document.getElementById('lastAuditTimestamp').innerText = "Timestamp: " + new Date(result.timestamp * 1000);
      });
  }

  audit = (event) => {
    //auditingcontract.methods.audit(testFund, this.state.datahash, this.state.signature) 
    // data and signature hex has to have 64 characters
    var dataHash = web3.utils.padRight(this.state.datahash, 64);
    var signature = web3.utils.padRight(this.state.signature, 64);
    auditingcontract.methods.audit(testFund, dataHash, signature)
      .send({ from: auditorAccount })
      .then(function (result) {
        // do something?
      });
    event.preventDefault();
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
        <div id='lastAuditSignature' />
        <div id='lastAuditTimestamp' />

        <br />

        <form>
          <label>
            Datahash:
            <input type="text" value={this.state.datahash} onChange={this.handleDatahashChange} />
          </label>
          <br />
          <label>
            Signature:
            <input type="text" value={this.state.signature} onChange={this.handleSignatureChange} />
          </label>
          <br />
          <button type="button" onClick={this.audit}>
            audit
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
