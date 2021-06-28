const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }, 
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  comment: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review