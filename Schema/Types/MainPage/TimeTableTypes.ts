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

    type Query { 
        GetTimeTable: TimeTable
    }
    type Mutation { 
        SetTimeTable(newTimeTable: TimeTableInput): String
    }
`