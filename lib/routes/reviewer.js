const { Router } = require('express');
const Reviewer = require('../models/Reviewer');

module.exports = Router()

  .post('/', (req, res, next) => {
    Reviewer
      .create(req.body)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Reviewer
      .find()
      .select({ __v: false })
      .then(reviewers => res.send(reviewers))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Reviewer
      .findById(req.params.id)
      .select({ __v: false })
      .populate({
        path: 'reviews',
        select: 'film rating review -reviewer',
        populate: {
          path: 'film',
          select: 'title'
        }
      })
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Reviewer
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })
  
  .delete('/:id', (req, res, next) => {
    Reviewer
      .deletIfNoReviews(req.params.id)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  });
