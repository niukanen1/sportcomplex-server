import { gql } from "apollo-server-core";


export const TimeTableTypes = gql` 
    type TimeTable { 
        SportComplex: String, 
        SwimmingPool: String
    }
    input TimeTableInput { 
        SportComplex: String
        SwimmingPool: String
    }

    type Query { 
        GetTimeTable: TimeTable
    }
    type Mutation { 
        SetTimeTable(newTimeTable: TimeTableInput): String
    }
`