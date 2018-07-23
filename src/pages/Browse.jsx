import * as R from 'ramda';
import React from 'react';

import getRanking from '~/api/ranking';
import withLoading from './utils/withLoading';

import getDebug from '~/utils/getDebug';

const debug = getDebug(__filename);

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
