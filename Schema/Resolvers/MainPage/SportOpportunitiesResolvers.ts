import { ObjectId } from 'mongodb';
import { SportOpportunitiesDescriptionInput } from './../resovers';
import { sportOpportunitiesCollection } from "../../../Database/databaseConnector"

export async function getSportOpportunitiesDescription() { 
    const responseList = await sportOpportunitiesCollection.find({}).toArray();
    if (!responseList[0]) { 
        throw new Error("Could not find object..."); 
    }
    return responseList[0]
}

export async function setSportOpportunitiesDescription(newObj: SportOpportunitiesDescriptionInput) { 
    const response = { str: "Success" };

    try { 
        const cursor = await sportOpportunitiesCollection.find({}).toArray();
        if(!cursor[0]) { 
            response.str = "Not found"
            return response.str
        }
        await sportOpportunitiesCollection.updateOne({_id: new ObjectId(cursor[0]._id)}, {$set: newObj});
    } catch(e) { 
        response.str = "Error happend"
        throw new Error(`${e}`);
        
    }
    
    return response.str
}