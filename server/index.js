const express = require('express');

const app = express();
const port = 3000;
const path = require('path');
const Controller = require('./controller.js')

app.use('/', express.static(path.join(__dirname, '../public')));
app.get('/api/estimates/pricing', (req, res)=> {
  Controller.getgraph(req, res)
})

app.listen(port, () => console.log(`Listening in on port: ${port}`));
