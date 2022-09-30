import { TimeTableInput } from './../resovers';
import { ObjectId } from "mongodb";
import { timeTableCollection } from "../../../Database/databaseConnector";

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
			{ $set: { SportComplex: newTimeTable?.SportComplex, SwimmingPool: newTimeTable?.SwimmingPool } }
		);
	} catch (e) {
		response.str = "Something went wrong...";
		throw new Error(`${e}`);
	}
	return response.str;
}