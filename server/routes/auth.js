const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

router.post('/register', async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        if (await User.findOne({ email }))
            return res.status(400).json({ message: 'Email уже занят' });
        const user = await User.create({ name, email, phone, password });
        res.json({
            token: signToken(user._id),
            user: { _id: user._id, name, email, phone, role: user.role },
        });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password)))
        return res.status(401).json({ message: 'Неверные данные' });
    res.json({
        token: signToken(user._id),
        user: { _id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role },
    });
});

router.get('/me', protect, (req, res) => res.json(req.user));

router.put('/me', protect, async (req, res) => {
    const { name, phone, password } = req.body;
    const user = await User.findById(req.user._id);
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (password) user.password = password;
    await user.save();
    res.json({ _id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role });
});

// Адреса
router.post('/me/addresses', protect, async (req, res) => {
    const user = await User.findById(req.user._id);
    user.addresses.push(req.body);
    await user.save();
    res.json(user.addresses);
});

router.delete('/me/addresses/:id', protect, async (req, res) => {
    const user = await User.findById(req.user._id);
    user.addresses.id(req.params.id).deleteOne();
    await user.save();
    res.json(user.addresses);
});

module.exports = router;