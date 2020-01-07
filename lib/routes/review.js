const { Router } = require('express');
const Review = require('../models/Review');

module.exports = Router()

  .post('/', (req, res, next) => {
    Review
      .create(req.body)
      .then(review => res.send(review))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Review
      .find()
      .lean()
      .select({ rating: true, review: true, film: true })
      .populate('film', 'title')
      .then(reviews => res.send(reviews))
      .catch(next);
  });
  