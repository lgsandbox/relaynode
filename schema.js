const { gql } = require("apollo-server-express");

const typeDefs = `

type Post {
  text: String
}


type Query {
    post: Post
}
`;

module.exports = typeDefs;