'use strict';

module.exports = {
  generateRandomData
};

function generateRandomData(userContext, events, done) {
  // generate data with Faker:
  const houseID = Math.floor(Math.random() * (2000000 - 1 + 1)) + 1;
  // add variables to virtual user's context:
  userContext.vars.houseID = houseID;
  // continue with executing the scenario:
  return done();
}
