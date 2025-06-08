import dotenv from "dotenv"
dotenv.config();

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "HRMS",
      version: "1.0.0",
      description: "AI Driven Human Resource Management System",
    },
    servers: [
      {
        url: process.env.SERVER_URL,
      },
    ],
  },
  apis: ["./routes/*.js"], 
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
