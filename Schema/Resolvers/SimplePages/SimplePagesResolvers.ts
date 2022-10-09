import { SimplePageInput } from "./../resovers";
import { ObjectId } from "mongodb";
import { simplePagesCollection } from "./../../../Database/databaseConnector";

export async function editSimplePage(_id: string, updatedSimplePage: SimplePageInput) {
	const response = { str: "success" };

	// check if object with recieved id exists...
	const exists = await simplePagesCollection.findOne({ _id: new ObjectId(_id) });

	if (!exists) {
		response.str = "Failed to find object with " + _id + " id";
		throw new Error("Element not found, try another...");
	}

	// Edit specified page object...
	try {
		await simplePagesCollection.updateOne(
			{ _id: new ObjectId(_id) },
			{
				$set: updatedSimplePage,
			}
		);
	} catch (error) {
		response.str = `${error}`;
	}

	return response.str;
}

export async function getSimplePages(type: number) { 
    const response = {pages: [{}]};
    // getting all pages data into array 
    try { 
        const pages = await simplePagesCollection.find({type: type}).toArray(); 
        response.pages = pages
    } catch(error) { 
        throw new Error(`${error}`);
    }
    
    return response.pages
}

export async function addSimplePage(type: number, newSimplePage: SimplePageInput) {
    const response = {str: "Success"}
    try { 
        await simplePagesCollection.insertOne(newSimplePage)
    } catch(error) { 
        response.str = "Error: " + error
        throw new Error(`${error}`)
    }
    return response.str
}