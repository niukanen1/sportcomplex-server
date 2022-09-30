import { gql } from "apollo-server";

export const SportOpportunitiesTypes = gql `

    type SportOpportunitiesDescription { 
        title: TextContent
        text: TextContent
    }
    input SportOpportunitiesDescriptionInput { 
        title: TextContentInput
        text: TextContentInput
    }

    type Query { 
        GetSportOpportunitiesDescription: SportOpportunitiesDescription
    }
    type Mutation { 
        SetSportOpportunitiesDescription(newSportOpportunitiesDescription: SportOpportunitiesDescriptionInput): String
    }

`