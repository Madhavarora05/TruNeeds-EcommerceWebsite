const express = require('express');
const router = express.Router();
const Order = require('../models/order');

router.post('/checkout', async (req, res) => {
    const { username, products, subtotal } = req.body;
    try {
        const newOrder = new Order({ username, products, subtotal });
        await newOrder.save();
        res.status(200).json({ message: 'Order placed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to place order', error });
    }
});

module.exports = router;
