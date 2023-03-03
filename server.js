require('dotenv').config();

// PACKAGES
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

require('./config/mongoose');
const ApiRoutes = require('./routes');



const app = express();
const httpServer = http.createServer(app);

// middlewares
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

// routes
app.use(`/api`, ApiRoutes);


const PORT = process.env.PORT || 3000

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})