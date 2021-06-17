const { gql } = require('apollo-server');

const mutation = gql`
  type Mutation {
    createUser(name: String!): User!
    createPost(post: createPostInput!): Post
    deletePost(id: Int!): Post
    updatePost(id: Int!, content: String, image: String): Post
    createPostVote(userId: Int!, postId: Int!, vote: VoteType!): PostVote!
    deletePostVote(id: Int!): PostVote!
    updatePostVote(id: Int!, vote: VoteType!): PostVote!
  }
`;

module.exports = mutation;
