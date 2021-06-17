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
      pubsub.publish('POST_VOTE_CREATED', { postVotesCreated: postVote });
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
  PostVote: {
    user: (parent, __, context) => context.prisma.user.findUnique({
      where: {
        id: parent.userId,
      },
    }),
    post: (parent, __, context) => context.prisma.post.findUnique({
      where: {
        id: parent.postId,
      },
    }),
  },
};

module.exports = postVoteResolvers;
