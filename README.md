<h1 align="center"><img width="50px" align="center" src="https://github.com/gurkanfikretgunak/template_team_app/blob/dev/client/assets/images/logo.png?raw=true" /> Template App - Backend</h1>

This is the backend part of the Template App, which is developed using Node.js and Express.js. The main purpose of this application is to provide a RESTful API for the <a href="https://github.com/gurkanfikretgunak/template_team_app">frontend part</a> of the application, which is built using Flutter.

<nav>
  <h2>Table of Contents</h2>
  <ul>
    <li><a href="#section-1">Folder Structure</a></li>
    <li><a href="#section-2">Technologies Used</a></li>
    <li><a href="#section-3">Run Locally</a></li>
    <li><a href="#section-4">Environment Variables</a></li>
    <li><a href="#section-5">API Endpoints</a></li>
    <li><a href="#section-6">License</a></li>
  </ul>
</nav>
<br/>
<br/>

<section id="section-1">
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

<section id="section-2">
  <h2>Technologies Used</h2>

  <p align="left">
  <a href="https://nodejs.org/en/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/nodejs-colored.svg" width="36" height="36" alt="NodeJS" /></a>
  <a href="https://expressjs.com/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/express-colored.svg" width="36" height="36" alt="Express" /></a>
  <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/mongodb-colored.svg" width="36" height="36" alt="MongoDB" /></a>
  <a target="_blank" href="https://swagger.io/"><img width='36px' src="https://raw.githubusercontent.com/gilbarbara/logos/608007b99fab1d55be5de9f9ec2c75bcc80a438c/logos/swagger.svg" alt="Swagger"/></a>
  <a target="_blank" href="https://redis.com/"><img src="https://img.icons8.com/color/36/null/redis.png" alt="Redis icon by Icons8"/></a>
  <a target="_blank" href="https://socket.io/"><img width='36px' src="https://www.vectorlogo.zone/logos/socketio/socketio-icon.svg" alt="Redis icon by Icons8"/></a>
  <a href="https://git-scm.com/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/git-colored.svg" width="36" height="36" alt="Git" /></a>
</section>
<br/>
<br/>

<section id="section-3">
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
<br/>

<section id="section-4">
  <h2>Environment Variables</h2>

  Fill up the .env.example file with your environment variables. Also, don't forget to remove the `.example` extension from the file name and rename it to just .env before running the application.
</section>
<br/>
<br/>

<section id="section-5">
  <h2>API Endpoints</h2>

  You can access the Swagger documentation for this project by navigating to http://localhost:3000/api-docs in your browser. From there, you can view and test the available API endpoints.
</section>
<br/>
<br/>

<section id="section-6">
  <h2>License</h2>

  [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/) 

  This project is licensed under the MIT License. Feel free to contribute to this project by opening issues and pull requests.
</section>