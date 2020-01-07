const Review = require('./Review');
const Film = require('./Film');
const Studio = require('./Studio');
const Actor = require('./Actor');
const Reviewer = require('./Reviewer');

describe('Review model', () => {
  it('throws error without required info', () => {
    const review = new Review();
    const { errors } = review.validateSync();

    expect(errors.rating.message).toEqual('Path `rating` is required.');
    expect(errors.reviewer.message).toEqual('Path `reviewer` is required.');
    expect(errors.review.message).toEqual('Path `review` is required.');
    expect(errors.film.message).toEqual('Path `film` is required.');
  });
  
  const studio = new Studio({
    name: 'Sony Pictures',
  });

  const lauraDern = new Actor({
    name: 'Laura Dern',
  });

  const film = new Film({
    title: 'Little Women',
    studio: studio._id,
    released: 2019,
    cast: [{
      role: 'Mary March',
      actor: lauraDern._id
    }]
  });

  const reviewer = new Reviewer({
    name: 'Jimmy',
    company: 'film reviews dot com'
  });

  it('can create a review', () => {
    const review = new Review({
      rating: 5,
      reviewer: reviewer._id,
      review: 'Fantastic!',
      film: film._id
    });

    expect(review.toJSON()).toEqual({
      _id: review._id,
      rating: 5,
      reviewer: reviewer._id,
      review: 'Fantastic!',
      film: film._id
    });
  });

  it('rating limit max', () => {
    const review = new Review({
      rating: 10
    });
    const { errors } = review.validateSync();
    expect(errors.rating.message).toEqual('Path `rating` (10) is more than maximum allowed value (5).');
  });

  it('rating limit min', () => {
    const review = new Review({
      rating: 0
    });
    const { errors } = review.validateSync();
    expect(errors.rating.message).toEqual('Path `rating` (0) is less than minimum allowed value (1).');
  });
});
