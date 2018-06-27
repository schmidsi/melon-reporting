import Link from 'next/link';
import * as R from 'ramda';

import getRanking from '@melonproject/data-extractor/ranking';

const Index = ({ ranking }) => (
  <div>
    <h1>Browse</h1>
    {ranking.map(rank => <div>{rank}</div>)}
    {R.isEmpty(ranking) && <p>No funds on this version or price feed down</p>}
  </div>
);

Index.getInitialProps = async () => {
  const ranking = await getRanking();
  return { ranking };
};

export default Index;
