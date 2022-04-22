import { ApolloServer } from 'apollo-server-fastify';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServerPlugin } from 'apollo-server-plugin-base';
import { FastifyInstance } from 'fastify';
import { typeDefs, resolvers } from "./schema/index.schema";

import app from "./app";

const port = process.env.PORT || 7000;

function fastifyAppClosePlugin(app: FastifyInstance): ApolloServerPlugin {
    return {
        async serverWillStart() {
            return {
                async drainServer() {
                    await app.close();
                },
            };
        },
    };
}

const startApolloServer = async() => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [
            fastifyAppClosePlugin(app),
            ApolloServerPluginDrainHttpServer({ httpServer: app.server }),
        ],
    });

    await server.start();
    app.register(server.createHandler());
    await app.listen(port);
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
}

startApolloServer()