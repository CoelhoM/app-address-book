require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const addressRoutes = require('./app/routes/address.routes');
const onMongoConnect = require('./database');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

addressRoutes(app);

onMongoConnect(() => {
  app.listen('4567', () => {
    console.log('server is running');
  });
});