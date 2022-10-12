import { gql } from "apollo-server"

export const LayoutTypes = gql`
    type FooterSection { 
        header: TextContent
        showHeader: Boolean
        body: TextContent
        showBody: Boolean
    }
    type Footer { 
        _id: ID!
        firstSection: FooterSection
        secondSection: FooterSection
        thirdSection: FooterSection
        showContacts: Boolean
    }

    type Query { 
        GetFooter: Footer
    }

    type Mutation {
        AddFooterData(newFooter: FooterInput): String 
        EditFooterData(updatedFooter: FooterInput): String
    }


    input FooterSectionInput { 
        header: TextContentInput
        showHeader: Boolean
        body: TextContentInput
        showBody: Boolean
    }
    input FooterInput { 
        firstSection: FooterSectionInput
        secondSection: FooterSectionInput
        thirdSection: FooterSectionInput
        showContacts: Boolean
    }

`