import { gql } from "apollo-server";

export const pageConfigTypes = gql ` 
    type PageConfig { 
        pageName: String 
        showBanner: Boolean
    }

    type OptionalText { 
        show: Boolean 
        text: TextContent
    }
    type OptionalSingleStr { 
        show: Boolean 
        body: String
    }

    type PageNotWorkingBanner { 
        title: OptionalText
        centeredText: OptionalText
        body: OptionalText
        link: OptionalSingleStr
        showContacts: Boolean
    }

    type Query { 
        GetPageConfig(pageName: String): PageConfig
        GetPageNotWorkingBanner: PageNotWorkingBanner
    }

    type Mutation { 
        EditPageConfig(pageName: String, newConfig: PageConfigInput): String
        EditPageNotWorkingBanner(newBanner: PageNotWorkingBannerInput): String
        AddPageConfig(newPageConfig: PageConfigInput) : String
        AddPageNotWorkingBanner(newBanner: PageNotWorkingBannerInput) : String
    }

    input PageConfigInput { 
        pageName: String 
        showBanner: Boolean
    }

    input OptionalTextInput { 
        show: Boolean 
        text: TextContentInput
    }
    input OptionalSingleStrInput { 
        show: Boolean 
        body: String
    }
    input PageNotWorkingBannerInput { 
        title: OptionalTextInput
        centeredText: OptionalTextInput
        body: OptionalTextInput
        link: OptionalSingleStrInput
        showContacts: Boolean
    }
`