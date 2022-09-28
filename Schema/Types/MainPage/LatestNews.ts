import { gql } from 'apollo-server';

export const LatestNewsTypes = gql ` 
    union ResponseData = LatestNews | StringBox
    type StringBox { 
        str: String
    }
    type LatestNews { 
        _id: ID!
        created_time: String 
        message: String
    }
    type NewsResponse { 
        errorMessage: String
        success: Boolean!
        data: LatestNews
    } 


    type Query { 
        GetLatestNews: NewsResponse!
    }

    type Mutation { 
        EditToken(newToken: String): String 
        RefetchLatestNews: String!
    }

`
