const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const buildAuthPayload = (user) => ({
    token: jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' }),
    user: {
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        role: user.role,
        deletionRequestedAt: user.deletionRequestedAt || null,
    },
});

exports.register = async (req, res) => {
    const { fullName, username, email, password, role } = req.body || {};

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        let user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ fullName, username, email, password: hashedPassword, role });
        await user.save();

        res.status(201).json({
            message: 'User registered successfully',
            ...buildAuthPayload(user),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body || {};

    if (!email || !password) {
        return res.status(400).json({ message: 'Missing credentials' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.json(buildAuthPayload(user));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

exports.getCurrentUser = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    res.json({ user: req.user });
};

exports.updateProfile = async (req, res) => {
    try {
        const { fullName, username, email } = req.body;
        const user = await User.findById(req.user.id);
        
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (username) user.username = username;
        if (email) user.email = email;
        if (fullName) user.fullName = fullName;

        await user.save();
        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id);
        
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Incorrect current password' });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        
        await user.save();
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.requestAccountDeletion = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.deletionRequestedAt = new Date();
        await user.save();
        res.json({ message: 'Account deletion scheduled', deletionRequestedAt: user.deletionRequestedAt });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.cancelAccountDeletion = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.deletionRequestedAt = null;
        await user.save();
        res.json({ message: 'Account deletion cancelled' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
