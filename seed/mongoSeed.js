const mongo = require('mongodb').MongoClient;
const faker = require('faker');
const cities = require('./cities.js');
const monthYearList = require('./monthyear.js');

const url = 'mongodb://127.0.0.1:27017';
const start = Date.now();

// const houseIndex = [1, 400001, 800001, 1200001, 1600001];
// const houseIndex = [2000001, 2400001, 2800001, 3200001, 3600001];
// const houseIndex = [4000001, 4400001, 4800001, 5200001, 5600001];
// const houseIndex = [6000001, 6400001, 6800001, 7200001, 7600001];
const houseIndex = [8000001, 8400001, 8800001, 9200001, 9600001];

mongo.connect(url, (err, client) => {
  if (err) {
    throw err;
  }
  console.log('Connected');
  const db = client.db('perch_graph');
  const houses = db.collection('houses');
  function generatePrices() {
    const priceObj = {};
    for (let i = 0; i < monthYearList.length + 1; i += 1) {
      if (i === monthYearList.length) {
        priceObj['1Diff'] = priceObj['2019-12-01'] - priceObj['2019-01-01'];
        priceObj['5Diff'] = priceObj['2019-12-01'] - priceObj['2015-01-01'];
      } else {
        priceObj[monthYearList[i]] = Math.ceil(Math.random() * 500 + 700) * 1000;
      }
    }
    return priceObj;
  }
  // function generatePrices() {
  //   const priceArr = [];
  //   for (let i = 0; i < monthYearList.length; i += 1) {
  //     const obj = {};
  //     obj[monthYearList[i]] = Math.ceil(Math.random() * 500 + 700) * 1000;
  //     priceArr.push(obj);
  //   }
  //   return priceArr;
  // }
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
  let houseArr = generateHouses(houseIndex[0]);
  houses.insertMany(houseArr, (err) => {
    if (err) {
      throw err;
    }
    console.log('First batch:', Math.round((Date.now() - start) / 1000), 's');
    houseArr = generateHouses(houseIndex[1]);
    houses.insertMany(houseArr, (err) => {
      if (err) {
        throw err;
      }
      console.log('Second batch:', Math.round((Date.now() - start) / 1000), 's');
      houseArr = generateHouses(houseIndex[2]);
      houses.insertMany(houseArr, (err) => {
        if (err) {
          throw err;
        }
        console.log('Third batch:', Math.round((Date.now() - start) / 1000), 's');
        houseArr = generateHouses(houseIndex[3]);
        houses.insertMany(houseArr, (err) => {
          if (err) {
            throw err;
          }
          console.log('Fourth batch:', Math.round((Date.now() - start) / 1000), 's');
          houseArr = generateHouses(houseIndex[4]);
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

// Execute this file from the command line by typing:
//   node --max-old-space-size=8192 ./seed/mongoSeed.js;
// to seed the postgres database.
