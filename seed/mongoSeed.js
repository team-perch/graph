/*eslint-disable */
const mongo = require('mongodb').MongoClient;
const faker = require('faker');
const cities = require('./cities.js');
const monthYearList = require('./monthyear.js');

const url = 'mongodb://127.0.0.1:27017';
const start = Date.now();

mongo.connect(url, (err, client) => {
  if (err) {
    throw err;
  }
  console.log('Connected');
  const db = client.db('perch_graph');
  const houses = db.collection('houses');
  function generatePrices() {
    const priceObj = {};
    for (let i = 0; i < monthYearList.length; i += 1) {
      priceObj[monthYearList[i]] = Math.ceil(Math.random() * 500 + 700) * 1000;
    }
    return priceObj;
  }
  function generateHouses(num) {
    const houseArr = [];
    for (let i = num; i <= num + 399999; i += 1) {
      houseArr.push({
        _id: i,
        imgurl: `https://perch-graph.s3-us-west-1.amazonaws.com/Img${Math.floor(Math.random() * (898 - 1 + 1)) + 1}.jpg`,
        rating: Math.round(Math.random()),
        bed: Math.floor(Math.random() * (5 - 1 + 1)) + 1,
        bath: Math.floor(Math.random() * (5 - 1 + 1)) + 1,
        sold_price: Math.ceil((Math.floor(Math.random() * (1400000 - 800000 + 1)) + 800000) / 1000) * 1000,
        address1: faker.address.streetAddress(),
        address2: `${cities[Math.floor(Math.random() * (482))]}, CA`,
        sq_ft: Math.ceil(Math.random() * 60 + 70) * 10,
        sold_date: `${JSON.stringify(faker.date.between('2000-01-01', '2019-12-01')).substring(1, 11)}`,
        zipcode: Math.floor(Math.random() * (6162 - 1 + 1)) + 1,
        price: generatePrices(),
      });
    }
    return houseArr;
  }
  let houseArr = generateHouses(1);
  houses.insertMany(houseArr, (err) => {
    if (err) {
      throw err;
    }
    console.log('First batch:', Math.round((Date.now() - start) / 1000), 's');
    houseArr = generateHouses(400001);
    houses.insertMany(houseArr, (err) => {
      if (err) {
        throw err;
      }
      console.log('Second batch:', Math.round((Date.now() - start) / 1000), 's');
      houseArr = generateHouses(800001);
      houses.insertMany(houseArr, (err) => {
        if (err) {
          throw err;
        }
        console.log('Third batch:', Math.round((Date.now() - start) / 1000), 's');
        houseArr = generateHouses(1200001);
        houses.insertMany(houseArr, (err) => {
          if (err) {
            throw err;
          }
          console.log('Fourth batch:', Math.round((Date.now() - start) / 1000), 's');
          houseArr = generateHouses(1600001);
          houses.insertMany(houseArr, (err) => {
            if (err) {
              throw err;
            }
            console.log('Fifth batch:', Math.round((Date.now() - start) / 1000), 's');
            console.log('Seeding complete');
            client.close((err) => {
              if (err) {
                throw err;
              } else {
                return;
              }
            });
          });
        });
      });
    });
  });
});
