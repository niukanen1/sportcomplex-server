import { gql } from "apollo-server";

export const ContactInfoTypes = gql ` 
    type Field { 
        fieldTitle: TextContent
        fieldInfo: String
    }
    type GeneralContactsInfo { 
        _id: ID
        addressField: Field
        phoneField: Field
        emailField: Field
    }

    type PersonContactInfo { 
        _id: ID
        name: String
        role: TextContent
        phone: String
        email: String
    }
    
    type Query { 
        GetGeneralContactsInfo: GeneralContactsInfo
        GetPersonalContactsInfo: [PersonContactInfo]
    }

    type Mutation { 
        SetGeneralContactInfo(newGeneralContactsInfo: GeneralContactsInfoInput): String
        SetPersonalContactInfo(newPersonalContactsInfo: [PersonContactInfoInput]): String
    }

    input PersonContactInfoInput { 
        name: String
        role: TextContentInput
        phone: String
        email: String
    }

    input FieldInput { 
        fieldTitle: TextContentInput
        fieldInfo: String
    }
    input GeneralContactsInfoInput { 
        addressField: FieldInput
        phoneField: FieldInput
        emailField: FieldInput
    }
`