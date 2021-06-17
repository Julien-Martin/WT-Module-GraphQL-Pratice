const { PubSub, withFilter } = require('apollo-server');

const pubsub = new PubSub();

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
    createPostVote: async (_, args, context) => {
      const postVote = await context.prisma.postVote.create({
        data: {
          ...args,
        },
      });
      pubsub.publish('POST_VOTE_CREATED', { postVoteCreated: postVote });
      return postVote;
    },
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
  Subscription: {
    postVotesCreated: {
      subscribe: () => pubsub.asyncIterator('POST_VOTE_CREATED'),
    },
  },
};

module.exports = postVoteResolvers;
