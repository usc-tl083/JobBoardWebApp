module.exports = {
    components: {
        schemas: {
            // id model
            id: {
                type: "number", // data type
                description: "An id of a model", // desc
                example: 2, // example of an id
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
