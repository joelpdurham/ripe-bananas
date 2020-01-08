const chance = require('chance').Chance();

const Actor = require('../models/Actor');
const Film = require('../models/Film');
const Review = require('../models/Review');
const Reviewer = require('../models/Reviewer');
const Studio = require('../models/Studio');

module.exports = async({ 
  actor = 30, 
  film = 15, 
  review = 30, 
  reviewer = 5, 
  studio = 3 } = {}) => {

  const studios = await Studio.create([...Array(studio)].map(() => ({
    name: `${chance.color()} ${chance.animal()}`
  })));

  const actors = await Actor.create([...Array(actor)].map(() => ({
    name: `${chance.first()} ${chance.last()}`
  })));

  const reviewers = await Reviewer.create([...Array(reviewer)].map(() => ({
    name: `${chance.first()} ${chance.last()}`,
    company: chance.company()
  })));

  const films = await Film.create([...Array(film)].map(() => ({
    title: chance.sentence({ words: chance.integer({ min: 1, max: 4 }) }),
    studio: chance.pickone(studios.map(studio => studio._id)),
    released: chance.integer({ min: 1888, max: 2020 }),
    cast: [{
      role: chance.first(),
      actor: chance.pickone(actors.map(actor => actor._id))
    },
    {
      role: chance.first(),
      actor: chance.pickone(actors.map(actor => actor._id))
    }]
  })));

  await Review.create([...Array(review)].map(() => ({
    rating: chance.integer({ min: 1, max: 5 }),
    reviewer: chance.pickone(reviewers.map(reviewer => reviewer._id)),
    review: `${chance.pickone(actors.map(actor => actor._id))} was ${chance.pickone(['fantastic', 'terrible', 'just okay', 'mediocre', 'a hot mess'])}. It was the ${chance.pickone(['best', 'worst', 'blandest', 'sleepiest', 'funniest'])} ${chance.weekday()} of my life.`,
    film: chance.pickone(films.map(film => film._id)),
  })));



};
