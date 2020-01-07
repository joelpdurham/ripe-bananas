const Review = require('./Review');
const Film = require('./Film');
const Studio = require('./Studio');
const Actor = require('./Actor');

describe('Review model', () => {
  it('throws error without required info', () => {
    const review = new Review();
    const { errors } = review.validateSync();

    expect(errors.rating.message).toEqual('Path `rating` is required.');
    expect(errors.reviewer.message).toEqual('Path `reviewer` is required.');
    expect(errors.review.message).toEqual('Path `review` is required.');

  });
});
