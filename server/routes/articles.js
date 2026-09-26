const router = require('express').Router();
const Article = require('../models/Article');
const { protect, admin } = require('../middleware/auth');

router.get('/', async (req, res) => {
    const q = req.query.all ? {} : { status: 'published' };
    res.json(await Article.find(q).sort('-createdAt'));
});
router.get('/:slug', async (req, res) => {
    const a = await Article.findOne({ slug: req.params.slug });
    if (!a) return res.status(404).json({ message: 'Не найдено' });
    res.json(a);
});
router.post('/', protect, admin, async (req, res) => res.json(await Article.create(req.body)));
router.put('/:id', protect, admin, async (req, res) =>
    res.json(await Article.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/:id', protect, admin, async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
});

module.exports = router;