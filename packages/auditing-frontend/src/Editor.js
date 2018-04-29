import React, { Component } from 'react';
// validator
import { validateReport } from './FundReportValidator.js'
require('codemirror/lib/codemirror.css');
require('codemirror/mode/javascript/javascript');

var CodeMirror = require('react-codemirror');

var data = require('./FundReportExampleData.json');

class Editor extends Component {
    constructor(props) {
        super(props);

        this.state = {
			code: JSON.stringify(data, null, 4)
        }

        this.handleHashChange = props.handleHashChange;
        this.handleValidChange = props.handleValidChange;
    }

	updateCode = (newCode) => {
		this.setState({
			code: newCode,
        });
        

        var res = validateReport(JSON.parse(newCode));

        this.handleValidChange(res);
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