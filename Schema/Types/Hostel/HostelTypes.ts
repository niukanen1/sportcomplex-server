import { gql } from "apollo-server-core";


export const HostelTypes = gql`
    type Room { 
        _id: ID! 
        name: TextContent
        description: TextContent
    }

    input RoomInput { 
        name: TextContentInput
        description: TextContentInput
    }

    type Facility { 
        _id: ID
        title: TextContent
        description: TextContent
    }

    input FacilityInput { 
        title: TextContentInput
        description: TextContentInput
    }

    type Contact { 
        title: TextContent
        body: TextContent
    }

    input ContactInput { 
        title: TextContentInput
        body: TextContentInput
    }

    type MainDescription {
        text: TextContent
        contacts: Contact 
    }

    input MainDescriptionInput {
        text: TextContentInput
        contacts: ContactInput
    }

    type Query { 
        GetRooms: [Room]
        GetMainDescription: MainDescription
        GetFacilities: [Facility]
    }

    type Mutation { 
        # Room manipulation 
        SetRooms(replaceRoomsWith: [RoomInput]): String 
        AddRoom(newRoom: RoomInput): String
        DeleteRoom(RoomIdToDelete: ID): String
        EditRoom(RoomIdToEdit: ID, editedRoom: RoomInput): String

        # MainDesciption and Facility manipulation
        SetMainDescription(description: MainDescriptionInput): String

        SetFacilities(facilities: [FacilityInput]): String
        AddFacility(facility: FacilityInput): String
        EditFacility(facilityID: ID, newFacilityData: FacilityInput): String
        DeleteFacility(facilityID: ID): String
    }
`