const { getReview, getReviews, getFilm, getReviewer } = require('../lib/helpers/data-helpers');

const request = require('supertest');
const app = require('../lib/app');


const Film = require('../lib/models/Film');
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const Reviewer = require('../lib/models/Reviewer');
const Review = require('../lib/models/Review');

describe('app routes', () => {

  it('can create a reviw', async() => {
    const film = await getFilm();
    const reviewer = await getReviewer();

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

  it('can get top 2 reviews in desc order', async() => {
    return request(app)
      .get('/api/v1/reviews/')
      .then(res => {
        expect(res.body.length).toEqual(2);
      });
  });

  it.skip('can delete a review', async() => {
    return request(app)
      .delete(`/api/v1/reviews/${review._id}`)
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

