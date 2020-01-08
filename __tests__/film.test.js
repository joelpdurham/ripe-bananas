const { getFilm, getFilms, getStudio, getActor } = require('../lib/helpers/data-helpers');


const request = require('supertest');
const app = require('../lib/app');


const Film = require('../lib/models/Film');
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const Review = require('../lib/models/Review');
const Reviewer = require('../lib/models/Reviewer');

describe('app routes', () => {
  
  it('can create a film', async() => {
    const studio = await getStudio();
    const actor = await getActor();

    return request(app)
      .post('/api/v1/films')
      .send({
        title: 'Little Women',
        studio: studio._id,
        released: 2019,
        cast: {
          role: 'Mary March',
          actor: actor._id
        }
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'Little Women',
          studio: studio._id,
          released: 2019,
          cast: [{
            _id: res.body.cast[0]._id,
            role: 'Mary March',
            actor: actor._id
          }],
          __v: 0
        });
      });
  });

  it('can get all films', async() => {
    const films = await getFilms();

    return request(app)
      .get('/api/v1/films')
      .then(res => {
        expect(res.body).toHaveLength(films.length);
      });
  });

  it('can get a single films', async() => {
    const film = await getFilm();

    return request(app)
      .get(`/api/v1/films/${film._id}`)
      .then(res => {
        expect(res.body).toEqual({
          title: film.title,
          released: film.released,
          studio: expect.any(Object),
          cast: expect.any(Array),
          reviews: expect.any(Array)
        });
      });
  });
});
