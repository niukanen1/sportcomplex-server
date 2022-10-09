import { ObjectId } from 'mongodb';
import { pageConfigCollection } from "../../../Database/databaseConnector"
import { PageConfig, PageNotWorkingBanner } from "../resovers";
export async function getPageConfig(pageName: string)  {
    const response = await pageConfigCollection.findOne({pageName: pageName}); 
    if (!response) { 
        throw new Error ("Cannot find page configuration...")
    }
    return response
}

export async function getPageNotWorkingBanner() { 
    const banner = await pageConfigCollection.findOne({title: {$exists: true}, centeredText: {$exists: true}}); 

    if (!banner) { 
        throw new Error("NO BANNER FOUND..."); 
    }
    return banner
}

export async function addPageConfig(newPageConfig: PageConfig) { 
    const response = { str: "Success"}; 

    try { 
        await pageConfigCollection.insertOne(newPageConfig);
    } catch(e) { 
        response.str = "Failed to add pageConfig"
    }

    return response.str
}

export async function addPageNotWorkingBanner(newBanner: PageNotWorkingBanner) { 
    const response = { str: "Success"}; 
    const check = await pageConfigCollection.find({title: {$exists: true}, centeredText: {$exists: true}}).toArray();  
    if (check.length > 0) { 
        response.str = "Banner already existst"; 
        return response.str
    }
    try { 
        await pageConfigCollection.insertOne(newBanner);
    } catch(e) { 
        response.str = "Failed to add Banner";
    }

    return response.str
}

export async function editPageConfig(pageName: string, newConfig: PageConfig) { 
    const response = { str: "Success"}; 

    const configToChange = await pageConfigCollection.findOne({pageName: pageName})

    if (!configToChange)  {
        response.str = "Cannot find config to edit"
        return response.str
    } 

    await pageConfigCollection.updateOne({_id: new ObjectId(configToChange._id)}, { $set: newConfig});

    return response.str
}

export async function editPageNotWorkingBanner(newBanner: PageNotWorkingBanner) { 
    const response = { str: "Success"}; 

    const bannerToChange = await pageConfigCollection.findOne({title: {$exists: true}, centeredText: {$exists: true}})

    if (!bannerToChange)  {
        response.str = "Cannot find config to edit"
        return response.str
    } 

    await pageConfigCollection.updateOne({_id: new ObjectId(bannerToChange._id)}, { $set: newBanner});

    return response.str
}