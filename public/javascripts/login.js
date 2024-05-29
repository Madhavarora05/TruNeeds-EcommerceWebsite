const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user'); 

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.send('<script>alert("User not found"); window.location="/login";</script>');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.send('<script>alert("Invalid password"); window.location="/login";</script>');
        }

        req.session.user = {
            id: user._id,
            name: user.name
        };

        return res.send('<script>alert("Login Successful"); window.location="/shop";</script>');
    } catch (error) {
        res.status(500).json({ message: 'Error logging in user' });
    }
});

module.exports = router;
