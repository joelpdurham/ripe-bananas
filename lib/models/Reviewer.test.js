const Reviewer = require('./Reviewer');

describe('Reviewer model', () => {
  it('throws error with no name', () => {
    const reviewer = new Reviewer({ company: 'company' });
    const { errors } = reviewer.validateSync();

    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('throws error with no company', () => {
    const reviewer = new Reviewer({ name: 'name' });
    const { errors } = reviewer.validateSync();

    expect(errors.company.message).toEqual('Path `company` is required.');
  });

  it('creates a reviewer', () => {
    const reviewer = new Reviewer({
      name: 'name',
      company: 'company'
    });

    expect(reviewer.toJSON()).toEqual({
      name: 'name',
      company: 'company',
      _id: reviewer._id,
    });
  });
});
