import { ObjectId } from 'mongodb';
import { GeneralContactsInfoInput, PersonalContactsInfoInput } from './../resovers';
import { generalContactsCollection, personalContactsCollection } from "../../../Database/databaseConnector"

export async function getGeneralContactsInfo() { 
    const CollectionList = await generalContactsCollection.find({}).toArray();
    const generalContacts = CollectionList[0]; 

    if (!generalContacts) { 
        throw new Error("Cannot find general contacts"); 
    }
    return generalContacts;
}
export async function getPersonalContactsInfo() { 
    const CollectionList = await personalContactsCollection.find({}).toArray();

    if (!CollectionList) { 
        throw new Error("Cannot find personal contacts"); 
    }
    return CollectionList;
}

export async function setGeneralContactInfo(newInfo: GeneralContactsInfoInput) { 
    const response = { str: "Success"}; 
    try { 
        const infoList = await generalContactsCollection.find({}).toArray(); 
        if (!infoList[0]) { 
            throw new Error("NO data has been found"); 
        }
        await generalContactsCollection.updateOne({_id: new ObjectId(infoList[0]._id)}, {$set: newInfo});
    } catch(e) { 
        response.str = "Something went wrong"
        throw new Error(`${e}`)
    }
    return response.str
}

export async function setPersonalContactInfo(newInfo: PersonalContactsInfoInput[]) { 
    const response = { str: "Success"}; 

    try { 
        const cursor = await personalContactsCollection.find({}).toArray();
        cursor.forEach(async (el, index) => { 
            await personalContactsCollection.updateOne({_id: new ObjectId(el._id)}, {$set: newInfo[index]});
        })
    } catch(e) { 
        response.str = "Something went wrong";
        throw new Error(`${e}`);
    }
    return response.str
}