module.exports = {
    components: {
        schemas: {
            // id model
            id: {
                type: "number", // data type
                description: "An id of a model", // desc
                example: 2, // example of an id
            },
            User: {
                type: "object", // data type
                properties: {
                    user_id: {
                        type: "number", // data-type
                        description: "User identification number", // desc
                        example: "23", // example of an id
                    },
                    fullname: {
                        type: "string", // data-type
                        description: "User's fullname", // desc
                        example: "John Doe", // example of a title
                    },
                    email: {
                        type: "string", // data-type
                        description: "User's email", // desc
                        example: "johndoe@email.com", // example of a title
                    },
                    roles: {
                        type: "array", // data-type
                        items: {
                            type: "string",
                            enum: ["admin", "seeker"],
                            default: "seeker",
                        },
                        description: "User's roles", // desc
                        example: ["admin"], // example of a title
                    },
                    username: {
                        type: "string", // data-type
                        description: "User's username", // desc
                        example: "JohnD", // example of a title
                    },
                    address: {
                        type: "string", // data type
                        description: "User's shipping address", // desc
                        example: "317  Lang Avenue", // example of a completed value
                    },
                    city: {
                        type: "string", // data type
                        description: "User's address city", // desc
                        example: "Portage", // example of a completed value
                    },
                    state: {
                        type: "string", // data type
                        description: "State name", // desc
                        example: "Utah", // example of a completed value
                    },
                    country: {
                        type: "string", // data type
                        description: "Country name", // desc
                        example: "UK", // example of a completed value
                    },
                },
            },
            UserCreate: {
                type: "object", // data type
                properties: {
                    fullname: {
                        type: "string", // data-type
                        description: "User's fullname", // desc
                        example: "John Doe", // example of a title
                    },
                    email: {
                        type: "string", // data-type
                        description: "User's email", // desc
                        example: "johndoe@email.com", // example of a title
                    },
                    roles: {
                        type: "array", // data-type
                        items: {
                            type: "string",
                            enum: ["admin", "seeker"],
                            default: "seeker",
                        },
                        description: "User's roles", // desc
                        example: ["admin"], // example of a title
                    },
                    username: {
                        type: "string", // data-type
                        description: "User's username", // desc
                        example: "JohnD", // example of a title
                    },
                    password: {
                        type: "string", // data-type
                        description: "User's password", // desc
                        example: "Password123", // example of a title
                    },
                    address: {
                        type: "string", // data type
                        description: "User's shipping address", // desc
                        example: "317  Lang Avenue", // example of a completed value
                    },
                    city: {
                        type: "string", // data type
                        description: "User's address city", // desc
                        example: "Portage", // example of a completed value
                    },
                    state: {
                        type: "string", // data type
                        description: "State name", // desc
                        example: "Utah", // example of a completed value
                    },
                    country: {
                        type: "string", // data type
                        description: "Country name", // desc
                        example: "UK", // example of a completed value
                    },
                },
            },
            UserUpdate: {
                type: "object", // data type
                properties: {
                    fullname: {
                        type: "string", // data-type
                        description: "User's fullname", // desc
                        example: "John Doe", // example of a title
                    },
                    email: {
                        type: "string", // data-type
                        description: "User's email", // desc
                        example: "johndoe@email.com", // example of a title
                    },
                    username: {
                        type: "string", // data-type
                        description: "User's username", // desc
                        example: "JohnD", // example of a title
                    },
                    address: {
                        type: "string", // data type
                        description: "User's shipping address", // desc
                        example: "317  Lang Avenue", // example of a completed value
                    },
                    city: {
                        type: "string", // data type
                        description: "User's address city", // desc
                        example: "Portage", // example of a completed value
                    },
                    state: {
                        type: "string", // data type
                        description: "State name", // desc
                        example: "Utah", // example of a completed value
                    },
                    country: {
                        type: "string", // data type
                        description: "Country name", // desc
                        example: "UK", // example of a completed value
                    },
                },
            },
            // login input model
            LoginInput: {
                type: "object", // data type
                properties: {
                    email: {
                        type: "string", // data type
                        example: "johndoe@email.com", // example of a title
                    },
                    password: {
                        type: "string",
                        example: "^@wra@m+SrNs!lS",
                    },
                },
            },
            LoginResponse: {
                type: "object", // data type
                properties: {
                    token: {
                        type: "string", // data type
                        example:
                            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQsInJvbGVzIjpbImN1c3RvbWVyIl0sImNhcnRfaWQiOjE0LCJpYXQiOjE2MjIyODkwMDksImV4cCI6MTYyMjI4OTA2OX0.Y0XarrAfQVR7we-s5mZvBN3DqcjW08-_QmS1Z0W9bpI", // example of a title
                    },
                    user: {
                        type: "object",
                        properties: {
                            user_id: {
                                type: "integer",
                            },
                            fullname: {
                                type: "string",
                            },
                            username: {
                                type: "string",
                            },
                        },
                    },
                },
            },
            SignupInput: {
                type: "object", // data type
                properties: {
                    email: {
                        type: "string",
                    },
                    fullname: {
                        type: "string",
                    },
                    username: {
                        type: "string",
                    },
                    password: {
                        type: "string",
                    },
                },
            },
            // error model
            Error: {
                type: "object", //data type
                properties: {
                    message: {
                        type: "string", // data type
                        description: "Error message", // desc
                        example: "Not found", // example of an error message
                    },
                    statusCode: {
                        type: "number", // data type
                        description: "Error internal code", // desc
                        example: 500, // example of an error internal code
                    },
                    status: {
                        type: "string",
                        description: "error status",
                        example: "error",
                    },
                },
            },
        },
        securitySchemes: {
            JWT: {
                type: "apiKey",
                name: "auth-token",
                in: "header",
            },
            cookie: {
                type: "apiKey",
                in: "cookie",
                name: "refreshToken",
            },
        },
    },
};
