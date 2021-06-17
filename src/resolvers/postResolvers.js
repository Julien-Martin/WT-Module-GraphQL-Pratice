const postResolvers = {
  Query: {
    posts: (_, __, context) => context.prisma.post.findMany(),
  },
  Mutation: {
    createPost: (_, args, context) => context.prisma.post.create({
      data: args.post,
    }),
    deletePost: (_, args, context) => context.prisma.post.delete({
      where: {
        id: args.id,
      },
    }),
    updatePost: (_, args, context) => context.prisma.post.update({
      where: {
        id: args.id,
      },
      data: {
        content: args.content,
        image: args.images,
      },
    }),
  },
  Post: {
    user: (parent, __, context) => context.prisma.user.findUnique({
      where: {
        id: parent.userId,
      },
    }),
    votes: (parent, __, context) => context.prisma.postVote.findMany({
      where: {
        postId: parent.id,
      },
    }),
  },
};

module.exports = postResolvers;
