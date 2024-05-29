const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.post('/', async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.send('<script>alert("Email is already Registered"); window.location="/register";</script>');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: fullName,
            email: email,
            password: hashedPassword
        });

        await newUser.save();

        req.session.user = {
            id: newUser._id,
            name: newUser.name
        };

        return res.send('<script>alert("You successfully registered."); window.location="/shop";</script>');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
});

module.exports = router;
