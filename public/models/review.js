// models/review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  authorName: { type: String, required: true },
  reviewText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
