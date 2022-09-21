import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import express from "express";
import http from "http";

// schema 
import { schema } from './Schema/schema';

const PORT = process.env.PORT || 4000; 

async function startApolloServer() {
	const app = express();
	const httpServer = http.createServer(app);
	const server = new ApolloServer({
		schema: schema,
		csrfPrevention: true,
		cache: "bounded",
		plugins: [
			ApolloServerPluginDrainHttpServer({ httpServer }),
			ApolloServerPluginLandingPageLocalDefault({ embed: true }),
		],
	});

	await server.start();
	server.applyMiddleware({ app });
	await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer();
