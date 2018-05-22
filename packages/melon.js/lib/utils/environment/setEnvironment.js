import { environment } from './getEnvironment';
import isValidEnvironment from './isValidEnvironment';
import ensure from '../generic/ensure';

const setEnvironment = newEnvironment => {
  const environmentCandidate = { ...environment, ...newEnvironment };
  ensure(isValidEnvironment(environmentCandidate), 'Invalid environment');

  Object.assign(environment, environmentCandidate);
};

export default setEnvironment;
