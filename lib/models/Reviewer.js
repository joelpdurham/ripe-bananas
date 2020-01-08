const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  } 
},
{
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      delete ret.id;
    }
  }
});

schema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'reviewer'
});

schema.statics.deletIfNoReviews = async function(id) {
  const reviews = await this.model('Review')
    .find({ reviewer: id });

  if(reviews.length === 0) {
    return this.findByIdAndDelete(id);
  } else {
    throw new Error('This reviewer has reviews.');
  }
};

module.exports = mongoose.model('Reviewer', schema);
