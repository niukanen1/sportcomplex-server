import { ObjectId } from "mongodb";
import { getPriceList, updatePriceListElementById, createNewPriceListElement } from "./Prices/priceListResolver";

export type TextContent = { 
    RUS: string; 
    EST: string; 
    ENG: string; 
}
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
			{ _id, updatedPriceListElement }: { _id: string; updatedPriceListElement: PriceListElementInput }
		) => {
			return await updatePriceListElementById(_id, updatedPriceListElement);
		},
		CreateNewPriceListElement: async (
			_: any,
			{ newPriceListElement }: { newPriceListElement: PriceListElementInput }
		) => {
			return await createNewPriceListElement(newPriceListElement);
		},
	},
};
