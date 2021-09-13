const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser");
const { Sequelize } = require('sequelize');
//const router = require('./app/router.js');
const app = express();
const route = require("./API/routes.js");

const sequelize = new Sequelize('BusBooking', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }


const db = require("./models");
const Op = db.Sequelize.Op;
db.sequelize.sync();




let corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/', route);


const PORT = process.env.PORT || 8080 ;
app.listen(PORT,() => {
  console.log(`Server is running on port ${PORT}.`);
})


