const Studio = require('./Studio');

describe('Studio model', () => {
  it('has throws error with no name', () => {
    const studio = new Studio();
    const { errors } = studio.validateSync();

    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('has a name field', () => {
    const studio = new Studio({
      name: 'We Make Films'
    });

    expect(studio.toJSON()).toEqual({
      _id: studio._id,
      name: 'We Make Films'
    });
  });

  it('can have an address', () => {
    const studio = new Studio({
      name: 'Films!',
      address: {
        city: 'Portland',
        state: 'Oregon',
        country: 'United States'
      }
    });

    expect(studio.toJSON()).toEqual({
      _id: studio._id,
      name: 'Films!',
      address: {
        city: 'Portland',
        state: 'Oregon',
        country: 'United States'
      }
    });
  });
});
