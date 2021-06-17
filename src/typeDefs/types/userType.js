const { gql } = require('apollo-server');

const userType = gql`
  type User {
    id: Int
    name: String! @deprecated(reason: "Bad reason")
    posts: [Post]!
  }
`;

module.exports = userType;
