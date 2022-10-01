import { gql } from "apollo-server";

export const UserTypes = gql ` 
    type User { 
        _id: ID! 
        login: String!
        password: String!
    }

    input UserInput { 
        login: String! 
        password: String!
    }

    type LoginResponse { 
        str: String
        isLoggedIn: Boolean
    }

    type Mutation { 
        UpdateUser(updatedUser: UserInput!): String!
        Login(userData: UserInput!): LoginResponse!
    }
`