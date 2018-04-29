import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import Editor from './Editor';

let abi = require('./auditing.json');
let web3;
let auditingcontract;

// parity addresses
const testFund = "0x009dd341EaFAeD46DF6B81EE0615bAED441D10de";
const auditorAccount = "0x00e16caA9073Ef442404BCAcA083914D31CD1984";
const testAccount = "0x00e7d938D62E09439bcB0311A54430C1322B3e5d";
const auditingsigning = "0xbAdCBDd2B01E4E77d539f35D6CC27e0557986A66";
const auditcontract = "0xc7F6680F230589fd043D6c39043235Fa6e3B368c";
const activecontract = auditcontract;

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
      adddatahash: "0x0",
      addauditor: "0x0",
      verifydatahash: "0x0",
      verifyauditor: "0x0",
      index: 0,
      hash: "0x0",
      errors: "No errors",
      valid: true,
    };

  }


  handleAddAuditorChange = (event) => { this.setState({ addauditor: event.target.value }); }
  handleAddDatahashChange = (event) => { this.setState({ adddatahash: event.target.value }); }
  handleVerifyDatahashChange = (event) => { this.setState({ verifydatahash: event.target.value }); }
  handleVerifyAuditorChange = (event) => { this.setState({ verifyauditor: event.target.value }); }
  handleIndexChange = (event) => { this.setState({ index: event.target.value }); }

  handleValidChange = (res) => { this.setState({ valid: res.valid, errors: res.errors }); }
  handleHashChange = (hash) => { this.setState({ hash: hash }); }

  add = (event) => {
    event.preventDefault();

    var auditor = this.state.addauditor; // maybe padding...
    // data hex has to have 64 characters
    var dataHash = web3.utils.padRight(this.state.adddatahash, 64);

    auditingcontract.methods.add(testFund, dataHash)
      .send({ from: auditor })
  }

  verify = (event) => {
    event.preventDefault();

    var auditor = this.state.verifyauditor;
    var dataHash = web3.utils.padRight(this.state.verifydatahash, 64);

    auditingcontract.methods.verify(testFund, auditor, dataHash)
    .call()
    .then(function (result) {
      document.getElementById('verified').innerText = "verified: " + result;
    });
  }

  getLastIndex = () => {
    auditingcontract.methods.getLastIndex(testFund)
      .call()
      .then(function (result) {
        document.getElementById('lastIndex').innerText = result;
      });
  }

  getByIndex = () => {
    auditingcontract.methods.getByIndex(testFund, this.state.index)
      .call()
      .then(function (result) {
        document.getElementById('getByIndexAuditor').innerText = "Auditor: " + result.auditor;
        document.getElementById('getByIndexDataHash').innerText = "Datahash: " + result.dataHash;
        document.getElementById('getByIndexTimestamp').innerText = "Timestamp: " + new Date(result.timestamp * 1000);
      }).catch(function (error) {
        document.getElementById('getByIndexAuditor').innerText = "not found";
        document.getElementById('getByIndexDataHash').innerText = "not found";
        document.getElementById('getByIndexTimestamp').innerText = "not found";
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
          <h1 className="App-title">Melon Auditing</h1>
        </header>

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
          <button type="button" onClick={this.add}>
            add
          </button>
        </form>
        <br />

        <form>
          <label>
            Auditor: 
            <input type="text" value={this.state.verifyauditor} onChange={this.handleVerifyAuditorChange} />
          </label>
          <br />
          <label>
            Datahash: 
            <input type="text" value={this.state.verifydatahash} onChange={this.handleVerifyDatahashChange} />
          </label>
          <br />
          <button type="button" onClick={this.verify}>
            verify
          </button>
        </form>
        <div id='verified'>
        </div>
        <br />

        <button className="btn btn-default" onClick={this.getLastIndex}>
          getLastIndex
        </button>
        <div id='lastIndex'>
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
        <div id='getByIndexTimestamp' />
        <br />

        <button className="btn btn-default" onClick={this.listAllEvents}>
          listAllEvents
        </button>
        <div id='allEvents'>
        </div>

        <br />

        <Editor 
          handleValidChange={this.handleValidChange} 
          handleHashChange={this.handleHashChange}/>
        <br />
        <div id='valid'>
          {this.state.valid ? "valid" : "not valid"}
          <br/>
          {this.state.errors}
        </div>
        <div id='hash'>
          Hash: {this.state.hash}
        </div>
      </div>
    );
  }
}

export default App;
