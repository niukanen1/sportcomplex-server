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
	server.applyMiddleware({ app, path: "/" });
	httpServer.listen(PORT, () => { 
        console.log("Server started")
    });
}

startApolloServer();
