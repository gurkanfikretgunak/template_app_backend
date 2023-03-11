const swaggerAutogen = require('swagger-autogen')();

const outputFile = './openapi.json';
const endpointsFiles = ['./routes/v1/index.js'];

const swaggerOptions = {
  info: {
    title: 'Template App',
    description: 'The Template App API enables users and shops to interact with each other through a variety of endpoints. \n\n- Users can browse shops, view shop details and services, make reservations, and rate shops. \n- Shops can create an account for their shop, add services, create reservation plans, and more. \n\nThis API provides users and shops with a way to connect and engage with each other. It is designed to be simple, user-friendly, and efficient.\n',
    version: '1.0.0'
  },
  host: 'localhost:3000',
  basePath: '/api/v1',
};

const watchOptions = {
  watch: true,
  swaggerOptions,
};

swaggerAutogen(outputFile, endpointsFiles, watchOptions);
