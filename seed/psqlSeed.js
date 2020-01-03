const faker = require('faker');
const fs = require('fs');
const { Pool } = require('pg');
const cities = require('./cities.js');
const monthYearList = require('./monthyear.js');

const pool = new Pool({
  user: 'impeter9',
  host: 'localhost',
  database: 'perch_graph',
  port: 5432,
});

const start = Date.now();

function createZip() {
  let string = '';
  for (let i = 90001; i <= 96162; i += 1) {
    string += i;
    string += '\n';
  }
  return string;
}
fs.writeFile('./seed/csv/zips.csv', createZip(), (err) => {
  if (err) {
    throw err;
  }
  pool.query("COPY groups(zipcode) FROM '/Users/impeter9/Documents/graph/seed/csv/zips.csv' DELIMITER '|'");
});

function createDates() {
  let string = '';
  for (let i = 0; i < 60; i += 1) {
    string += monthYearList[i];
    string += '\n';
  }
  return string;
}
fs.writeFile('./seed/csv/dates.csv', createDates(), (err) => {
  if (err) {
    throw err;
  }
  pool.query("COPY dates(month_year) FROM '/Users/impeter9/Documents/graph/seed/csv/dates.csv' DELIMITER '|'");
});

function createHouse(num) {
  let house = '';
  for (let i = num; i <= num + 999999; i += 1) {
    house += `https://perch-graph.s3-us-west-1.amazonaws.com/Img${Math.floor(Math.random() * (898 - 1 + 1)) + 1}.jpg`;
    house += '|';
    house += `${Math.round(Math.random())}|`;
    house += `${Math.floor(Math.random() * (5 - 1 + 1)) + 1}|`;
    house += `${Math.floor(Math.random() * (5 - 1 + 1)) + 1}|`;
    house += `${Math.ceil((Math.floor(Math.random() * (1400000 - 800000 + 1)) + 800000) / 1000) * 1000}|`;
    house += `${faker.address.streetAddress()}|`;
    house += `${cities[Math.floor(Math.random() * (482))]}, CA`;
    house += '|';
    house += `${Math.ceil(Math.random() * 60 + 70) * 10}|`;
    house += `${JSON.stringify(faker.date.between('2000-01-01', '2019-12-01')).substring(1, 11)}|`;
    house += (Math.floor(Math.random() * (6162 - 1 + 1)) + 1);
    house += '\n';
  }
  return house;
}

function createPrice(num) {
  let price = '';
  for (let i = num; i <= num + 499999; i += 1) {
    for (let j = 1; j <= 60; j += 1) {
      price += `${i}|`;
      price += Math.ceil(Math.random() * 500 + 700) * 1000;
      price += `|${j}`;
      price += '\n';
    }
  }
  return price;
}

fs.writeFile('./seed/csv/houses.csv', createHouse(1), (err) => {
  if (err) {
    throw err;
  }
  pool.query("COPY houses(imgurl, rating, bed, bath, price, address1, address2, sq_ft, sold_date, group_id) FROM '/Users/impeter9/Documents/graph/seed/csv/houses.csv' DELIMITER '|'", (err) => {
    if (err) {
      throw err;
    }
    fs.writeFile('./seed/csv/houses.csv', createHouse(1000001), (err) => {
      if (err) {
        throw err;
      }
      pool.query("COPY houses(imgurl, rating, bed, bath, price, address1, address2, sq_ft, sold_date, group_id) FROM '/Users/impeter9/Documents/graph/seed/csv/houses.csv' DELIMITER '|'", (err) => {
        if (err) {
          throw err;
        }
        console.log(Math.round((Date.now() - start) / 1000), 's');
        console.log('Houses finished');
        fs.writeFile('./seed/csv/prices.csv', createPrice(1), (err) => {
          if (err) {
            throw err;
          }
          pool.query("COPY prices(property_id, price, date_id) FROM '/Users/impeter9/Documents/graph/seed/csv/prices.csv' DELIMITER '|'", (err) => {
            if (err) {
              throw err;
            }
            console.log('First price batch:', Math.round((Date.now() - start) / 1000), 's');
            fs.writeFile('./seed/csv/prices.csv', createPrice(500001), (err) => {
              if (err) {
                throw err;
              }
              pool.query("COPY prices(property_id, price, date_id) FROM '/Users/impeter9/Documents/graph/seed/csv/prices.csv' DELIMITER '|'", (err) => {
                if (err) {
                  throw err;
                }
                console.log('Second price batch:', Math.round((Date.now() - start) / 1000), 's');
                fs.writeFile('./seed/csv/prices.csv', createPrice(1000001), (err) => {
                  if (err) {
                    throw err;
                  }
                  pool.query("COPY prices(property_id, price, date_id) FROM '/Users/impeter9/Documents/graph/seed/csv/prices.csv' DELIMITER '|'", (err) => {
                    if (err) {
                      throw err;
                    }
                    console.log('Third price batch:', Math.round((Date.now() - start) / 1000), 's');
                    fs.writeFile('./seed/csv/prices.csv', createPrice(1500001), (err) => {
                      if (err) {
                        throw err;
                      }
                      pool.query("COPY prices(property_id, price, date_id) FROM '/Users/impeter9/Documents/graph/seed/csv/prices.csv' DELIMITER '|'", (err) => {
                        if (err) {
                          throw err;
                        }
                        console.log('Last price batch:', Math.round((Date.now() - start) / 1000), 's');
                        console.log('Seeding complete');
                        pool.end().then(() => console.log('pool has ended'));
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});

// Execute this file from the command line by typing:
//   node --max-old-space-size=8192 ./seed/psqlSeed.js;
// to seed the postgres database.
