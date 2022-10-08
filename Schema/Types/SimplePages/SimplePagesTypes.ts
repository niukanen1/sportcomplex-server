import { gql } from "apollo-server";

export const SimplePagesTypes = gql `
    type SimplePage {
        _id: ID!
        pageName: String
        title: TextContent
        text: TextContent
        image: String 
        type: Int!
    }

    input SimplePageInput { 
        pageName: String
        title: TextContentInput
        text: TextContentInput
        image: String
    }

    type Query { 
        GetSimplePages(type: Int): [SimplePage!]
    }
    
    type Mutation  {
        EditSimplePage(_id: ID!, updatedSimplePage: SimplePageInput): String
        AddSimplePage(type: Int, newSimplePage: SimplePageInput): String
    }
`   