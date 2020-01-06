const Reviewer = require('./Reviewer');

describe('Reviewer model', () => {
  it('throws error with no name', () => {
    const actor = new Reviewer({ company: 'company' });
    const { errors } = actor.validateSync();

    expect(errors.name.message).toEqual('Path `name` is required.');
  });
});
