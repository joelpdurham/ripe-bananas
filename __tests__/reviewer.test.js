require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Reviewer = require('../lib/models/Reviewer');
const Film = require('../lib/models/Film');
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const Review = require('../lib/models/Review');

describe.skip('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let reviewer;
  let film;
  let studio;
  let lauraDern;
  let review;

  beforeEach(async() => {
    reviewer = await Reviewer.create({
      name: 'Paul',
      company: 'film reviews dot com'
    });
    studio = await Studio.create({ name: 'Sony Pictures' });
    lauraDern = await Actor.create({ name: 'Laura Dern' });
    film = await Film.create({
      title: 'Little Women',
      studio: studio._id,
      released: 2019,
      cast: {
        role: 'Mary March',
        actor: lauraDern._id
      }
    });
    review = await Review.create({
      rating: 5,
      reviewer: reviewer._id,
      review: 'Fantastic!',
      film: film._id,
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
          company: 'film reviews dot com',
          reviews: [{
            _id: expect.any(String),
            rating: 5,
            review: 'Fantastic!',
            film: {
              _id: expect.any(String),
              title: 'Little Women'
            }
          }]
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

  it('wont delete a reviewer if they still have reviews', async() => {
    return request(app)
      .delete(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({ message: 'This reviewer has reviews.', status: 500 });
      });
  });

  it('can delete a reviewer', async() => {
    await request(app)
      .delete(`/api/v1/reviews/${review._id}`);
      
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
