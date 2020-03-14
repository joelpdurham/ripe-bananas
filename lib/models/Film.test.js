const Film = require('./Film');
const Studio = require('./Studio');
const Actor = require('./Actor');

describe('Film model', () => {
  it('throws error without required info', () => {
    const film = new Film();
    const { errors } = film.validateSync();

    expect(errors.title.message).toEqual('Path `title` is required.');
    expect(errors.studio.message).toEqual('Path `studio` is required.');
    expect(errors.released.message).toEqual('Path `released` is required.');
  });

  const studio = new Studio({ name: 'Test Studio' });
  const lauraDern = new Actor({ name: 'Laura Dern' });

  it('can create a Film', () => {
    const film = new Film({
      title: 'Little Women',
      studio: studio._id,
      released: 2019,
      cast: [{
        role: 'Mary March',
        actor: lauraDern._id
      }]
    });

    expect(film.toJSON()).toEqual({
      _id: film._id,
      title: 'Little Women',
      studio: studio._id,
      released: 2019,
      cast: [{
        _id: film.cast[0]._id,
        role: 'Mary March',
        actor: lauraDern._id
      }],
    });
  });
});
