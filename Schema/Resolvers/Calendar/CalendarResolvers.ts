import { ObjectId } from 'mongodb';
import { CalendarEventInput, Options } from './../resovers';
import { calendarEventsCollection } from "../../../Database/databaseConnector";

export async function getCalendarEvents(Options: Options) {
    const array = await calendarEventsCollection.find({}).skip(Options?.offset).limit(Options?.limit).sort({ date: 1}).toArray();
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

export async function deleteCalendarEvent(_id: string) { 
    const response = { str: "Success" };

    const objectToCheck = await calendarEventsCollection.findOne({_id: new ObjectId(_id)}); 

    if (!objectToCheck) { 
        response.str = "Failed to find the event";
        return response.str
    }

    await calendarEventsCollection.deleteOne({_id: new ObjectId(_id)});

    return response.str
}

export async function getCalendarEventsByMonth(monthStr: string) { 
    const arrayOfMonthSortedEvents = await calendarEventsCollection.find({date: {$regex: new RegExp(`${monthStr}-[0-9]{2}`)}}).sort({ date: 1, startTime: 1}).toArray();
    return arrayOfMonthSortedEvents;
}

export async function getRelevantCalendarEventsByCurrentDate(currentDate: string) { 
    const arrayOfRelevantEvents = await calendarEventsCollection.find({date: {$gt: currentDate}}).sort({date: 1}).toArray();
    const currentDateEvent = await calendarEventsCollection.find({date: currentDate}).toArray();
    if (currentDateEvent[0]) { 
        arrayOfRelevantEvents.unshift(currentDateEvent[0]);
    }
    
    return arrayOfRelevantEvents
}
