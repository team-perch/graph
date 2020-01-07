const express = require('express');
const cors = require('cors');

const app = express();
const path = require('path');
const compression = require('compression');
const Controller = require('./controller.js');

app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());
app.use(compression());

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

// Route path: /flights/:from-:to
// Request URL: http://localhost:3000/flights/LAX-SFO
// req.params: { "from": "LAX", "to": "SFO" }

app.post('/api/estimates/pricing/:houseId-:dateId-:priceAmount', (req, res) => {
  Controller.postgraph(req, res);
});

app.put('/api/estimates/pricing/:houseId-:dateId-:priceAmount', (req, res) => {
  Controller.putgraph(req, res);
});

app.delete('/api/estimates/pricing/:houseId-:dateId', (req, res) => {
  Controller.deletegraph(req, res);
});

// app.use(`${window.location.pathname}`)
module.exports = app;
