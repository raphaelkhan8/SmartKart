const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
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

module.exports = reviewSchema