const { gql } = require('apollo-server');

const query = gql`
  type Query {
    user(id: Int!): User
    users: [User]!
    posts: [Post]!
    postVotes: [PostVote]!
    postVote(id: Int!): PostVote
  }
`;

module.exports = query;
