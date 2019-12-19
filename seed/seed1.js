const Sequelize = require('sequelize');
const faker = require('faker');

let sequelize = new Sequelize('', 'user', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize.query('CREATE DATABASE IF NOT EXISTS estimate');

sequelize = new Sequelize('estimate', 'user', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

const Group = sequelize.define('groups', {
  group_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  zipcode: { type: Sequelize.STRING, allowNull: false },
});

const Date = sequelize.define('dates', {
  date_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  month_year: { type: Sequelize.DATEONLY, allowNull: false },
}, {
  timestamps: false,
});

const House = sequelize.define('houses', {
  property_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  imgurl: { type: Sequelize.STRING, allowNull: false },
  rating: { type: Sequelize.BOOLEAN, allowNull: false },
  bed: { type: Sequelize.INTEGER, allowNull: false },
  bath: { type: Sequelize.INTEGER, allowNull: false },
  price: { type: Sequelize.INTEGER, allowNull: false },
  address1: { type: Sequelize.STRING, allowNull: false },
  address2: { type: Sequelize.STRING, allowNull: false },
  sq_ft: { type: Sequelize.INTEGER, allowNull: false },
  sold_date: { type: Sequelize.STRING, allowNull: false },
  group_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'groups',
      key: 'group_id',
    },
  },
});

const Price = sequelize.define('prices', {
  property_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'houses',
      key: 'property_id',
    },
  },
  price: { type: Sequelize.STRING, allowNull: false },
  date_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'dates',
      key: 'date_id',
    },
  },
});


const zipcodes = ['94066', '95123', '93275', '93293', '90312', '91458', '92321', '90043', '95031', '91851'];
const cities = ['San Bruno', 'San Jose', 'San Mateo', 'Oakland', 'San Francisco', 'Sacramento', 'Pleasanton', 'Berkeley', 'Fresno'];

sequelize.sync({ force: true }).then(() => {
  for (let j = 0; j < zipcodes.length; j += 1) {
    Group.create({ zipcode: zipcodes[j] });
  }
  for (let k = 0; k < 5; k += 1) {
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    for (let m = 0; m < 12; m += 1) {
      Date.create({
        month_year: `20${k + 15}-${months[m]}-01`,
      }).then(() => {
        Group.belongsTo(House, { foreignKey: 'group_id' });
        console.log('DONE ASSOCIATION');
      });
    }
  }
}).then(() => {
  for (let i = 1; i < 101; i += 1) {
    const bednum = faker.random.number({ min: 1, max: 5 });
    const bathnum = faker.random.number({ min: 1, max: 5 });
    const price = faker.random.number({ min: 800000, max: 1400000, precision: 1000 });
    const rating = Math.round(Math.random());
    const img = `https://redfin-estimates.s3.us-east-2.amazonaws.com/Img${i}.jpg`;
    const obj = {
      imgurl: img,
      rating,
      bed: bednum,
      bath: bathnum,
      price,
      address1: faker.address.streetAddress(),
      address2: `${cities[Math.floor(Math.random() * 9)]}, CA`,
      sq_ft: Math.ceil(Math.random() * 60 + 70) * 10,
      sold_date: JSON.stringify(faker.date.between('2000-01-01', '2019-12-01')).substring(1, 11),
      group_id: Math.ceil(Math.random() * 10),
    };
    House.create(obj);
  }
  for (let m = 1; m <= 100; m += 1) {
    for (let n = 1; n <= 60; n += 1) {
      Price.create({
        property_id: m,
        price: Math.ceil(Math.random() * 500 + 700) * 1000,
        date_id: n,
      });
    }
  }
});
