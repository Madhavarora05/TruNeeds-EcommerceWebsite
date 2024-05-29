const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user'); // Import the User model

// POST route for resetting user password
router.post('/', async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        // Check if the user with the provided email exists
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.send('<script>alert("User not found"); window.location="/forgot";</script>')
        }

        // Compare the hashed version of the new password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(newPassword, user.password);
        if (passwordMatch) {
            // If the new password matches the old one, display an alert and redirect to the login page
            return res.send('<script>alert("New password cannot be the same as the old one"); window.location="/login";</script>');
        }

        // Generate hash for the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        return res.send('<script>alert("Password changed successfully"); window.location="/login";</script>');
    } catch (error) {
        res.status(500).json({ message: 'Error resetting password' });
    }
});

module.exports = router;
