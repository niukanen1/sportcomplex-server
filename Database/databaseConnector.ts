require('dotenv').config(); 
import { MongoClient } from "mongodb";


const client = new MongoClient(process.env.MONGO_URI ?? ""); 

const database = client.db("sport_complex"); 

// collections 
const priceListCollection = database.collection("priceList")


client.connect(async err => {
    if (err) { 
        console.log("err " + err); 
    } else { 
        console.log("Database is ok");
    }
})


export { 
    priceListCollection
}