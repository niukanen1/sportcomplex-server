import { TextContent, TimeTableInput } from './../resovers';
import { ObjectId } from "mongodb";
import { timeTableCollection } from "../../../Database/databaseConnector";


export type ObjectTimeTableEvent = { 
    id: number
    textContent: TextContent
    name: String
    type: String
    startTime: String
    endTime: String
}
export type ObjectTimeTable = { 
    E: [ObjectTimeTableEvent]
    T: [ObjectTimeTableEvent]
    K: [ObjectTimeTableEvent]
    N: [ObjectTimeTableEvent]
    R: [ObjectTimeTableEvent]
    L: [ObjectTimeTableEvent]
    P: [ObjectTimeTableEvent]
}

export async function getTimeTable() {
	const timeTable = await timeTableCollection.find({}).toArray();
	return timeTable[0];
}

export async function setTimeTable(newTimeTable: TimeTableInput) {
	const response = { str: "Success" };

	try {
		// there is only one element in timeTableList, so get first elemment timeTable[0] 
		const timeTableList = await timeTableCollection.find({}).toArray();
        if (!timeTableList[0]) {
            response.str = "Cannot find timeTable";
        }
		await timeTableCollection.updateOne(
			{ _id: new ObjectId(timeTableList[0]._id) },
			{ $set: newTimeTable }
		);
	} catch (e) {
		response.str = "Something went wrong...";
		throw new Error(`${e}`);
	}
	return response.str;
}


export async function GetObjectTimeTable(objectName: string) { 
    const objectTimeTableList = await timeTableCollection.find({objectName: objectName}).toArray();
    if (!objectTimeTableList[0]) { 
        throw new Error("No timetable was found...");
    }
    return objectTimeTableList[0];
}

export async function SetObjectTimeTable(objectName: string, newObjectTimeTable: ObjectTimeTable) { 
    if (!objectName) { 
        return "Wrong object name"
    }
    try { 
        await timeTableCollection.updateOne({objectName: objectName}, {$set: {timeTable: newObjectTimeTable}});
    } catch (e) { 
        throw new Error(`${e}`)
    }
    return "Success"
}