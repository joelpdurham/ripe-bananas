const { Router } = require('express');
const Film = require('../models/Film');

module.exports = Router()

  .post('/', (req, res, next) => {
    Film
      .create(req.body)
      .then(film => res.send(film))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Film
      .find()
      .lean()
      .select({ title: true, released: true, studio: true })
      .populate('studio', 'name')
      .then(film => res.send(film))
      .catch(next);
  });
