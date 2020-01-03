/* eslint-disable no-console */
require('newrelic');
const app = require('./index.js');

app.listen(3002, () => console.log('Listening in on port: 3002'));
