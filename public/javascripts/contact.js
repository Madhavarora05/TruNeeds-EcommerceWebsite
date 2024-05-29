const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

const Contact = mongoose.model('Contact', contactSchema);

router.post('/', async (req, res) => {
    const { fullName, email, subject, message } = req.body;
    try {
        const newContact = new Contact({
            fullName,
            email,
            subject,
            message
        });
        await newContact.save();
        res.status(201).json({ message: 'Contact form submitted successfully' });
    } catch (error) {
        console.error('Error submitting contact form:', error);
        res.status(500).json({ message: 'Error submitting contact form' });
    }
});

module.exports = router;
