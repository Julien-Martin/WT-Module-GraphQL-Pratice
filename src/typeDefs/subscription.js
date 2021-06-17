const { gql } = require('apollo-server');

const subscription = gql`
  type Subscription {
    postVotesCreated: PostVote,
    myPostVote(myId: Int!): PostVote
  }
`;

module.exports = subscription;
