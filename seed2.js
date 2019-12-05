const faker = require('faker');
console.log(JSON.stringify(faker.date.between('2000-01-01', '2019-12-01')).substring(1,11));
