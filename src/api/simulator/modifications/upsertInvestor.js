import setPath from '../utils/setPath';

// Upsert is a mixture between insert and update:
// It inserts if it does not exist yet. Otherwise it updates
const upsertInvestor = ({ address, name }) =>
  setPath(
    ['data', 'participations', 'investors'],
    ({ data }) =>
      data.participations.investors.find(
        investor => investor.address === address,
      )
        ? data.participations.investors.map(
            investor =>
              investor.address === address ? { address, name } : investor,
          )
        : [
            ...data.participations.investors,
            {
              name,
              address,
            },
          ],
  );

export default upsertInvestor;
