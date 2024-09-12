require('dotenv').config();
const mongoose = require('mongoose');

const {ApolloServer} = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

async function graphqlApi()
{
    const {typeDefs} = require('./typeDefs');
    const {resolvers} = require('./resolvers');
    const server = new ApolloServer({
        typeDefs,resolvers
    });

    const PORT = process.env.PORT || 3000;
    mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster01.8ffgk.mongodb.net/IMSdb?retryWrites=true&w=majority`)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.error("MongoDB connection error:", error));

    const { url } = await startStandaloneServer(server,{
        listen: { port: PORT}
    })
    
    console.log(`server ready at http://localhost:${PORT}/`)

}

module.exports = {graphqlApi};