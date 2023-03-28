require('dotenv').config();

// PACKAGES
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

require('./config/mongoose');
const ApiRoutes = require('./routes');
const swaggerDocument = require('./openapi.json');
const passport = require('./config/passport');

const app = express();
const httpServer = http.createServer(app);

// middlewares
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(passport.initialize());

// routes
app.use(`/api`, ApiRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const PORT = process.env.PORT || 3000

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})