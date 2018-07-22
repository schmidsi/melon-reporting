import * as R from 'ramda';
import React from 'react';
import {
  branch,
  compose,
  lifecycle,
  withStateHandlers,
  renderComponent,
} from 'recompose';

import getRanking from '../api/ranking';

const Spinner = () => <div>Loading...</div>;

const Browse = ({ ranking = [] }) => (
  <div>
    <h1>Browse</h1>
    {ranking.map(fund => (
      <div key={fund.address}>
        {/* <Link route="defaultTimespan" params={{ fundAddress: fund.address }}> */}
        <a>
          {fund.name} - {fund.address}
        </a>
        {/* </Link> */}
      </div>
    ))}
    {R.isEmpty(ranking) && <p>No funds on this version or price feed down</p>}
  </div>
);

Browse.getInitialProps = async () => {
  const ranking = await getRanking();
  return { ranking };
};

const enhance = compose(
  withStateHandlers(
    {
      loading: true,
      ranking: [],
    },
    {
      setRanking: () => ranking => ({ ranking, loading: false }),
    },
  ),
  lifecycle({
    async componentDidMount() {
      const ranking = await getRanking();
      this.props.setRanking(ranking);
      console.log(ranking, this.props);
    },
  }),
  branch(({ loading }) => loading, renderComponent(Spinner)),
);

export default enhance(Browse);
