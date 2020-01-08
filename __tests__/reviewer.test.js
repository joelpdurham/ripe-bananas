const { getReviewer, getReviewers } = require('../lib/helpers/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('app routes', () => {
  
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
    const reviewers = await getReviewers();

    return request(app)
      .get('/api/v1/reviewers')
      .then(res => {
        expect(res.body).toHaveLength(reviewers.length);
      });
  });

  it.skip('can get a single reviewer', async() => {
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

  it.skip('can update a reviewer', async() => {
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

  it.skip('wont delete a reviewer if they still have reviews', async() => {
    return request(app)
      .delete(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({ message: 'This reviewer has reviews.', status: 500 });
      });
  });

  it.skip('can delete a reviewer', async() => {
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
