import { TextContent } from "./../resovers";
import { hostelCollection } from "../../../Database/databaseConnector";
import { ObjectId } from "mongodb";
import { v4 as uuidv4 } from "uuid";

// types
export type Room = {
	_id: string;
	name: TextContent;
	description: TextContent;
};

export type HostelObject<T> = {
	type: string;
	data: T;
};

export type HostelContacts = {
	title: TextContent;
	body: TextContent;
};

export type MainDescription = {
	text: TextContent;
	contacts: HostelContacts;
};

export type Facility = {
	_id: string;
	title: TextContent;
	description: TextContent;
};

// names for type field in DB

const mainDescriptionObjectTYPENAME = "mainDescription";
const roomsObjectTYPENAME = "rooms";
const facilitiesObjectTYPENAME = "facilities";

// QUERIES

export async function GetRooms(): Promise<Room[]> {
	// get list of rooms
	const cursor = await hostelCollection.find({ type: roomsObjectTYPENAME }).toArray();
	const RoomsObject = cursor[0];

	if (!RoomsObject) {
		throw new Error("Couldn't find rooms object");
	}
	// try to treat listOfRooms as HostelObject of rooms to properly get list of rooms
	const listOfRooms = (RoomsObject as unknown as HostelObject<Room[]>).data;
	if (listOfRooms) {
		return listOfRooms;
	}
	throw new Error("Couldn't extract rooms object");
}

// get main description and contacts objects
export async function GetMainDescription(): Promise<MainDescription> {
    const mainDescriptionObject = await GetHostelObject<HostelObject<MainDescription>>(mainDescriptionObjectTYPENAME); 
    
    if (mainDescriptionObject) { 
        return mainDescriptionObject.data
    }
    throw new Error("Couldn't find main description object");
}

export async function GetFacilites(): Promise<Facility[]>{
    const facilityObject = await GetHostelObject<HostelObject<Facility[]>>(facilitiesObjectTYPENAME); 

    if (!facilityObject) { 
        throw new Error("Couldn't find facility object, try `SetFacilities` first"); 
    }

    return facilityObject.data; 
}

// MUTATIONS

// Roooms
export async function SetRooms(replaceRoomsWith: Room[]): Promise<string> {
	// add id to each room
	const listOfRooms = IdForEachElement<Room>(replaceRoomsWith);
	// Rooms object
	const NewRoomsObject: HostelObject<Room[]> = {
		type: roomsObjectTYPENAME,
		data: listOfRooms,
	};

	try {
		// check if rooms object exists

		const cursor = await hostelCollection.find({ type: roomsObjectTYPENAME }).toArray();

		if (!cursor[0]) {
			// insert rooms object
			await hostelCollection.insertOne(NewRoomsObject);
		} else {
			const roomsObject = cursor[0];
			// updating existing rooms object
			await hostelCollection.updateOne({ _id: new ObjectId(roomsObject._id) }, { $set: NewRoomsObject });
		}
	} catch (err) {
		console.log(err);
		return err as string;
	}
	return "Success";
}

export async function AddRoom(newRoom: Room): Promise<string> {
	// adding id to new room
	let AddedRoom = newRoom;
	AddedRoom._id = uuidv4();

	// default HostelObject
	const fetched = await hostelCollection.find({ type: roomsObjectTYPENAME }).toArray();
	const roomsObject = fetched[0] as unknown as HostelObject<Room[]>;
	try {
		if (roomsObject) {
			roomsObject.data.push(AddedRoom);
			await hostelCollection.updateOne({ type: roomsObjectTYPENAME }, { $set: roomsObject });
		} else {
			throw new Error("Failed ot find Rooms Object, try to 'SetRooms' first");
		}
	} catch (err) {
		return `${err}`;
	}
	return "Success";
}

export async function DeleteRoom(RoomIdToDelete: string): Promise<string> {
	// first check if the room exists
	// 1. Get rooms object to get access to the list of rooms (check if exists)
	// 2. Check if _id matches any room in the list
	// 3. Delete if exists or throw error if not found
	try {
		// 1
		const RoomsObject = (
			await hostelCollection.find({ type: roomsObjectTYPENAME }).toArray()
		)[0] as unknown as HostelObject<Room[]>;

		if (!RoomsObject) {
			throw new Error("Couldn't find rooms object, try `SetRooms` first");
		}

		// 2 & 3
		// filtering the list to get array without room which _id matches _id that should be deleted
		// if the length didn't change, then the _id was not found in the array
		const updatedList = RoomsObject.data.filter((room) => room._id != RoomIdToDelete);
		if (updatedList.length == RoomsObject.data.length) {
			throw new Error("ID doesn't match any room");
		}
		RoomsObject.data = updatedList;

		// applying changes to DB
		await hostelCollection.updateOne({ type: roomsObjectTYPENAME }, { $set: RoomsObject });
	} catch (err) {
		return `${err}`;
	}
	return `Successfully deleted ${RoomIdToDelete} room`;
}

export async function EditRoom(RoomIdToEdit: string, editedRoom: Room): Promise<string> {
	try {
		const RoomsObject = (
			await hostelCollection.find({ type: roomsObjectTYPENAME }).toArray()
		)[0] as unknown as HostelObject<Room[]>;
		if (!RoomsObject) {
			throw new Error("Couldn't find RoomsObject, try `SetRooms` first");
		}
		RoomsObject.data.forEach((room) => {
			if (room._id == RoomIdToEdit) {
				room.description = editedRoom.description;
				room.name = editedRoom.name;
			}
		});

		await hostelCollection.updateOne({ type: roomsObjectTYPENAME }, { $set: RoomsObject });
	} catch (err) {
		return `${err}`;
	}
	return `Successfully edited ${RoomIdToEdit} room `;
}

// MainDesciption and Facility manipulation
export async function SetMainDescription(description: MainDescription): Promise<string> {
	const DefaultMainDesciptionObject: HostelObject<MainDescription> = {
		type: mainDescriptionObjectTYPENAME,
		data: {} as MainDescription,
	};

	const mainDescriptionObject = await GetHostelObject<MainDescription>("mainDescription");
	DefaultMainDesciptionObject.data = description;

	try {
		// if object exists, update existing
		if (mainDescriptionObject) {
			await hostelCollection.updateOne(
				{ type: mainDescriptionObjectTYPENAME },
				{ $set: DefaultMainDesciptionObject }
			);
		}
		// if do not exist, create new one
		else {
			await hostelCollection.insertOne(DefaultMainDesciptionObject);
		}
	} catch (err) {
		return `${err}`;
	}
	return "Successfully set main description";
}

export async function SetFacilities(facilities: Facility[]): Promise<string> {
	const DefaultFacilitiesObject: HostelObject<Facility[]> = {
		type: facilitiesObjectTYPENAME,
		data: [] as Facility[],
	};

    DefaultFacilitiesObject.data = facilities;
    DefaultFacilitiesObject.data = IdForEachElement(DefaultFacilitiesObject.data);
	try {
		// check if facilities object exists
		if (await GetHostelObject(facilitiesObjectTYPENAME)) {
            // if exists -> update existing 
            await hostelCollection.updateOne({type: facilitiesObjectTYPENAME}, {$set: DefaultFacilitiesObject});
		} else {
            await hostelCollection.insertOne(DefaultFacilitiesObject); 
		}
	} catch (err) {
		return `${err}`;
	}

	return "Success";
}

export async function AddFacility(facility: Facility): Promise<string> { 
    const newFacility = facility; 
    newFacility._id = uuidv4();

    const DefaultFacilitiesObject: HostelObject<Facility[]> = {
		type: facilitiesObjectTYPENAME,
		data: [] as Facility[],
	};
    const facilitiesObject = await GetHostelObject<HostelObject<Facility[]>>(facilitiesObjectTYPENAME); 
    if (!facilitiesObject) { 
        DefaultFacilitiesObject.data.push(newFacility); 
        await hostelCollection.insertOne(DefaultFacilitiesObject)
    }   

    facilitiesObject.data.push(newFacility); 
    await hostelCollection.updateOne({type: facilitiesObjectTYPENAME}, {$set: facilitiesObject}); 
    return "Success"
}

export async function EditFacility(facilityID: string, newFacilityData: Facility): Promise<string> {
    const facilityObject: HostelObject<Facility[]> = await GetHostelObject<HostelObject<Facility[]>>(facilitiesObjectTYPENAME);
    if (!facilityObject) { 
        return "Couldn't find facility object, try `SetFacilities` first"
    }
    facilityObject.data.forEach(facility => { 
        if (facility._id == facilityID) { 
            facility.description = newFacilityData.description
            facility.title = newFacilityData.title
        }
    })

    // publishing changes to database 
    await hostelCollection.updateOne({type: facilitiesObjectTYPENAME}, {$set: facilityObject}); 

    return "Successfully edited " + facilityID; 
}

export async function DeleteFacility(facilityID: string): Promise<string> {
    const facilityObject = await GetHostelObject<HostelObject<Facility[]>>(facilitiesObjectTYPENAME);

    if (!facilityObject) { 
        return "Couldn't find facility object, try `SetFacilities` first"
    }

    const updatedFacilityList = facilityObject.data.filter( facility => facility._id != facilityID ); 

    if (updatedFacilityList.length == facilityObject.data.length) { 
        return "Failed to delete facility"
    }
    facilityObject.data = updatedFacilityList; 
    await hostelCollection.updateOne({type: facilitiesObjectTYPENAME}, {$set: facilityObject}); 

    return "Successfully deleted facility " + facilityID; 
}

// HELPERS

// adds if for each room
function IdForEachElement<T extends {_id: string}>(array: T[]): T[] {
	const rooms = array;
	rooms.forEach((element) => {
		element._id = uuidv4();
	});
	return rooms;
}

async function GetHostelObject<T>(type: string): Promise<T> {
	const cursor = await hostelCollection.find({ type: type }).toArray();
	return cursor[0] as unknown as T;
}
