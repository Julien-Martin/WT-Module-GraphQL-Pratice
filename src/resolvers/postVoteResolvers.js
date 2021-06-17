const postVoteResolvers = {
  Query: {
    postVotes: (_, __, context) => context.prisma.postVote.findMany(),
    postVote: (_, args, context) => context.prisma.postVote.findUnique({
      where: {
        id: args.id,
      },
    }),
  },
  Mutation: {
    createPostVote: (_, args, context) => context.prisma.postVote.create({
      data: {
        ...args,
      },
    }),
    deletePostVote: (_, args, context) => context.prisma.postVote.delete({
      where: {
        id: args.id,
      },
    }),
    updatePostVote: (_, args, context) => context.prisma.postVote.update({
      where: {
        id: args.id,
      },
      data: {
        vote: args.vote,
      },
    }),
  },
};

module.exports = postVoteResolvers;
