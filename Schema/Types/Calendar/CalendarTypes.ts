import { TextContent } from './../../Resolvers/resovers';
import { gql } from "apollo-server";

export const CalendarTypes = gql` 
    type CalendarEvent { 
        _id: ID!
        name: TextContent
        eventDescription: TextContent
        link: String
        date: String
        place: String
        time: String
    } 

    type Query { 
        GetCalendarEvents(options: Options): [CalendarEvent]
    }

    type Mutation { 
        AddCalendarEvent(newEvent: CalendarEventInput): String
        UpdateCalendarEvent(_id: ID, newContent: CalendarEventInput): String 
    }
    input Options {
        offset: Int 
        limit: Int
    }
    input CalendarEventInput { 
        name: TextContentInput
        eventDescription: TextContentInput
        link: String
        date: String
        place: String
        time: String
    }
`