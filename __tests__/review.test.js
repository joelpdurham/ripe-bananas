require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Film = require('../lib/models/Film');
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const Reviewer = require('../lib/models/Reviewer');
const Review = require('../lib/models/Review');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let film;
  let studio;
  let lauraDern;
  let reviewer;

  beforeEach(async() => {
    studio = await Studio.create({ name: 'Sony Pictures' });
    lauraDern = await Actor.create({ name: 'Laura Dern'});
    film = await Film.create({
      title: 'Little Women',
      studio: studio._id,
      released: 2019,
      cast: {
        role: 'Mary March',
        actor: lauraDern._id
      }
    });
    reviewer = await Reviewer.create({
      name: 'Jimmy',
      company: 'film reviews dot com'
    })
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a reviw', async() => {
    return request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 5,
        reviewer: reviewer._id,
        review: 'Fantastic!',
        film: film._id,
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          rating: 5,
          reviewer: reviewer._id.toString(),
          review: 'Fantastic!',
          film: film._id.toString(),
          __v: 0
        });
      });
  });
});
