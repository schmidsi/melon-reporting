
import auditReport from '../api/auditReport';

class Audit extends React.Component {

    constructor(props) {
        super(props);

        this.data = props.data;

        this.state = {
            opinion: "0"
        }
    }

    render() {
        return <div>
            <select value={this.state.opinion} onChange={(event) => this.setState({ opinion: event.target.value })}>
                <option value="0">Unqualified Opinion</option>
                <option value="1">Qualified Opinion</option>
                <option value="2">Adverse Opinion</option>
                <option value="3">Disclaimer Opinion</option>
            </select>

            <button onClick={() => auditReport(this.data, this.state.opinion)}>
                Audit
            </button>
        </div>
    }
}

export default Audit;