const router = require('express').Router();
const Promotion = require('../models/Promotion');
const { protect, admin } = require('../middleware/auth');

router.get('/', async (req, res) => {
    const q = req.query.all ? {} : { status: 'active' };
    res.json(await Promotion.find(q).sort('-createdAt'));
});
router.post('/', protect, admin, async (req, res) => res.json(await Promotion.create(req.body)));
router.put('/:id', protect, admin, async (req, res) =>
    res.json(await Promotion.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/:id', protect, admin, async (req, res) => {
    await Promotion.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
});

module.exports = router;