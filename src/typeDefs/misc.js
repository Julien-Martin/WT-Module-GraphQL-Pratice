const { gql } = require('apollo-server');

const misc = gql`
  enum VoteType {
    UP
    DOWN
  }

  input createPostInput {
    image: String
    content: String!
    userId: Int!
  }
`;

module.exports = misc;
