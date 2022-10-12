require("dotenv").config();
import { MongoClient } from "mongodb";
const client = new MongoClient(process.env.MONGO_URI ?? "");

const database = client.db("sport_complex");

// collections
export const priceListCollection = database.collection("priceList");
export const latestNewsCollection = database.collection("latestNews");
export const variablesCollection = database.collection("variables");
export const simplePagesCollection = database.collection("simplePages");
export const timeTableCollection = database.collection("timeTable");
export const sportOpportunitiesCollection = database.collection("sportOpportunities");
export const generalContactsCollection = database.collection("generalContacts"); 
export const personalContactsCollection = database.collection("personalContacts"); 
export const userDataCollection = database.collection("userData");
export const calendarEventsCollection = database.collection("calendarEvents");
export const pageConfigCollection = database.collection("pageConfigs");
export const layoutCollection = database.collection("layout");


client.connect(async (err) => {
	if (err) {
		console.log("err " + err);
	} else {
		console.log("Database is ok");
	}
});
