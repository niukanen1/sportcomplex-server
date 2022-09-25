import { ObjectId } from "mongodb";
import {
	getPriceList,
	updatePriceListElementById,
	createNewPriceListElement,
	deletePriceListElementById,
} from "./Prices/priceListResolver";

export type TextContent = {
	RUS: string;
	EST: string;
	ENG: string;
};
export type PriceListElementInput1 = {
    _id: string,
	name: TextContent;
	tickets: { description: TextContent; duration: { hours: number; additionalInfo: TextContent }; price: number }[];
};
export type PriceListElementInput = {
	name: TextContent;
	tickets: { description: TextContent; duration: { hours: number; additionalInfo: TextContent }; price: number }[];
};
export const resolvers = {
	Query: {
		GetPriceList: async () => {
			return await getPriceList();
		},
	},
	Mutation: {
		UpdatePriceListElementById: async (
			_: any,
			{updatedPriceListElement, id }: {updatedPriceListElement: PriceListElementInput, id: string }
		) => {
            console.log("PRoccesssssssing")
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
	},
};
