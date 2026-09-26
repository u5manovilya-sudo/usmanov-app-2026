const router = require('express').Router();
const Review = require('../models/Review');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/auth');

// Публичные (одобренные)
router.get('/', async (req, res) => {
    const q = { status: 'approved' };
    if (req.query.product) q.product = req.query.product;
    res.json(await Review.find(q).populate('user', 'name').sort('-createdAt'));
});

router.post('/', protect, async (req, res) => {
    const review = await Review.create({ ...req.body, user: req.user._id });
    res.json(review);
});

// Админ
router.get('/all', protect, admin, async (_req, res) =>
    res.json(await Review.find().populate('user', 'name').sort('-createdAt')));

router.put('/:id/status', protect, admin, async (req, res) => {
    const review = await Review.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (review.status === 'approved' && review.product) {
        const all = await Review.find({ product: review.product, status: 'approved' });
        const avg = all.reduce((s, r) => s + r.rating, 0) / all.length;
        await Product.findByIdAndUpdate(review.product, { rating: avg.toFixed(1), reviewsCount: all.length });
    }
    res.json(review);
});

router.delete('/:id', protect, admin, async (req, res) => {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
});

module.exports = router;