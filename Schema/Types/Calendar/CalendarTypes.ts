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
        startTime: String
        endTime: String
    } 

    type Query { 
        GetCalendarEvents(options: Options): [CalendarEvent]
        GetCalendarEventById(id: ID!) : CalendarEvent
        GetCalendarEventsByMonth(monthStr: String): [CalendarEvent]
        GetRelevantCalendarEventsByCurrentDate(currentDate: String): [CalendarEvent]
    }

    type Mutation { 
        AddCalendarEvent(newEvent: CalendarEventInput): String
        UpdateCalendarEvent(_id: ID, newContent: CalendarEventInput): String 
        DeleteCalendarEvent(_id: ID): String
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
        startTime: String
        endTime: String
    }
`