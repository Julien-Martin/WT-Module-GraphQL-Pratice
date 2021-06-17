const { gql } = require('apollo-server');

const postType = gql`
  type Post {
    id: Int
    image: String
    content: String!
    user: User!
  }
`;

module.exports = postType;
