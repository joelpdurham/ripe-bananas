const { getStudio, getStudios } = require('../lib/helpers/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('app routes', () => {
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
    const studios = await getStudios();

    return request(app)
      .get('/api/v1/studios')
      .then(res => {
        expect(res.body).toHaveLength(studios.length);
        studios.forEach(studio => {
          expect(res.body).toContainEqual(studio);
        });
      });
  });
  
  it.skip('can get a single studio', async() => {
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
