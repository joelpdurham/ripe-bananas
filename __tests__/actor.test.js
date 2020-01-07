require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Actor = require('../lib/models/Actor');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let actor;
  const date = new Date();

  beforeEach(async() => {
    actor = await Actor.create({

      name: 'Laura Dern',
      dob: date,
      pob: 'Los Angeles, CA'
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create an actor', async() => {
    const myDate = new Date('12/10/1988');
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Joel Patrick Durham',
        dob: myDate,
        pob: 'Eugene'

      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Joel Patrick Durham',
          dob: myDate.toISOString(),
          pob: 'Eugene',
          __v: 0
        });
      });
  });

  it('can get all actors', async() => {
    return request(app)
      .get('/api/v1/actors')
      .then(res => {
        expect(res.body).toEqual([{
          _id: expect.any(String),
          name: 'Laura Dern',
        }]);
      });
  });

  it('can get a single actor', async() => {
    return request(app)
      .get(`/api/v1/actors/${actor._id}`)
      .then(res => {
        expect(res.body).toEqual({
          name: 'Laura Dern',
          dob: date.toISOString(),
          pob: 'Los Angeles, CA',
          films: [{
            _id: film._id.toString(),
            title: 'Little Women',
            released: 2019
          }]
        });
      });
  });
});
