import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Discord Swagger API",
      version: "1.0.0",
      description: "API documentation using Swagger",
    },
    tags: [
      {
        name: "Guild",
        description: "Operations related to Guilds",
      },
      {
        name: "Users",
        description: "Operations related to Users",
      },
      {
        name: "Roles",
        description: "Operations related to Roles",
      },
      {
        name: "Channels",
        description: "Operations related to Channels",
      },
    ],
    servers: [
      {
        url: "http://localhost:5000", // Change this if deploying
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
