const mutation = require('./mutation');
const subscription = require('./subscription');
const misc = require('./misc');
const query = require('./query');

const { postType, postVoteType, userType } = require('./types');

const typeDefs = [
  postType,
  postVoteType,
  userType,
  query,
  mutation,
  subscription,
  misc,
];

module.exports = typeDefs;
