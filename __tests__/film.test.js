require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Film = require('../lib/models/Film');
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const Review = require('../lib/models/Review');
const Reviewer = require('../lib/models/Reviewer');

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
  let review;

  beforeEach(async() => {
    studio = await Studio.create({ name: 'Sony Pictures' });
    lauraDern = await Actor.create({ name: 'Laura Dern' });
    reviewer = await Reviewer.create({
      name: 'Jimmy',
      company: 'film reviews dot com'
    });

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

  it('can create a film', async() => {
    return request(app)
      .post('/api/v1/films')
      .send({
        title: 'Little Women',
        studio: studio._id,
        released: 2019,
        cast: {
          role: 'Mary March',
          actor: lauraDern._id
        }
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'Little Women',
          studio: studio._id.toString(),
          released: 2019,
          cast: [{
            _id: res.body.cast[0]._id,
            role: 'Mary March',
            actor: lauraDern._id.toString()
          }],
          __v: 0
        });
      });
  });

  it('can get all films', async() => {
    return request(app)
      .get('/api/v1/films')
      .then(res => {
        expect(res.body).toEqual([{
          _id: expect.any(String),
          title: 'Little Women',
          released: 2019,
          studio: {
            _id: studio._id.toString(),
            name: 'Sony Pictures'
          }
        }]);
      });
  });

  it('can get a single films', async() => {
    return request(app)
      .get(`/api/v1/films/${film._id}`)
      .then(res => {
        expect(res.body).toEqual({
          title: 'Little Women',
          released: 2019,
          studio: {
            _id: studio._id.toString(),
            name: 'Sony Pictures'
          },
          cast: [{
            _id: res.body.cast[0]._id,
            role: 'Mary March',
            actor: {
              _id: lauraDern._id.toString(),
              name: 'Laura Dern'
            }
          }],
          reviews: [{
            _id: review._id.toString(),
            rating: 5,
            review: 'Fantastic!',
            reviewer: {
              _id: reviewer._id.toString(),
              name: 'Jimmy'
            }
          }]
        });
      });
  });
});
