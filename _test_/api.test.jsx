import request from 'supertest';
import app from '../server/index.js';
import Model from '../server/model.js';

describe('API tests', () => {
  test('makes a connection to the server', () => {
    request(app).get('/').then((response) => {
      expect(response.statusCode).toBe(200);
    });
  });
  test('receives zipcode properly', () => {
    return request(app).get('/api/estimates/zipcode/1').then((response) => {
      expect(response.body[0]).toHaveProperty('zipcode');
    });
  });
  test('receives pricing information properly', () => {
    return request(app).get('/api/estimates/pricing/1').then((response) => {
      expect(response.body[0]).toHaveProperty('price');
    });
  });
  test('receives group information properly', () => {
    return request(app).get('/api/estimates/recentsales/1').then((response) => {
      expect(response.body[0]).toHaveProperty('group_id');
    });
  });
  test('receives house information properly', () => {
    return request(app).get('/api/estimates/houseinfo/1').then((response) => {
      expect(response.body[0]).toHaveProperty('address1');
    });
  });
  afterAll(() => {
    return Model.connection.end();
  });
});
