import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import Editor from './report/Editor';

let abi = require('./audit/auditing.json');
let web3;
let auditingcontract;

// parity addresses
const testFund = "0x009dd341EaFAeD46DF6B81EE0615bAED441D10de";
const auditorAccount = "0x00e16caA9073Ef442404BCAcA083914D31CD1984";
const splitauditingcontract = "0x2bE47366cD59c5F744ECE9Ae166D915c31C617be";
const activecontract = splitauditingcontract;

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
      adddatahash: "0a",
      addauditor: "0x0",
      timespanStart: "0",
      timespanEnd: "0",
      existsdatahash: "0a",
      existsauditor: "0x0",
      index: 0,
      hash: "0a",
      errors: "",
      valid: false,
    };

  }


  handleAddAuditorChange = (event) => { this.setState({ addauditor: event.target.value }); }
  handleAddDatahashChange = (event) => { this.setState({ adddatahash: event.target.value }); }
  handleExistsDatahashChange = (event) => { this.setState({ existsdatahash: event.target.value }); }
  handleExistsAuditorChange = (event) => { this.setState({ existsauditor: event.target.value }); }
  handleIndexChange = (event) => { this.setState({ index: event.target.value }); }
  handleTimespanStartChange = (event) => { this.setState({ timespanStart: event.target.value }); }
  handleTimespanEndChange = (event) => { this.setState({ timespanEnd: event.target.value }); }

  handleValidChange = (res) => { this.setState({ valid: res.valid, errors: res.errors }); }
  handleHashChange = (hash) => { this.setState({ hash: hash }); }

  add = (event) => {
    event.preventDefault();

    var auditor = this.state.addauditor; // maybe padding...
    // data hex has to have 64 characters
    var dataHash = this.state.adddatahash;
    var dataHash1 = web3.utils.fromAscii(dataHash.substring(0, 32));
    var dataHash2 = web3.utils.fromAscii(dataHash.substring(32, 64));

    var timespanStart = this.state.timespanStart;
    var timespanEnd = this.state.timespanEnd;

    auditingcontract.methods.add(testFund, dataHash1, dataHash2, timespanStart, timespanEnd)
      .send({ from: auditor })
  }

  exists = (event) => {
    event.preventDefault();

    var auditor = this.state.existsauditor;

    var dataHash = this.state.existsdatahash;
    var dataHash1 = web3.utils.fromAscii(dataHash.substring(0, 32));
    var dataHash2 = web3.utils.fromAscii(dataHash.substring(32, 64));

    auditingcontract.methods.exists(testFund, auditor, dataHash1, dataHash2)
      .call()
      .then(function (result) {
        document.getElementById('exists').innerText = "exists: " + result;
      });
  }

  getLength = () => {
    auditingcontract.methods.getLength(testFund)
      .call()
      .then(function (result) {
        document.getElementById('length').innerText = result;
      });
  }

  getByIndex = () => {
    auditingcontract.methods.getByIndex(testFund, this.state.index)
      .call()
      .then(function (result) {
        var dataHash1 = web3.utils.toAscii(result.dataHash1);
        var dataHash2 = web3.utils.toAscii(result.dataHash2);
        var dataHash = dataHash1 + dataHash2;
        document.getElementById('getByIndexAuditor').innerText = "Auditor: " + result.auditor;
        document.getElementById('getByIndexDataHash').innerText = "Datahash: " + dataHash;
        document.getElementById('getByIndexTimespanStart').innerText = "TimespanStart: " + new Date(result.timespanStart * 1000);
        document.getElementById('getByIndexTimespanEnd').innerText = "TimespanEnd: " + new Date(result.timespanEnd * 1000);
      }).catch(function (error) {
        document.getElementById('getByIndexAuditor').innerText = "not found";
        document.getElementById('getByIndexDataHash').innerText = "not found";
        document.getElementById('getByIndexTimespanStart').innerText = "not found";
        document.getElementById('getByIndexTimespanEnd').innerText = "not found";
      });
  }

  listAllEvents = () => {
    auditingcontract.getPastEvents("Added", {
      // list events from all blocks since the beginning
      fromBlock: 0,
      toBlock: 'latest'
    })
      .then(function (events) {
        var text = "";
        events.forEach(function (e) {
          text += "index: " + e.returnValues._index + "; fundaddress: " + e.returnValues._fundAddress;
          text += "\n";
        });
        document.getElementById('allEvents').innerText = text;
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Melon Fund Reporting</h1>
        </header>

        <h2>Report</h2>

        <Editor
          handleValidChange={this.handleValidChange}
          handleHashChange={this.handleHashChange} />
        <br />
        <div id='valid'>
          {this.state.valid ? "valid" : "not valid"}
          <br />
          {this.state.errors}
        </div>
        <div id='hash'>
          Hash: {this.state.hash}
        </div>

        <br />

        <h2>Audit</h2>

        <p>
          TestFund: <i>{testFund}</i>
          <br />
          TestAuditor: <i>{auditorAccount}</i>
        </p>

        <form>
          <label>
            Auditor:
            <input type="text" value={this.state.addauditor} onChange={this.handleAddAuditorChange} />
          </label>
          <br />
          <label>
            Datahash:
            <input type="text" value={this.state.adddatahash} onChange={this.handleAddDatahashChange} />
          </label>
          <br />
          <label>
            TimespanStart:
            <input type="text" value={this.state.timespanStart} onChange={this.handleTimespanStartChange} />
          </label>
          <br />
          <label>
            TimespanEnd:
            <input type="text" value={this.state.timespanEnd} onChange={this.handleTimespanEndChange} />
          </label>
          <br />
          <button type="button" onClick={this.add}>
            add
          </button>
        </form>
        <br />

        <form>
          <label>
            Auditor:
            <input type="text" value={this.state.existsauditor} onChange={this.handleExistsAuditorChange} />
          </label>
          <br />
          <label>
            Datahash:
            <input type="text" value={this.state.existsdatahash} onChange={this.handleExistsDatahashChange} />
          </label>
          <br />
          <button type="button" onClick={this.exists}>
            exists
          </button>
        </form>
        <div id='exists'>
        </div>
        <br />

        <button className="btn btn-default" onClick={this.getLength}>
          getLength
        </button>
        <div id='length'>
        </div>
        <br />

        <form>
          <label>
            Index:
            <input type="text" value={this.state.index} onChange={this.handleIndexChange} />
          </label>
        </form>
        <button className="btn btn-default" onClick={this.getByIndex}>
          getByIndex
        </button>
        <div id='getByIndexAuditor' />
        <div id='getByIndexDataHash' />
        <div id='getByIndexTimespanStart' />
        <div id='getByIndexTimespanEnd' />
        <br />

        <button className="btn btn-default" onClick={this.listAllEvents}>
          listAllEvents
        </button>
        <div id='allEvents'>
        </div>

        <br />

      </div>
    );
  }
}

export default App;
