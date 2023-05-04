<h1 align="center"><img width="50px" align="center" src="https://github.com/gurkanfikretgunak/template_team_app/blob/dev/client/assets/images/logo.png?raw=true" /> Template App - Backend</h1>

This is the backend part of the Template App, which is developed using Node.js and Express.js. The main purpose of this application is to provide a RESTful API for the <a href="https://github.com/gurkanfikretgunak/template_team_app">frontend part</a> of the application, which is built using Flutter.

<nav>
  <h2>Table of Contents</h2>
  <ul>
    <li><a href="#section-1">Features</a></li>
    <li><a href="#section-2">Folder Structure</a></li>
    <li><a href="#section-3">Folder/File Explanations</a></li>
    <li><a href="#section-4">Technologies Used</a></li>
    <li><a href="#section-5">Run Locally</a></li>
    <li><a href="#section-6">Environment Variables</a></li>
    <li><a href="#section-7">API Endpoints</a></li>
    <li><a href="#section-8">npm Packages</a></li>
    <li><a href="#section-9">License</a></li>
  </ul>
</nav>
<br/>
<br/>

<section id="section-1">
  <h2>Features</h2>

  - JWT authentication
  - Passport.js authentication
  - Redis token storage
  - Containerization using Docker
  - Swagger API documentation generation
  - MongoDB database connection handling
  - Error handling
  - Dynamic pagination
  - File upload handling
  - Request validation
  - Cloud storage integration
  - Email sending handling
  - WebSocket communication handling
  - API response formatting
  - Request body schema

  <br/>

  <h2>API Features</h2>

  - Authentication
    - Register a new user
    - Verify a user's account
    - User login
    - User social media login
    - Refresh an access token
    - User logout
  - Shop
    - Add a shop to favorites
    - Remove a shop from favorites
    - Get shop details
    - Get services by type
    - Search for shops
    - Get shop coupons
    - Search for a coupon code
    - Rate a shop
    - Update a rating
    - Remove a rating
    - Search for all shops
    - Get shops by service type
    - Search with filters

  <aside>ℹ️ search endpoints also includes locational search</aside>

  - User
    - Update user information
    - Update user password
    - Add an address
    - Delete an address
    - Get user addresses
    - Add a payment card
    - Delete a payment card
    - Get user payment cards
    - Get user notifications
    - Get user favorite shops
    - Get home information
  - Reservation (in progress)
</section>
<br/>
<br/>

<section id="section-2">
    <h2>Folder Structure</h2>

   ```
    📂 config
      📄 config.js
      📄 mongoose.js
      📄 passport.js
      📄 redis.js

    📂 controllers
      📄 auth.controller.js
      📄 shop.controller.js
      📄 user.controller.js

    📂 healthcheck
      📄 healthcheck.js

    📂 helpers
      📄 helper.js
      📄 jwt.js
      📄 mailer.js

    📂 middlewares
      📄 authenticate.js
      📄 errorHandler.js
      📄 pagination.js  
      📄 uploadMedia.js  
      📄 validate.js

    📂 models
      📄 address.model.js
      📄 coupon.model.js
      📄 notification.model.js 
      📄 offeredService.model.js
      📄 payment.model.js 
      📄 rating.model.js
      📄 reservation.model.js
      📄 servicePackage.model.js
      📄 serviceType.model.js
      📄 shop.model.js
      📄 user.model.js

    📂 routes
      📂 v1
          📄 auth.routes.js
          📄 index.js
          📄 shop.routes.js
          📄 user.routes.js
      📄 index.js

    📂 services
      📄 cloudinary.js
      📄 error.js

    📂 utils
      📄 apiResponse.js
      📄 socket.js

    📂 validations
      📄 auth.schema.js
      📄 shop.schema.js
      📄 user.schema.js

    📄 .env
    📄 docker-compose.yaml
    📄 Dockerfile
    📄 openapi.json
    📄 server.js
    📄 swagger.js
   ```

</section>
<br/>
<br/>

<section id="section-3">
  <h2>Folder/File Explanations</h2>

  **📂 config** This folder contains configuration files for the application, including 
  
  1. **📄 config.js**, which sets up environment variables and loads other configuration files, 
  2. **📄 mongoose.js** for connecting to a MongoDB database, 
  3. **📄 passport.js** for authentication using the Passport.js library,
  4. **📄 redis.js** for connecting to a Redis server.

  **📂 controllers** This folder contains controller files, which handle incoming requests and send back responses.

  **📂 healthcheck** This folder contains a single file named healthcheck.js, which is responsible for checking the health of the application and returning a response indicating whether the application is running properly.

  **📂 helpers** This folder contains helper files, which contain utility functions that are used throughout the application. There are three helper files in this folder: 
  
  1. **📄 helper.js**, which contains general-purpose utility functions, 
  2. **📄 jwt.js**, which handles JWT (JSON Web Token) authentication, 
  3. **📄 mailer.js**, which handles sending emails.

  **📂 middlewares** This folder contains middleware files, which are functions that can modify the request or response objects or terminate the request-response cycle. There are five middleware files in this folder: 
  
  1. **📄 authenticate.js**, which handles authentication middleware, 
  2. **📄 errorHandler.js**, which handles error handling middleware, 
  3. **📄 pagination.js**, which handles pagination middleware, 
  4. **📄 uploadMedia.js**, which handles multer media upload middleware, 
  5. **📄 validate.js**, which handles request validation middleware.

  **📂 models** This folder contains model files, which define the structure and behavior of data stored in a database.

  **📂 routes** This folder contains route files, which define the application's API routes and their associated controller functions. There are two files in this folder:
  
  1. **📄 index.js**, which imports and exports all route files, 
  2. **📂 v1**, which is a subfolder containing route files for version 1 of the API. These files include v1 routes.

  **📂 services** This folder contains service files, which contain code that is responsible for interacting with external services or APIs. There are two service files in this folder: 
  
  1. **📄 cloudinary.js**, which handles media storage using the Cloudinary service,
  2. **📄 error.js**, which handles error response.

  **📂 utils** This folder contains utility files, which contain miscellaneous utility functions. There are two utility files in this folder: 

  1. **📄 apiResponse.js**, which handles API response formatting,
  2. **📄 socket.js**, which handles WebSocket communication.

  **📂 validations** This folder contains schema files, which define the schema for request body validations.

  **📄 .env** This file contains environment variables used by the application, such as database connection strings and API keys.

  **📄 docker-compose.yaml** This file defines the services that are needed to run the application using Docker Compose.

  **📄 Dockerfile** This file defines the Docker image that the application runs on.

  **📄 openapi.json** This file contains an OpenAPI API Specification document, which defines the API endpoints and their associated parameters and responses.

  **📄 server.js** This file contains the main code for the application, including setting up the Express.js server and connecting to the database and other services.

  **📄 swagger.js** This file generates a Swagger UI documentation page based on the OpenAPI Specification document.

</section>
<br/>
<br/>

<section id="section-4">
  <h2>Technologies Used</h2>

  <p align="left">
    <h3>
      <a href="https://nodejs.org/en/" target="_blank" rel="noreferrer" align="center">
        <img align="center" src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/nodejs-colored.svg" width="36" height="36" alt="NodeJS" />     
      </a>
      Node.js  
    </h3>
    <br/>

  - A JavaScript runtime. It allows developers to run JavaScript code outside of a web browser. 
  - To install Node.js, go to the official Node.js website, download the installer for your operating system, and follow the installation instructions.
  
  <br/>

  <h3>
    <a href="https://expressjs.com/" target="_blank" rel="noreferrer" align="center">
      <img align="center" src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/express-colored.svg" width="36" height="36" alt="Express" />     
    </a>
    Express.js  
  </h3>
  <br/>

  - A popular Node.js framework for building web applications and APIs. It provides a robust set of features for handling HTTP requests, routing, and middleware. 
  - To install Express.js, open a terminal window, navigate to your project directory, and run the following command: `npm install express`.
  
  <br/>

  <h3>
    <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer" align="center">
      <img align="center" src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/mongodb-colored.svg" width="36" height="36" alt="MongoDB" />
    </a>
    MongoDB 
  </h3>
  <br/>

  - A popular NoSQL document-oriented database that stores data in JSON-like documents. 
  - To install MongoDB, go to the official MongoDB website, download the installer for your operating system, and follow the installation instructions.
  
  <br/>

  <h3>
    <a href="https://swagger.io/" target="_blank" rel="noreferrer" align="center">
      <img align="center" width='36px' src="https://raw.githubusercontent.com/gilbarbara/logos/608007b99fab1d55be5de9f9ec2c75bcc80a438c/logos/swagger.svg" alt="Swagger" />
    </a>
    Swagger 
  </h3>
  <br/>

  - A tool for documenting and testing APIs using the OpenAPI Specification. 
  - To install Swagger, you can use the npm package swagger-ui-express. Run the following command in your terminal: `npm install swagger-ui-express`.
  
  <br/>

  <h3>
    <a href="https://redis.com/" target="_blank" rel="noreferrer" align="center">
      <img align="center" src="https://img.icons8.com/color/36/null/redis.png" alt="Redis icon by Icons8"/>
    </a>
    Redis 
  </h3>
  <br/>

  - An in-memory data store that can be used as a database, cache, and message broker. 
  - To install Redis, go to the official Redis website, download the installer for your operating system, and follow the installation instructions.
  
  <br/>

  <h3>
    <a href="https://socket.io/" target="_blank" rel="noreferrer" align="center">
      <img align="center" width='36px' src="https://www.vectorlogo.zone/logos/socketio/socketio-icon.svg" alt="Socket.io"/></a>
    </a>
    Socket.io 
  </h3>
  <br/>

  - A JavaScript library that enables real-time, bidirectional communication between clients and servers. 
  - To install Socket.IO, run the following command in your terminal: `npm install socket.io`.
  
  <br/>

  <h3>
    <a href="https://git-scm.com/" target="_blank" rel="noreferrer" align="center">
      <img align="center" src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/git-colored.svg" width="36" height="36" alt="Git" />
    </a>
    Git 
  </h3>
  <br/>

  - A distributed version control system for tracking changes in source code during software development. 
  - To install Git, go to the official Git website, download the installer for your operating system, and follow the installation instructions.
  
  <br/>

</section>
<br/>

<section id="section-5">
  <h2>Run Locally</h2>

  Clone the project using the following command in your terminal:

  ~~~bash  
    git clone https://github.com/gurkanfikretgunak/template_app_backend.git
  ~~~

  Navigate to the project directory:

  ~~~bash  
    cd template_app_backend
  ~~~

  Install the dependencies using the following command:

  ~~~bash  
    npm install
  ~~~

  Start the server using the following command:

  ~~~bash  
    npm start
  ~~~

  <aside>⚠️ You need to have Redis installed and running on your machine to use this project. If you don't have Redis installed, you can run the official Redis Docker image to get started.</aside>
  <br/>

  Alternatively, you can run the server using Docker by running the following command:

  Navigate to the project directory:

  ~~~bash  
    cd template_app_backend
  ~~~

  ~~~bash  
    docker-compose up -d --build
  ~~~

  This will build the Docker image and start the container for the application. You can then access the application by navigating to http://localhost:3000/api in your web browser.
</section>
<br/>

<section id="section-6">
  <h2>Environment Variables</h2>

  Fill up the .env.example file with your environment variables. Also, don't forget to remove the `.example` extension from the file name and rename it to just .env before running the application.

  ⚠️ If you are running this project on your local machine, set the `REDIS_HOST` environment variable to `127.0.0.1`. If you are running it on a Docker container, set the `REDIS_HOST` environment variable to `redis`.
</section>
<br/>

<section id="section-7">
  <h2>API Endpoints</h2>

  You can access the Swagger documentation for this project by navigating to http://localhost:3000/api-docs in your browser. From there, you can view and test the available API endpoints.
</section>
<br/>

<section id="section-8">
  <h2>npm Packages</h2>

  | Package Name           | Version      | Link                                                |
  | ----------------------| -------------| --------------------------------------------------- |
  | bcrypt-nodejs (will switch to bcrypt or bcryptjs soon)       | ^0.0.3       | [npm](https://www.npmjs.com/package/bcrypt-nodejs)   |
  | body-parser            | ^1.20.2      | [npm](https://www.npmjs.com/package/body-parser)     |
  | cloudinary             | ^1.35.0      | [npm](https://www.npmjs.com/package/cloudinary)      |
  | cors                   | ^2.8.5       | [npm](https://www.npmjs.com/package/cors)            |
  | dotenv                 | ^16.0.3      | [npm](https://www.npmjs.com/package/dotenv)          |
  | express                | ^4.18.2      | [npm](https://www.npmjs.com/package/express)         |
  | helmet                 | ^6.0.1       | [npm](https://www.npmjs.com/package/helmet)          |
  | http                   | ^0.0.1-security | [npm](https://www.npmjs.com/package/http)          |
  | joi                    | ^17.8.3      | [npm](https://www.npmjs.com/package/joi)             |
  | jsonwebtoken           | ^9.0.0       | [npm](https://www.npmjs.com/package/jsonwebtoken)    |
  | mongoose               | ^7.0.0       | [npm](https://www.npmjs.com/package/mongoose)        |
  | multer                 | ^1.4.5-lts.1 | [npm](https://www.npmjs.com/package/multer)          |
  | nodemailer             | ^6.9.1       | [npm](https://www.npmjs.com/package/nodemailer)      |
  | passport               | ^0.6.0       | [npm](https://www.npmjs.com/package/passport)        |
  | passport-facebook     | ^3.0.0       | [npm](https://www.npmjs.com/package/passport-facebook)|
  | passport-google-oauth20| ^2.0.0       | [npm](https://www.npmjs.com/package/passport-google-oauth20)|
  | passport-twitter      | ^0.1.5       | [npm](https://www.npmjs.com/package/passport-twitter)|
  | redis                  | ^3.1.2       | [npm](https://www.npmjs.com/package/redis)           |
  | socket.io              | ^4.6.1       | [npm](https://www.npmjs.com/package/socket.io)       |
  | swagger-autogen        | ^2.23.1      | [npm](https://www.npmjs.com/package/swagger-autogen) |
  | swagger-ui-express     | ^4.6.2       | [npm](https://www.npmjs.com/package/swagger-ui-express)|

</section>
<br/>

<section id="section-9">
  <h2>License</h2>

  [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/) 

  This project is licensed under the MIT License. Feel free to contribute to this project by opening issues and pull requests.
</section>