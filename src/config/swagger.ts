// import swaggerUi from 'swagger-ui-express'
// import swaggerJSDoc from 'swagger-jsdoc'
// import fs from 'fs'
// const swaggerOptions = {
//     swaggerDefinition: {
//         openapi: '3.0.0',
//         info: {
//             title: 'URL Shortener API Documentation',
//             version: '1.0.0',
//             description: 'API documentation using Swagger',
//         },
//         servers: [
//             {
//                 url: `http://localhost:${3000}`,
//             },
//         ],
//    components: {
//      securitySchemes: {
//          bearerAuth: {
//              type: 'http',
//              scheme: 'bearer',
//              bearerFormat: 'JWT', 
//          },
//      },
//  },
//     },
//     apis: ['./src/routes/**/*.ts'], // Path to your API docs
// };
// const swaggerSpec = swaggerJSDoc(swaggerOptions);
// // fs.writeFileSync('./api-docs/swagger-docs.json', JSON.stringify(swaggerSpec, null, 2));
// export { swaggerSpec, swaggerUi };
