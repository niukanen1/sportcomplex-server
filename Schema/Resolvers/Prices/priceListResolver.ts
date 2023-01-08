// collectiosn
import { priceListCollection } from "../../../Database/databaseConnector";
import { PriceListElementInput } from "../resovers";
import { ObjectId } from "mongodb";

export async function getPriceList() {
	const cursor = await priceListCollection.find({}).toArray();
	return cursor;
}

export async function updatePriceListElementById(id: string, updatedPriceListElement: PriceListElementInput) {
	let response = "success";

	const TicketCopy = updatedPriceListElement.tickets ?? [];
	const newTickets = TicketCopy.filter((el) => el !== undefined && el !== null);
	try {
		await priceListCollection.updateOne(
			{ _id: new ObjectId(id) },
			{
				$set: {
					name: updatedPriceListElement.name,
					tickets: newTickets,
				},
			}
		);
	} catch (err) {
		console.log(err);
		response = "failure";
		throw new Error("Error updating element " + err);
	}
	return await priceListCollection.findOne({ _id: new ObjectId(id) });
}

export async function createNewPriceListElement(newPriceListElement: PriceListElementInput) {
	const returnObj = { response: {} };
	console.log("adding new");
	try {
		const cursor = await priceListCollection.insertOne(newPriceListElement);
		returnObj.response = (await priceListCollection.findOne({ _id: cursor.insertedId })) ?? "none";
	} catch (err) {
		console.log(err);
		throw new Error("Failure creating new price list element " + err);
	}
	return returnObj.response;
}

export async function deletePriceListElementById(_id: string) {
	let responseStr = "success";
	try {
		const element = await priceListCollection.findOne({ _id: new ObjectId(_id) });
		await priceListCollection.deleteOne({ _id: new ObjectId(_id) });
		if (!element) {
			responseStr = "Element Not Found";
		}
	} catch (err) {
		responseStr = "error";
		throw new Error("Failed to delete " + err);
	}
	return responseStr;
}

export async function getPriceListElementById(id: string) {
	const element = await priceListCollection.findOne({ _id: new ObjectId(id) });
	if (!element) {
		throw new Error("Element not found...");
	}
	return element;
}
