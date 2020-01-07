const Film = require('./Film');

describe('Film model', () => {
  it('throws error without required info', () => {
    const film = new Film();
    const { errors } = film.validateSync();

    expect(errors.title.message).toEqual('Path `title` is required.');
  });
});
