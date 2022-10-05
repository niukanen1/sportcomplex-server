import { ObjectId } from "mongodb";
import {
	getPriceList,
	updatePriceListElementById,
	createNewPriceListElement,
	deletePriceListElementById,
	getPriceListElementById,
} from "./Prices/priceListResolver";
import { editToken, getFacebookData, getLatestNews } from './MainPage/LatestNewsResolver'
import { addSimplePage, editSimplePage, getSimplePages } from "./SimplePages/SimplePagesResolvers";
import { getTimeTable, setTimeTable } from "./MainPage/TimeTableResolvers";
import { getSportOpportunitiesDescription, setSportOpportunitiesDescription } from "./MainPage/SportOpportunitiesResolvers";
import { getGeneralContactsInfo, getPersonalContactsInfo, setGeneralContactInfo, setPersonalContactInfo } from "./ContactPage/ContactInfoResolvers";
import { Login, updateUser } from "./UserLogin/UserLogin";
import { addCalendarEvent, getCalendarEventById, getCalendarEvents, updateCalendarEvent } from "./Calendar/CalendarResolvers";

export type TextContent = {
	RUS: string;
	EST: string;

	ENG: string;
};
// export type PriceListElementInput1 = {
// 	_id: string;
// 	name: TextContent;
// 	tickets: { description: TextContent; duration: { hours: number; additionalInfo: TextContent }; price: number }[];
// };
export type TimeTableBlock = { 
    title: TextContent
    minTitle1: string
    minTitle2: string
    timeTable1: string
    timeTable2: string
}
export type TimeTableInput = { 
    title: TextContent
    SportComplex: TimeTableBlock
    SwimmingPool: TimeTableBlock
}

export type SimplePageInput = { 
    title: TextContent | null, 
    text: TextContent | null, 
    image: string | null
}
export type PriceListElementInput = {
	name: TextContent;
	tickets: { description: TextContent; duration: { hours: number; additionalInfo: TextContent }; price: number }[];
};

export type SportOpportunitiesDescriptionInput = { 
    title: TextContent, 
    text: TextContent
}

export type FieldInput = { 
    fieldTitle: TextContent
    fieldInfo: string
}

export type GeneralContactsInfoInput = {
    addressField: FieldInput
    phoneField: FieldInput
    emailField: FieldInput
}
export type PersonalContactsInfoInput = { 
    name: string
    role: TextContent
    phone: string
    email: string
}
export type UserInput = { 
    login: string,
    password: string
}
export type CalendarEventInput = { 
    name: TextContent
    eventDescription: TextContent
    link: string
    date: string
    time: string 
    place: string
}
export type Options = { 
    offset: number 
    limit: number
}

export const resolvers = {
	Query: {
        // PRICING
		GetPriceList: async () => {
			return await getPriceList();
		},
		GetPriceListElementById: async (_: any, { id }: { id: string }) => {
			return await getPriceListElementById(id);
		},
        // LATEST NEWS
		GetLatestNews: async () => {
			return getLatestNews();
		},
        
        // SIMPLE PAGES
        GetSimplePages: async (_:any, {type}: {type: number}) => { 
            return await getSimplePages(type);
        }, 

        // TIMETABLE 
        GetTimeTable: async () => { 
            return await getTimeTable();
        }, 

        // SportOpportunitiesDescription
        GetSportOpportunitiesDescription: async () => { 
            return getSportOpportunitiesDescription();
        }, 

        // CONTACT INFO
        GetGeneralContactsInfo: async () => { 
            return await getGeneralContactsInfo();
        }, 
        GetPersonalContactsInfo: async () => { 
            return await getPersonalContactsInfo();
        }, 

        // CALENDAR EVENTS 
        GetCalendarEvents: async (_:any, { options } : {options: Options}) => { 
            return await getCalendarEvents(options); 
        }, 
        GetCalendarEventById: async (_:any, { id } : { id: string}) => { 
            return getCalendarEventById(id);
        }

	},
	Mutation: {
		// PRICING
		UpdatePriceListElementById: async (
			_: any,
			{ updatedPriceListElement, id }: { updatedPriceListElement: PriceListElementInput; id: string }
		) => {
			console.log("PRoccesssssssing");
			return await updatePriceListElementById(id, updatedPriceListElement);
		},
		CreateNewPriceListElement: async (
			_: any,
			{ newPriceListElement }: { newPriceListElement: PriceListElementInput }
		) => {
			return await createNewPriceListElement(newPriceListElement);
		},
		DeletePriceListElementById: async (_: any, { _id }: { _id: string }) => {
			return await deletePriceListElementById(_id);
		},

		// LATEST NEWS
		RefetchLatestNews: async () => {
			return await getFacebookData();
		},
		EditToken: async (_: any, { newToken }: { newToken: string }) => {
			return await editToken(newToken);
		},

        // SIMPLE PAGES
        EditSimplePage: async (_:any, { _id, updatedSimplePage } : {_id: string, updatedSimplePage: SimplePageInput}) => { 
            return await editSimplePage(_id, updatedSimplePage );
        }, 
        AddSimplePage: async (_:any, {type, newSimplePage}: { type: number, newSimplePage: SimplePageInput}) => { 
            return await addSimplePage(type, newSimplePage);
        },

        // TIMETABLE 
        SetTimeTable: async (_:any, {newTimeTable}: {newTimeTable: TimeTableInput}) => { 
            return await setTimeTable(newTimeTable);
        }, 

        // SportOpportunitiesDescription
        SetSportOpportunitiesDescription: async (_:any, {newSportOpportunitiesDescription} : {newSportOpportunitiesDescription: SportOpportunitiesDescriptionInput}) => { 
            return await setSportOpportunitiesDescription(newSportOpportunitiesDescription);
        }, 

        // CONTACT INFO
        SetGeneralContactInfo: async (_: any, { newGeneralContactsInfo } : { newGeneralContactsInfo: GeneralContactsInfoInput}) => { 
            return await setGeneralContactInfo(newGeneralContactsInfo)
        }, 
        SetPersonalContactInfo: async (_:any, {newPersonalContactsInfo} : { newPersonalContactsInfo: PersonalContactsInfoInput[]}) => { 
            return await setPersonalContactInfo(newPersonalContactsInfo);
        },

        // USER LOGIN
        UpdateUser: async (_:any, {updatedUser} : {updatedUser: UserInput}) => { 
            return await updateUser(updatedUser);
        }, 
        Login: async (_:any, {userData}: {userData: UserInput}) => { 
            return await Login(userData);
        }, 

        // CALENDAR EVENTS 
        AddCalendarEvent: async (_:any, {newEvent} : {newEvent: CalendarEventInput}) => { 
            return await addCalendarEvent(newEvent)
        },
        UpdateCalendarEvent: async (_: any, {_id, newContent}: {_id: string, newContent: CalendarEventInput}) => {
            return await updateCalendarEvent(_id, newContent)
        }
	},
};

