import { GraphQLSchema } from 'graphql';
import { PubSub } from 'graphql-subscriptions';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
import * as schema from './schema.gql';

export interface Context {
  pubsub: PubSub;
}

export const makeContext = (pubsub: PubSub): Context => ({
  pubsub,
});

export const makeSchema = (): GraphQLSchema =>
  makeExecutableSchema({
    typeDefs: schema,
    resolvers,
  });
