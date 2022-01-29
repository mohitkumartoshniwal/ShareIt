export default {
    title: "Pin",
    name: "pin",
    type: "document",
    fields: [
        {
            title: "Title",
            name: "title",
            type: "string",
        },
        {
            title: "About",
            name: "about",
            type: "string",
        },
        {
            title: "Destination",
            name: "destination",
            type: "url",
        },
        {
            title: "Category",
            name: "category",
            type: "string",
        },
        {
            title: "Image",
            name: "image",
            type: "image",
            options: {
                hotspot: true // <-- Defaults to false
            },
        },
        {
            title: "UserId",
            name: "userId",
            type: "string",
        },
        {
            title: "PostedBy",
            name: "postedBy",
            type: "postedBy", // another doc
        },
        {
            title: "Save",
            name: "save",
            type: "array",
            of: [{ type: 'save' }]
        },
        {
            title: "Comments",
            name: "comments",
            type: "array",
            of: [{ type: 'comment' }]
        }

    ]
}