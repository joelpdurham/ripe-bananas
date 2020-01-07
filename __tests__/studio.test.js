require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Studio = require('../lib/models/Studio');
const Film = require('../lib/models/Film');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let studio;

  beforeEach(async() => {
    studio = await Studio.create({
      name: 'Films!',
      address: {
        city: 'Portland',
        state: 'Oregon',
        country: 'United States'
      }
    });
    await Film.create({
      title: 'Little Women',
      studio: studio._id,
      released: 2019
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a studio', async() => {
    return request(app)
      .post('/api/v1/studios')
      .send({
        name: 'first one'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'first one',
          __v: 0
        });
      });
  });

  it('can get all studios', async() => {
    return request(app)
      .get('/api/v1/studios')
      .then(res => {
        expect(res.body).toEqual([{
          _id: expect.any(String),
          name: 'Films!',
        }]);
      });
  });
  
  it('can get a single studio', async() => {
    return request(app)
      .get(`/api/v1/studios/${studio._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Films!',
          address: {
            city: 'Portland',
            state: 'Oregon',
            country: 'United States'
          },
          films: [{
            _id: expect.any(String),
            title: 'Little Women'
          }]
        });
      });
  });
});
