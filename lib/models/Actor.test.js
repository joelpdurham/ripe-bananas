const Actor = require('./Actor');

describe('Actor model', () => {
  it('has throws error with no name', () => {
    const actor = new Actor();
    const { errors } = actor.validateSync();

    expect(errors.name.message).toEqual('Path `name` is required.');
  });
});
