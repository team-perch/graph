const express = require('express');
const cors = require('cors');

const app = express();
const path = require('path');
const Controller = require('./controller.js');

app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());

app.get('/api/estimates/pricing/:houseId', (req, res) => {
  Controller.getgraph(req, res);
});

app.get('/api/estimates/recentsales/:houseId', (req, res) => {
  Controller.getrecentsales(req, res);
});

app.get('/api/estimates/zipcode/:houseId', (req, res) => {
  Controller.getzip(req, res);
});

app.get('/api/estimates/houseinfo/:houseId', (req, res) => {
  Controller.gethouseinfo(req, res);
});
// app.use(`${window.location.pathname}`)
module.exports = app;
