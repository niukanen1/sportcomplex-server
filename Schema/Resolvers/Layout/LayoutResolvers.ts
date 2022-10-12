import { layoutCollection } from "../../../Database/databaseConnector"
import { Footer } from "../resovers";
export async function getFooter() { 
    const response = await layoutCollection.findOne({layoutName: "Footer"});
    return response
}
export async function addFooter(newFooter: Footer) { 
    const response = { str: "Success" }; 

    if (await layoutCollection.findOne({layoutName: "Footer"})) { 
        response.str = "Footer already exists..."
        return response.str
    }

    await layoutCollection.insertOne({layoutName: "Footer", ...newFooter});

    return response.str
}

export async function editFooter(updatedFooter: Footer) { 
    const response = { str: "Success" }; 

    const objectToUpdate = await layoutCollection.findOne({layoutName: "Footer"});

    if (!objectToUpdate) { 
        response.str = "Failed to find footer element\nTry creating one";
        return response.str
    }

    await layoutCollection.updateOne({layoutName: "Footer"}, {$set: updatedFooter});

    return response.str
}