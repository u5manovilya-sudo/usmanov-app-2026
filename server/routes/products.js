const router = require('express').Router();
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/auth');

// Каталог с фильтрами
router.get('/', async (req, res) => {
    const { category, brand, minPrice, maxPrice, search, promo, sort } = req.query;
    const q = {};
    if (category) q.category = category;
    if (brand) q.brand = brand;
    if (promo) q.isPromo = true;
    if (minPrice || maxPrice) q.price = { ...(minPrice && { $gte: +minPrice }), ...(maxPrice && { $lte: +maxPrice }) };
    if (search) q.name = { $regex: search, $options: 'i' };

    let sortOpt = { createdAt: -1 };
    if (sort === 'price_asc') sortOpt = { price: 1 };
    if (sort === 'price_desc') sortOpt = { price: -1 };
    if (sort === 'rating') sortOpt = { rating: -1 };

    res.json(await Product.find(q).populate('category', 'name slug').sort(sortOpt));
});

router.get('/brands', async (_req, res) =>
    res.json(await Product.distinct('brand')));

router.get('/:id', async (req, res) =>
    res.json(await Product.findById(req.params.id).populate('category', 'name slug')));

router.post('/', protect, admin, async (req, res) => res.json(await Product.create(req.body)));
router.put('/:id', protect, admin, async (req, res) =>
    res.json(await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/:id', protect, admin, async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
});

module.exports = router;