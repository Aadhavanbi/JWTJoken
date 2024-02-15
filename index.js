require('dotenv').config();
const express = require('express');
const app = express();
const session = require("express-session");
const flash = require('express-flash');
const path = require('path');
const cookieParser = require("cookie-parser");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const SWAGGERENDPOINT =  process.env.SWAGGERENDPOINT;


app.set('views', path.join(__dirname, 'app\\views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'storage/css')));
app.use(cookieParser());
app.use(session({secret: "secret",saveUninitialized: false ,cookie:{ expires:120000 } ,resave: false}));
app.use(flash());
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));


// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'JWt Token Project',
      version: '1.0.0',
      description: 'Documentation for your API',
    },
  },
  // Path to the API specs
  apis: [
    './app/routes/jwt_route.js',
        ],
};


const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use(`/api-docs`, swaggerUI.serve, swaggerUI.setup(swaggerSpec));




const go_home = require('./app/routes/jwt_route.js');
app.use('/',go_home)

const PORT_NUMBER =  process.env.SERVER_PORT;
app.listen({ port: PORT_NUMBER }, async () => {
  console.log(`Server up on http://localhost:${PORT_NUMBER}`)
})

