import { gql } from "apollo-server";

export const priceListType = gql`
    type TextContent { 
        RUS: String
        EST: String
        ENG: String
    }
    type Duration { 
        hours: Float !
        additionalInfo: TextContent 
    }
    type Ticket {
        description: TextContent!
        duration: Duration
        price: Float !
    }
    type PriceListElement {
        _id: ID!
        name: TextContent!
        tickets: [Ticket]
    }
    type Query { 
        GetPriceList: [PriceListElement]!
    }
    type Mutation { 
        UpdatePriceListElementById(_id: String!, updatedPriceListElement: PriceListElementInput!): String!
        CreateNewPriceListElement(newPriceListElement: PriceListElementInput!): PriceListElement
        DeletePriceListElementById(_id: String!): String!
    }

    # Input types
    input TextContentInput { 
        RUS: String
        EST: String
        ENG: String 
    }
    input PriceListElementInput { 
        name: TextContentInput!
        tickets: [TicketInput]
    }
    input TicketInput { 
        description: TextContentInput!
        duration: DurationInput
        price: Float!
    }
    input DurationInput { 
        hours: Float!, 
        additionalInfo: TextContentInput
    }
    
`;
