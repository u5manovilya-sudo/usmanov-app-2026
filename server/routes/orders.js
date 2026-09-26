const router = require('express').Router();
const Order = require('../models/Order');
const { protect, admin } = require('../middleware/auth');

router.post('/', protect, async (req, res) => {
    const order = await Order.create({ ...req.body, user: req.user._id });
    res.json(order);
});

router.get('/my', protect, async (req, res) =>
    res.json(await Order.find({ user: req.user._id }).sort('-createdAt')));

router.get('/', protect, admin, async (_req, res) =>
    res.json(await Order.find().populate('user', 'name email phone').sort('-createdAt')));

router.put('/:id/status', protect, admin, async (req, res) =>
    res.json(await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true })));

module.exports = router;
