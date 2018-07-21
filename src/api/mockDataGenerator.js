import exampleData from '../data/example-report-data.json';

const createRandomMetaData = () => {
  const meta = {};
  return meta;
};

const mockStaticData = async () => {
  const staticData = { data: exampleData };
  return staticData;
};

const mockAllData = async () => {
  const data = { data: {} };
};

const mockMissingData = async data => {
  // TODO
  return data;
};

export { mockStaticData, mockAllData, mockMissingData };
