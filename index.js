const { ApolloServer, gql } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const typeDefs = gql`

  enum VoteType {
    UP
    DOWN
  }

  interface Node {
    id: Int
  }

  input createPostInput {
    image: String
    content: String!
    userId: Int!
  }

  type User implements Node {
    id: Int
    name: String! @deprecated(reason: "Bad reason")
    posts: [Post]!
  }

  type Post implements Node {
    id: Int
    image: String
    content: String!
    user: User!
  }

  type PostVote implements Node {
    id: Int
    user: User!
    post: Post!
    vote: VoteType!
  }

  type Query {
    user(id: Int!): User
    users: [User]!
    posts: [Post]!
    votePosts: [PostVote]!
  }

  type Mutation {
    createUser(name: String!): User!
    createPost(post: createPostInput!): Post
    deletePost(id: Int!): Post
    updatePost(id: Int!, content: String, image: String): Post
  }
`;

const resolvers = {
  Query: {
    user: (_, args) => prisma.user.findUnique({
      where: {
        id: args.id,
      },
    }),
    users: () => prisma.user.findMany(),
    posts: () => prisma.post.findMany(),
    votePosts: () => prisma.postVote.findMany(),
  },
  Mutation: {
    createUser: (_, args) => prisma.user.create({
      data: {
        name: args.name,
      },
    }),
    createPost: (_, args) => prisma.post.create({
      data: args.post,
    }),
    deletePost: (_, args) => prisma.post.delete({
      where: {
        id: args.id,
      },
    }),
    updatePost: (_, args) => prisma.post.update({
      where: {
        id: args.id,
      },
      data: {
        content: args.content,
        image: args.images,
      },
    }),
  },
  User: {
    posts: (parent) => prisma.post.findMany({
      where: {
        userId: parent.id,
      },
    }),
  },
  Post: {
    user: (parent) => prisma.user.findUnique({
      where: {
        id: parent.userId,
      },
    }),
  },
  PostVote: {
    user: (parent) => prisma.user.findUnique({
      where: {
        id: parent.userId,
      },
    }),
    post: (parent) => prisma.post.findUnique({
      where: {
        id: parent.postId,
      },
    }),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: prisma,
});

server.listen().then(({ url }) => {
  console.log(`Server ready ${url}`);
});
