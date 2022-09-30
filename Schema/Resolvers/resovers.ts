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

        // TODO: SportOpportunitiesDescription
        GetSportOpportunitiesDescription: async () => { 
            return getSportOpportunitiesDescription();
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

			return getFacebookData();
		},
		EditToken: async (_: any, { newToken }: { newToken: string }) => {
			return await editToken(newToken);
		},

        // SIMPLE PAGES
        EditSimplePage: async (_:any, { _id, updatedSimplePage } : {_id: string, updatedSimplePage: SimplePageInput}) => { 
            return await editSimplePage(_id, updatedSimplePage );
        }, 
        AddSimplePage: async (_:any, {type, newSimplePage}: { type: number, newSimplePage: SimplePageInput}) => { 
            return addSimplePage(type, newSimplePage);
        },

        // TIMETABLE 
        SetTimeTable: async (_:any, {newTimeTable}: {newTimeTable: TimeTableInput}) => { 
            return setTimeTable(newTimeTable);
        }, 

        // TODO: SportOpportunitiesDescription
        SetSportOpportunitiesDescription: async (_:any, {newSportOpportunitiesDescription} : {newSportOpportunitiesDescription: SportOpportunitiesDescriptionInput}) => { 
            return setSportOpportunitiesDescription(newSportOpportunitiesDescription);
        }
	},
};

