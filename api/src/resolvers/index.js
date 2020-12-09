const Query = require('./query.js');
const Mutation = require('./mutation.js');
const Note = require('./note.js');
const User = require('./user.js')
//para o scalar DateTime funcionar(validar);
const { GraphQLDateTime } = require('graphql-iso-date');

module.exports = {
    Query,
    Mutation,
    Note,
    User,
    DateTime: GraphQLDateTime
}