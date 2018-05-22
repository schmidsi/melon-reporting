import { makeContext, makeSchema } from '@melonproject/graphql-schema';
import * as fs from 'fs';
import { PubSub } from 'graphql-subscriptions';
import { GraphQLServer } from 'graphql-yoga';

async function start(port: number) {
  const pubsub = new PubSub();
  const server = new GraphQLServer({
    schema: makeSchema(),
    context: () => makeContext(pubsub),
  });

  await server.start({
    port
  });

  // tslint:disable-next-line:no-console
  console.log(`Server is running on http://localhost:${port}`);
}

start(parseInt(process.env.PORT as string, 10));
