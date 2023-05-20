const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
      openapi: "3.0.0", // versão da escrita com openapi
      info: {
        title: "Projeto de tasks", 
        version: '1.0', // geralmente a versão do package.json
        description: 'Documentação completa do projeto' // descritivo resumido do projeto,
      },
    },
    servers: [
      {
        url: "http://localhost:3333", 
        description: "Development server",
      }
    ],
    apis: ["./src/routes/*.js", "./src/models/*.js"], // locais do projeto com código swagger
  };

  const swaggerSpec = swaggerJsDoc(options);

  const swaggerDocs = (app, port) => {
    app.use("/docs", swaggerUi.serve);
    app.use("/docs", swaggerUi.setup(swaggerSpec));
  
    app.get("/docs.json", (_, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(swaggerSpec);
    });
    
    console.log(`Documentação localizada em http://localhost:${port}/api/docs/`);
  };
  
  module.exports = {
    swaggerDocs,
  };