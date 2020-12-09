const {gql} = require('apollo-server-express');

//type Note:
//-é como é composto o schema de Note
//Querys é as maneiras definidas de aceder aos dados
//Mutate é mutar/modificar os dados
//scalar DateTime é um tipo custom que nao está dentro dos standart types tipo:
//String, Boolean, ID, Int, Float.
module.exports = gql`
    scalar DateTime

    type NoteFeed {
        notes:[Note]!
        cursor: String!
        hasNextPage: Boolean!
    }
    type Note {
        id: ID!
        content: String!
        author: User!
        createdAt: DateTime!
        updatedAt: DateTime!
        favoriteCount: Int!
        favoritedBy: [User]
    }

    type User {
        id: ID!
        username: String!
        email: String!
        avatar: String
        notes: [Note!]!
        favorites: [Note!]!
    }

    type Query {
        notes: [Note!]!
        note(id: ID): Note!
        user(username: String!): User
        users: [User!]!
        me: User!
        #add noteFeed para as nossas queries existentes
        noteFeed(cursor: String): NoteFeed
    }

    type Mutation {
        newNote(content: String!): Note
        updateNote(id:ID!,content: String!): Note!
        deleteNote(id:ID!): Boolean!
        signUp(username: String!, email: String!, password: String!): String!
        signIn(username: String, email: String, password: String!): String!
        toggleFavorite(id: ID!): Note!
    }
`;


