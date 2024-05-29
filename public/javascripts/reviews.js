const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define MongoDB schema and model for reviews
const reviewSchema = new mongoose.Schema({
  text: String,
  name: String,
  createdAt: { type: Date, default: Date.now }
});
const Review = mongoose.model('reviews', reviewSchema);

// POST route for submitting reviews
router.post('/', async (req, res) => {
  const { reviewText, authorName } = req.body;
  try {
    const newReview = new Review({
      text: reviewText,
      name: authorName,
    });
    await newReview.save();
    console.log('Review saved to MongoDB:');
    res.redirect('back'); // Redirect back to the previous page after review submission
  } catch (error) {
    console.error('Error saving review to MongoDB:', error);
    res.status(500).send('Error saving review');
  }
});

// GET route for fetching reviews
router.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews from MongoDB:', error);
    res.status(500).send('Error fetching reviews');
  }
});

module.exports = router;
