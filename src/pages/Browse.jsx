import * as R from 'ramda';
import React from 'react';

import getRanking from '~/api/ranking';
import BrowseTemplate from '~/components/templates/Browse';
import withLoading from './utils/withLoading';

import getDebug from '~/utils/getDebug';

const debug = getDebug(__filename);

const Browse = ({ ranking = [] }) => (
  <div>
    <BrowseTemplate>{ranking}</BrowseTemplate>
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
