import { makeExecutableSchema } from '@graphql-tools/schema'
import { resolvers } from "./Resolvers/resovers";
import { typeDefs } from "./Types/typeDefs";

export const schema = makeExecutableSchema({ 
    typeDefs: typeDefs, 
    resolvers: [resolvers]
})