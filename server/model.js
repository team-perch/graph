/* eslint-disable no-console */
// const mysql = require('mysql');
const { Pool } = require('pg');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'user',
//   password: 'password',
//   database: 'estimate',
// });
const pool = new Pool({
  user: 'impeter9',
  host: 'localhost',
  database: 'perch_graph',
  port: 5432,
});

// connection.connect((err) => {
//   if (err) {
//     console.error(`error connecting: ${err.stack}`);
//   }
// });

module.exports = {
  pool,
  getgraph: (callback, id) => {
    const info = id.houseId;

    // connection.query(`select * from prices where prices.property_id = ${info}`, (error, data) => {
    pool.query(`select * from prices where property_id = ${info}`, (error, data) => {
      if (error) {
        callback(error, null);
      } else {
        console.log(data.rows);
        callback(null, data.rows);
      }
    });
  },
  getrecentsales: (callback, id) => {
    const info = id.houseId;
    // connection.query(`select group_id from houses where houses.property_id = ${info}`, (error, data) => {
    pool.query(`select group_id from houses where property_id = ${info}`, (error, data) => {
      if (error) {
        callback(error, null);
      } else {
        // const groupid = data[0].group_id;
        const groupid = data.rows[0].group_id;
        // connection.query(`select * from houses where houses.group_id = ${groupid}`, (err, result) => {
        pool.query(`select * from houses where group_id = ${groupid} limit 10`, (err, result) => {
          if (err) {
            callback(err, null);
          } else {
            callback(null, result.rows);
          }
        });
      }
    });
  },
  getzip: (callback, id) => {
    const info = id.houseId;
    // connection.query(`select zipcode from groups where groups.group_id = ${info}`, (error, data) => {
    pool.query(`select zipcode from groups where group_id = ${info}`, (error, data) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, data.rows);
      }
    });
  },
  gethouseinfo: (callback, id) => {
    const info = id.houseId;
    // connection.query(`select * from houses where houses.property_id = ${info}`, (error, data) => {
    pool.query(`select * from houses where property_id = ${info}`, (error, data) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, data.rows);
      }
    });
  },
  postgraph: (callback, id) => {
    const info = id.houseId;
    // const date = id.dateId;
    const price = id.price;
    // connection.query(`insert into prices (id, price, month_year) values (${info},'price',${date})`)
    // connection.query(`select * from prices where prices.property_id = ${info}`, (error, data) => {
    pool.query(`select date_id from prices where property_id = ${info} order by date_id desc limit 1`, (error, data) => {
      if (error) {
        throw error;
      } else {
        const date = data.rows[0].date_id + 1;
        pool.query(`select month_year from dates where date_id = ${data.rows[0].date_id}`, (error, data) => {
          if (error) {
            callback(error, null);
          } else {
            const oldDate = new Date(data.rows[0].month_year);
            const newDate = new Date(oldDate.setMonth(oldDate.getMonth() + 1));
            const month = newDate.getUTCMonth() + 1;
            const day = newDate.getUTCDate();
            const year = newDate.getUTCFullYear();
            const newdate = year + "/" + month + "/" + day;
            pool.query(`insert into dates(month_year) values(${newdate})`, (error) => {
              if (error) {
                callback(error, null);
              } else {
                pool.query(`insert into prices(property_id, price, date_id) values(${info}, ${price}, ${date})`, (error, data) => {
                  if (error) {
                    callback(error, null);
                  } else {
                    callback(null, data.rows);
                  }
                });
              }
            });
          }
        });
      }
    });
    // pool.query(`insert into prices(property_id, price, date_id) values(${info}, ${price}, ${date})`, (error, data) => {
    //   if (error) {
    //     callback(error, null);
    //   } else {
    //     callback(null, data);
    //   }
    // });
  },
  putgraph: (callback, id) => {
    const info = id.houseId;
    const date = id.dateId;
    const price = id.price;
    // connection.query(`update prices set price = 'price' where id = ${info} and month_year = ${date}`)
    // connection.query(`select * from prices where prices.property_id = ${info}`, (error, data) => {
    pool.query(`update prices set price = ${price} where (property_id = ${info} AND date_id = ${date})`, (error, data) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, data.rows);
      }
    });
  },
  deletegraph: (callback, id) => {
    const info = id.houseId;
    const date = id.dateId;
    // connection.query(`delete from prices where id = ${info} and month_year = ${date}`)
    // connection.query(`select * from prices where prices.property_id = ${info}`, (error, data) => {
    pool.query(`delete from prices where (property_id = ${info} AND date_id = ${date})`, (error, data) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, data.rows);
      }
    });
  },
};
