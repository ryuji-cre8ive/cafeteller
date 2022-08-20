import { ApolloServer, gql } from 'apollo-server-micro';
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


const typeDefs = gql`
  type User {
    id: ID!
    email: String
    name: String
    cafe: [String]
  }
  type Cafe {
    id: Int
    name: String
    master: String
    masterId: Int
    menus: [Menu]!
    lat: Float
    lon: Float
    isWifi: Boolean
    isConcent: Boolean
  }
  type Menu {
    id: Int
    name: String
    prise: Int
    image: String
    cafe: String
    cafeId: Int
    isIce: Boolean
    isHot: Boolean
  }
  type Query {
    hello: String,
    users: [User],
    cafes: [Cafe],
    menus: [Menu],
  }
`;

interface Context {
  prisma: PrismaClient
}

const resolvers = {
  Query: {
    hello: () => 'Hello World',
    users: async (parent: undefined, args: {}, context: Context) => {
      return await context.prisma.user.findMany();
    },
    cafes: async (parent: undefined, args: {}, context: Context) => {
      return await context.prisma.cafe.findMany();
    },
    menus: async (parent: undefined, args: {}, context: Context) => {
      return await context.prisma.menu.findMany();
    }
  }
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    prisma
  },
})

const startServer = apolloServer.start()

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://studio.apollographql.com'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql'
  })(req, res)
};

export const config = {
  api: {
    bodyParser: false
  }
}