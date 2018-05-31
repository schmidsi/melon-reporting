const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const Web3 = require('web3');
const ERC20ABI = require('./abi/ERC20Interface.json');

const getEvent = (ABI, event) =>
  ABI.find(e => e.type === 'event' && e.name === event);

const resolvers = {
  // Query: {},
  // Mutation: {},
};

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    prisma: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'http://localhost:4466',
    }),
  }),
});

server.start(async () => {
  console.log(`GraphQL server is running on http://localhost:4000`);

  const web3 = new Web3('wss://mainnet.infura.io/ws');

  const transferEvent = getEvent(ERC20ABI, 'Transfer');
  const transferSignature = web3.eth.abi.encodeEventSignature(transferEvent);

  console.log(transferEvent, transferSignature);

  const subscription = web3.eth.subscribe(
    'logs',
    {
      address: '0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0',
      topics: [transferSignature],
    },
    (a, b, c) => {
      // console.log('======== callback', a, b, c);
    },
  );

  subscription.on('data', (log, b) => {
    const decoded = web3.eth.abi.decodeLog(
      transferEvent.inputs,
      log.data,
      log.topics.slice(1),
    );

    console.log('======== data', log, decoded);
  });
  subscription.on('changed', (log, b) => {
    console.log('======== changed', log, b);
  });
  subscription.on('error', (log, b) => {
    console.log('======== error', log, b);
  });
});
