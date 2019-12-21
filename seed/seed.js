const faker = require('faker');
const cities = require('./cities.js');
const monthYearList = require('./monthyear.js');

const { Pool } = require('pg');

const pool = new Pool({
  user: 'impeter9',
  host: 'localhost',
  database: 'perch_graph',
  port: 5432,
});

(async () => {
  const client = await pool.connect();
  try {
    for (let i = 90001; i <= 96162; i += 1) {
      await client.query(`INSERT INTO zips(zipcode) values('${i}')`);
      // console.log('zipcode' + i);
    }

    for (let i = 1; i <= 1000000; i += 1) {
      if (i % 1000 === 0) {
        console.log(`At ${i}/1000000, ${(i / 1000000) * 100}%`);
      }
      const bednum = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
      const bathnum = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
      const sold_price = Math.ceil((Math.floor(Math.random() * (1400000 - 800000 + 1)) + 800000) / 1000) * 1000;
      const rating = Math.round(Math.random());
      const citynum = Math.floor(Math.random() * (482));
      const city = cities[citynum];
      const imgnum = Math.floor(Math.random() * (898 - 1 + 1)) + 1;
      const img = `https://perch-graph.s3-us-west-1.amazonaws.com/Img${imgnum}.jpg`;
      const address1 = faker.address.streetAddress();
      const address2 = `${city}, CA`;
      const sq_ft = Math.ceil(Math.random() * 60 + 70) * 10;
      const sold_date = JSON.stringify(faker.date.between('2000-01-01', '2019-12-01')).substring(1, 11);
      const zip_id = Math.floor(Math.random() * (6162 - 1 + 1)) + 1;

      // const keys = ['imgurl', 'rating', 'bed', 'bath', 'sold_price', 'address1', 'address2', 'sq_ft', 'sold_date', 'zip_id'];

      await client.query(`INSERT INTO houses(imgurl, rating, bed, bath, sold_price, address1, address2, sq_ft, sold_date, zip_id) values('${img}', '${rating}', '${bednum}', '${bathnum}', '${sold_price}', $$${address1}$$, $$${address2}$$, '${sq_ft}', '${sold_date}', '${zip_id}')`);

      var diffs = {};
      for (let j = 1; j <= 60; j += 1) {
        const price = Math.ceil(Math.random() * 500 + 700) * 1000;
        if (j === 1) {
          diffs.janFirst = price;
        }
        if (j === 49) {
          diffs.janLast = price;
        }
        if (j === 60) {
          diffs.decLast = price;
          const diff5year = diffs.decLast - diffs.janFirst;
          const diff1year = diffs.decLast - diffs.janLast;
          await client.query(`INSERT INTO diffs(id, diff5year, diff1year) values('${i}', '${diff5year}', '${diff1year}')`);
        }
        const m_y = monthYearList[j-1];
        await client.query(`INSERT INTO prices(id, price, month_year) values('${i}', '${price}', '${m_y}')`);
      }
    }
  } finally {
    // Make sure to release the client before any error handling,
    // just in case the error handling itself throws an error.
    client.release();
  }

})().catch(err => console.log(err.stack));
