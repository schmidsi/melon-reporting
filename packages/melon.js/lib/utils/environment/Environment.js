// @flow
import typeof Api from '@parity/api';
import typeof providers from '../constants/providers';

export type Environment = {
  api: Api,
  providerType: $Values<providers>,
};
