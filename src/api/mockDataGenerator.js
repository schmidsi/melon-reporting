import exampleData from '../data/example-report-data.json';

const mockStaticData = async () => {
  const staticData = { data: exampleData };
  return staticData;
};

const mockAllData = async () => {};

const mockMissingData = async data => {
  // TODO
  return data;
};

export { mockStaticData, mockAllData, mockMissingData };
