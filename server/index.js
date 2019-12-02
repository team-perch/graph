const express = require('express');

const app = express();
const port = 3000;
const path = require('path');
const Controller = require('./controller.js')

app.use('/',express.static(path.join(__dirname, '../public')));

app.use('/:houseId',express.static(path.join(__dirname, '../public')));

app.get('/:houseId', (req, res)=> {
  Controller.getgraph(req, res)
})
app.get('/api/estimates/pricing/:houseId', (req, res)=> {
  console.log(req.params.houseId)
  Controller.getgraph(req, res)
})

// app.use(`${window.location.pathname}`)

app.listen(port, () => console.log(`Listening in on port: ${port}`));
