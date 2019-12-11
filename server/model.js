/* eslint-disable no-console */
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'database',
  user: 'user',
  password: 'user',
  database: 'fec_estimate',
});

connection.connect((err) => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
  }
});

module.exports = {
  connection,
  getgraph: (callback, id) => {
    const info = id.houseId;
    connection.query(`select * from prices where prices.property_id = ${info}`, (error, data) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, data);
      }
    });
  },
  getrecentsales: (callback, id) => {
    const info = id.houseId;
    console.log(info);
    connection.query(`select group_id from houses where houses.property_id = ${info}`, (error, data) => {
      if (error) {
        callback(error, null);
      } else {
        console.log(data, 'models');
        const groupid = data[0].group_id;
        connection.query(`select * from houses where houses.group_id = ${groupid}`, (err, result) => {
          if (err) {
            callback(err, null);
          } else {
            callback(null, result);
          }
        });
      }
    });
  },
  getzip: (callback, id) => {
    const info = id.houseId;
    connection.query(`select zipcode from groups where groups.group_id = ${info}`, (error, data) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, data);
      }
    });
  },
  gethouseinfo: (callback, id) => {
    const info = id.houseId;
    connection.query(`select * from houses where houses.property_id = ${info}`, (error, data) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, data);
      }
    });
  },
};
