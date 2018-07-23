import * as R from 'ramda';
import React from 'react';

import withLoading from './utils/withLoading';
import getRanking from '../api/ranking';

const debug = require('debug')('melon-reporting:pages:Browse');

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

const enhance = withLoading(async props => {
  debug('Loading ranking ...');
  const ranking = await getRanking();
  debug('Ranking loaded', ranking);

  return { ranking };
});

export default enhance(Browse);
