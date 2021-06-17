const { gql } = require('apollo-server');

const postType = gql`
  type Post {
    id: Int
    image: String
    content: String!
    user: User!
    votes: [PostVote]
  }
`;

module.exports = postType;
