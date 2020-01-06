const Actor = require('./Actor');

describe('Actor model', () => {
  it('has throws error with no name', () => {
    const actor = new Actor();
    const { errors } = actor.validateSync();

    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('has a name field', () => {
    const date = new Date()
    const actor = new Actor({
      name: 'Alan Dangle',
      dob: date,
      pob: 'the world'
    });

    expect(actor.toJSON()).toEqual({
      _id: actor._id,
      name: 'Alan Dangle',
      dob: date,
      pob: 'the world'
    });
  });
});
