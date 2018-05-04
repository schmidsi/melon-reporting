import React, {
    Component
} from 'react';
// validator
import {
    validateReport
} from './FundReportValidator.js'
import {
    hashReport
} from './FundReportHasher.js'
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import CodeMirror from "react-codemirror";

import data from "./FundReportExampleData.json";

class Editor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            code: JSON.stringify(data, null, 4)
        }

        this.handleHashChange = props.handleHashChange;
        this.handleValidChange = props.handleValidChange;

    }

    componentDidMount() {
        // initialize/show values
        this.updateCode(JSON.stringify(data, null, 4));
    }

    updateCode = (newCode) => {
        try {
            var jsonObject = JSON.parse(newCode);
            var flatNewCode = JSON.stringify(jsonObject);

            this.setState({
                code: newCode,
            });

            var res = validateReport(jsonObject);
            this.handleValidChange(res);
            if (res.valid === true) {
                var hash = hashReport(flatNewCode);
                this.handleHashChange(hash);
            }
            else {
                this.handleHashChange("error");
            }
        }
        catch (err) {
            this.handleValidChange({ valid: false, errors: err.toString() });
            this.handleHashChange("error");
        }
    }

    render = () => {
        var options = {
            lineNumbers: true,
            mode: 'javascript'
        };
        return <CodeMirror value={
            this.state.code
        }
            onChange={
                this.updateCode
            }
            options={
                options
            }
        />
    }
};

export default Editor;
