import { gql } from "apollo-server-core";


export const TimeTableTypes = gql` 

    type TimeTableBlock { 
        title: TextContent
        minTitle1: TextContent
        minTitle2: TextContent
        timeTable1: String
        timeTable2: String
    }
    type TimeTable { 
        title: TextContent
        SportComplex: TimeTableBlock
        SwimmingPool: TimeTableBlock
    }  
    input TimeTableBlockInput { 
        title: TextContentInput
        minTitle1: TextContentInput
        minTitle2: TextContentInput
        timeTable1: String
        timeTable2: String
    }
    input TimeTableInput { 
        title: TextContentInput
        SportComplex: TimeTableBlockInput
        SwimmingPool: TimeTableBlockInput
    }

    # Time table for sport objects 
    type ObjectTimeTableEvent { 
        id: Int!
        textContent: TextContent
        name: String
        type: String
        startTime: String
        endTime: String
    }
    type ObjectTimeTable { 
        E: [ObjectTimeTableEvent]
        T: [ObjectTimeTableEvent]
        K: [ObjectTimeTableEvent]
        N: [ObjectTimeTableEvent]
        R: [ObjectTimeTableEvent]
        L: [ObjectTimeTableEvent]
        P: [ObjectTimeTableEvent]
    }
    type ObjectTimeTimeTableContainer { 
        objectName: String 
        timeTable: ObjectTimeTable
    }
    input ObjectTimeTableEventInput { 
        id: Int!
        textContent: TextContentInput
        name: String
        type: String
        startTime: String
        endTime: String
    }
    input ObjectTimeTableInput { 
        E: [ObjectTimeTableEventInput]
        T: [ObjectTimeTableEventInput]
        K: [ObjectTimeTableEventInput]
        N: [ObjectTimeTableEventInput]
        R: [ObjectTimeTableEventInput]
        L: [ObjectTimeTableEventInput]
        P: [ObjectTimeTableEventInput]
    }



    type Query { 
        GetTimeTable: TimeTable
        GetObjectTimeTable(objectName: String): ObjectTimeTimeTableContainer 
    }
    type Mutation { 
        SetObjectTimeTable(objectName: String, newObjectTimeTable: ObjectTimeTableInput): String
        # UpdateObjectTimeTableEvent(objectName: String, updatedObjectTimeTable: ObjectTimeTableEventInput): String 
        SetTimeTable(newTimeTable: TimeTableInput): String
    }
`