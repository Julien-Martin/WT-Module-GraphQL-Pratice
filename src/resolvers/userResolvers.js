const userResolvers = {
  Query: {
    user: (_, args, context) => context.prisma.user.findUnique({
      where: {
        id: args.id,
      },
    }),
    users: (_, __, context) => context.prisma.user.findMany(),
  },
  Mutation: {
    createUser: (_, args, context) => context.prisma.user.create({
      data: {
        name: args.name,
      },
    }),
  },
  User: {
    posts: (parent, __, context) => context.prisma.post.findMany({
      where: {
        userId: parent.id,
      },
    }),
    votes: (parent, __, context) => context.prisma.postVote.findMany({
      where: {
        userId: parent.id,
      },
    }),
  },
};

module.exports = userResolvers;
