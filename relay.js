const express = require("express")
const Gun = require(`gun`)
const { ApolloServer } = require("apollo-server-express")
const http = require("http")
const app = express()
const typeDefs = require("./schema")
const port = 4000

const resolvers = {
  
    // debating on need for graphql api middleware 
  }
  
let apolloServer = null;
async function startServer() {
    apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
}
startServer();
const httpserver = http.createServer(app);

app.use(Gun.serve);
app.get("/rest", function (req, res) {
    res.json({ data: "api working" });
});

const relay = app.listen(port, function () {
    console.log(`gundb relay node running on` + "http://localhost://" + port);
    console.log(`gql path is ${apolloServer.graphqlPath}`);
});

Gun({web: relay})