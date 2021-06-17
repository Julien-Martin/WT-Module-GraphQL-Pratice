const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const typeDefs = require('./src/typeDefs');
const resolvers = require('./src/resolvers');

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    prisma,
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready ${url}`);
});
