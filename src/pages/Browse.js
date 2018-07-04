import * as R from 'ramda';
import { Link } from '../routes';

import getRanking from '../api/ranking';

const Browse = ({ ranking }) => (
  <div>
    <h1>Browse</h1>
    {ranking.map(fund => (
      <div key={fund.address}>
        <Link route="defaultTimespan" params={{ fundAddress: fund.address }}>
          <a>
            {fund.name} - {fund.address}
          </a>
        </Link>
      </div>
    ))}
    {R.isEmpty(ranking) && <p>No funds on this version or price feed down</p>}
  </div>
);

Browse.getInitialProps = async () => {
  const ranking = await getRanking();
  return { ranking };
};

export default Browse;
