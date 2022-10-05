import { ObjectId } from 'mongodb';
import { CalendarEventInput, Options } from './../resovers';
import { calendarEventsCollection } from "../../../Database/databaseConnector";

export async function getCalendarEvents(Options: Options) {
    const array = await calendarEventsCollection.find({}).skip(Options?.offset).limit(Options?.limit).toArray();
    return array
}

export async function addCalendarEvent(newEvent: CalendarEventInput) { 
    const response = {str: "Success"}; 
    try {   
        await calendarEventsCollection.insertOne({...newEvent}); 
    } catch(e) { 
        response.str = `${e}`
    }
    return response.str
}

export async function updateCalendarEvent(_id: string, newContent: CalendarEventInput) { 
    const response = { str: "Success"}; 

    const eventToUpdate = await calendarEventsCollection.findOne({_id: new ObjectId(_id)}); 

    if (!eventToUpdate) { 
        response.str = "Event you want to update was not found"
        return response.str
    }

    try { 
        await calendarEventsCollection.updateOne({_id: new ObjectId(_id)}, {$set: newContent});
    } catch (e) {
        response.str = `${e}`
    }
    return response.str
}

export async function getCalendarEventById(id: string) { 
    const response = await calendarEventsCollection.findOne({_id: new ObjectId(id)}); 
    return response
}