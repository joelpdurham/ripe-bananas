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
  
  it('can get a single studio', async() => {
    const studio = await getStudio();

    return request(app)
      .get(`/api/v1/studios/${studio._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: studio._id,
          name: studio.name,
          films: expect.any(Array)
        });
      });
  });
});
