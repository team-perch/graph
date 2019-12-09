/* eslint-disable no-console */
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yourpassword',
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
    // Price.findAll({where: {property_id: 1}}).then((data)=>{
    //   console.log('MODEL' + data)
    //   callback(null, data)
    // })
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
    connection.query(`select group_id from houses where houses.property_id = ${info}`, (error, data) => {
      if (error) {
        callback(error, null);
      } else {
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