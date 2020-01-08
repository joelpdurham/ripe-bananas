const { getReviewer, getReviewers, getReviews } = require('../lib/helpers/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

const Review = require('../lib/models/Review');

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

  it('can get a single reviewer', async() => {
    const reviewer = await getReviewer();

    return request(app)
      .get(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: reviewer._id,
          name: reviewer.name,
          company: reviewer.company,
          reviews: expect.any(Array)
        });
      });
  });

  it('can update a reviewer', async() => {
    const reviewer = await getReviewer();

    return request(app)
      .patch(`/api/v1/reviewers/${reviewer._id}`)
      .send({ name: 'NEW NAME' })
      .then(res => {
        expect(res.body).toEqual({
          _id: reviewer._id,
          name: 'NEW NAME',
          company: reviewer.company,
          __v: 0
        });
      });
  });

  it('wont delete a reviewer if they still have reviews', async() => {
    const reviewer = await getReviewer();

    return request(app)
      .delete(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({ message: 'This reviewer has reviews.', status: 500 });
      });
  });

  it('can delete a reviewer', async() => {
    const reviewer = await getReviewer();
    console.log(reviewer);

    await Review
      .deleteMany({ reviewer: reviewer._id });

    return request(app)
      .delete(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: reviewer._id,
          name: reviewer.name,
          company: reviewer.company,
          __v: 0
        });
      });
  });
});
