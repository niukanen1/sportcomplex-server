require('dotenv').config(); 
import { MongoClient } from "mongodb";
const client = new MongoClient(process.env.MONGO_URI ?? ""); 

const database = client.db("sport_complex"); 

// collections 
export const priceListCollection = database.collection("priceList");
export const latestNewsCollection = database.collection("latestNews");
export const variablesCollection = database.collection("variables");


client.connect(async err => {
    if (err) { 
        console.log("err " + err); 
    } else { 
        console.log("Database is ok");
    }
})
