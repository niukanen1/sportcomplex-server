import { latestNewsCollection, variablesCollection } from "../../../Database/databaseConnector";
const fetch = require("fetch")
const SECRET = process.env.FACEBOOK_TOKEN_SECRET;

export async function getLatestNews() {
    const response = { errorMessage: "", success: true, data: {}}
    try { 
        const cursor = await latestNewsCollection.findOne({message: {$exists: true}});
        response.data = cursor!;
    } catch(error) { 
        response.errorMessage = "Something went wrong..."; 
        response.success = false;
        console.log(error);
    }
	return response;
}

export async function refetchLatestNews() {
	return;
}

export async function editToken(newToken: string) {
	let response = "Success";
	try {
		await variablesCollection.updateOne({ NewsToken: { $exists: true } }, { $set: { NewsToken: newToken } });
	} catch (e) {
		response = "something went wrong";
		console.log(e);
	}

	return response;
}
// function justSutpidFetch() {
// 	fetch(`https://graph.facebook.com/v15.0/spordikompleksKalev/feed?access_token=${"EAAVrZCSeKcAIBADQmOYcIidvb5TCZC2YsJTxF67VBLutfbKA2dQg2zDXUXlTnNvGp36UCBZAZCt1Ve7Of9NKqJ4dNGZCkAa6Xt1SDDQtyvABxYxwYI8vN2Orq86j7gnhLxhihuyNrnk80LoElNDMdmopajDBUAo1uGBeSON9hHpQTdtDJdqsxw21fYCZB1KHeu4CDBTZAaZBWoN4ZBr871AZBv"}`)
// 		.then((response) => response.json())
// 		.then((data) => {
// 			if (data.data) {
// 				for (let el of data.data) {
// 					if (el.message) {
// 						//send to bd el as facebook latest news
//                         console.log(el.message);
// 						break;
// 					}
// 				}
// 			}
// 		});
// }
export async function getFacebookData() {
	const response = { str: "success" };
	const cursor = await variablesCollection.findOne({ NewsToken: { $exists: true } });
	const token = cursor?.NewsToken;
	if (!token) {
		response.str = "failed to find token";
	}

	// justSutpidFetch();

	fetch(`https://graph.facebook.com/v15.0/spordikompleksKalev/feed?&access_token=${token!}`)
		.then((response: { json: () => any; }) => response.json())
		.then(async (data: { data: any; error: { message: string; }; }) => {
			if (data.data) {
				for (let el of data.data) {
					if (el.message) {
						//send to db el as facebook latest news
						try {
							await latestNewsCollection.updateOne(
								{ message: { $exists: true } },
								{ $set: { message: el.message, created_time: el.created_time } }
							);
						} catch (e) {
							console.log("Error fetching news");
							console.log(e);
						}
						break;
					}
				}
			} else if (data.error) {
				console.log("error");
				console.log(data.error);
				// refreshToken(token);
				response.str += data.error.message;
			} else {
				response.str += " failed to refetch token";
			}
		});
	// console.log("response is " + response);
	return response.str;
}

export function checkTokenExpirityDate(token: string, date: string) {}

function refreshToken(token: string) {
	fetch(
		`https://graph.facebook.com/v15.0/oauth/access_token?grant_type=fb_exchange_token&client_id=1526109917835266&client_secret=${SECRET}&fb_exchange_token=${token}`
	)
		.then((response: { json: () => any; }) => response.json())
		.then(async (data: { access_token: any; }) => {
			//send to db token with DATE
			console.log("refetch token updated");
			console.log(data.access_token);
			await variablesCollection.updateOne(
				{ NewsToken: { $exists: true } },
				{ $set: { NewsToken: data.access_token, createdDate: new Date().toISOString() } }
			);
		});
}
