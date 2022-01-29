export default {
    // This is the display name for the type
    title: "User",

    // The identifier for this document type used in the api's
    name: "user",

    // Documents have the type 'document'. Your schema may describe types beyond documents
    // but let's get back to that later.
    type: "document",

    // Now we proceed to list the fields of our document
    fields: [
        // This document has only one field
        {
            // The display name for this field
            title: "UserName",

            // The identifier for this field used in the api's
            name: "userName",

            // The type of this field
            type: "string",
        },
        {
            title: "Image",
            name: "image",
            type: "string",
        },
    ]
}