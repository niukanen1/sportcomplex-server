import { pageConfigTypes } from './PageConfigTypes/pageConfigTypes';
import { ContactInfoTypes } from "./ContactPage/ContactInfo";
import { SimplePagesTypes } from "./SimplePages/SimplePagesTypes";
import { priceListType } from "./Prices/priceListType";
import { LatestNewsTypes } from "./MainPage/LatestNews";
import { TimeTableTypes } from "./MainPage/TimeTableTypes";
import { SportOpportunitiesTypes } from "./MainPage/SportOpportunitiesTypes";
import { UserTypes } from "./UserLogin/UserTypes";
import { CalendarTypes } from "./Calendar/CalendarTypes";
import { LayoutTypes } from './Layout/LayoutTypes';
import { HostelTypes } from './Hostel/HostelTypes';

export const typeDefs = [
	priceListType,
	LatestNewsTypes,
	SimplePagesTypes,
	TimeTableTypes,
	SportOpportunitiesTypes,
	ContactInfoTypes,
    UserTypes, 
    CalendarTypes, 
    pageConfigTypes, 
    LayoutTypes, 
    HostelTypes
];
