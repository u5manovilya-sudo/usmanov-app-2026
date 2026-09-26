const router = require('express').Router();
const Category = require('../models/Category');
const { protect, admin } = require('../middleware/auth');

router.get('/', async (_req, res) => res.json(await Category.find().sort('name')));
router.post('/', protect, admin, async (req, res) => res.json(await Category.create(req.body)));
router.put('/:id', protect, admin, async (req, res) =>
    res.json(await Category.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/:id', protect, admin, async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
});

module.exports = router;