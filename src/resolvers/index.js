const userResolvers = require('./userResolvers');
const postResolvers = require('./postResolvers');
const postVoteResolvers = require('./postVoteResolvers');

const resolvers = [userResolvers, postResolvers, postVoteResolvers];

module.exports = resolvers;
