require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Reviewer = require('../lib/models/Reviewer');

describe.skip('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let reviewer; 

  beforeEach(async() => {
    reviewer = await Reviewer.create({

      name: 'Paul',
      company: 'film reviews dot com'
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a reviewer', async() => {
    return request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'John',
        company: 'a place'

      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'John',
          company: 'a place',
          __v: 0
        });
      });
  });

  it('can get all reviewers', async() => {
    return request(app)
      .get('/api/v1/reviewers')
      .then(res => {
        expect(res.body).toEqual([{
          _id: expect.any(String),
          name: 'Paul',
          company: 'film reviews dot com' 
        }]);
      });
  });

  it('can get a single reviewer', async() => {
    return request(app)
      .get(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Paul',
          company: 'film reviews dot com' 
        });
      });
  });

  it('can update a reviewer', async() => {
    return request(app)
      .patch(`/api/v1/reviewers/${reviewer._id}`)
      .send({ name: 'Paul Reviewman' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Paul Reviewman',
          company: 'film reviews dot com',
          __v: 0
        });
      });
  });

  it('can delete a reviewer', async() => {
    return request(app)
      .delete(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Paul',
          company: 'film reviews dot com',
          __v: 0
        });
      });
  });
});
