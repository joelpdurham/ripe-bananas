const { getActor, getActors } = require('../lib/helpers/data-helpers');

const request = require('supertest');
const app = require('../lib/app');


describe('app routes', () => {
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
    const actors = await getActors();

    return request(app)
      .get('/api/v1/actors')
      .then(res => {
        expect(res.body).toHaveLength(actors.length);
      });
  });

  it.skip('can get a single actor', async() => {
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
