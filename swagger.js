const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Senior Project',
    description: 'Manage user and finance data',
  },
  host: 'localhost:8080',
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);