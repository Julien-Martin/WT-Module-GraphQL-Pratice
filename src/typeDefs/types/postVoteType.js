const { gql } = require('apollo-server');

const postVoteType = gql`
  type PostVote {
    id: Int
    user: User!
    post: Post!
    vote: VoteType!
  }
`;

module.exports = postVoteType;
