import auditReport from '../api/auditReport';

class Audit extends React.Component {

    constructor(props) {
        super(props);

        this.data = props.data;

        this.state = {
            opinion: "0",
            comment: ""
        }
    }

    render() {
        return <div>
            <select value={this.state.opinion} onChange={(event) => this.setState({ opinion: event.target.value })}>
                <option value="0">Unqualified Opinion</option>
                <option value="1">Qualified Opinion</option>
                <option value="2">Adverse Opinion</option>
                <option value="3">Disclaimer Of Opinion</option>
            </select>

            <input
                type="text"
                name="comment"
                value={this.state.comment}
                onChange={(e) => this.setState({ comment: e.target.value })}
            />

            <button 
                title="Comment must be 32 letters or shorter"
                disabled={ this.state.comment.length > 32 }
                onClick={() => auditReport(this.data, this.state.opinion, this.state.comment)}>
                Audit
            </button>
        </div>
    }
}

export default Audit;