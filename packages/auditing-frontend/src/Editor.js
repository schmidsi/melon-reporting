import React, { Component } from 'react';
var CodeMirror = require('react-codemirror');
require('codemirror/lib/codemirror.css');
require('codemirror/mode/javascript/javascript');

var data = require('./FundReportExampleData.json');

class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
			code: JSON.stringify(data, null, 4)
        }
    }

	updateCode = (newCode) => {
		this.setState({
			code: newCode,
		});
    }

	render = () => {
		var options = {
            lineNumbers: true,
            mode: 'javascript'
		};
		return <CodeMirror value={this.state.code} onChange={this.updateCode} options={options} />
	}
};

export default Editor;