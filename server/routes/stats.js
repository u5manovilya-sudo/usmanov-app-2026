const router = require('express').Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const { protect, admin } = require('../middleware/auth');

router.get('/', protect, admin, async (_req, res) => {
    const [orders, products, users] = await Promise.all([
        Order.find(), Product.countDocuments(), User.countDocuments(),
    ]);
    const revenue = orders.filter(o => o.status !== 'Отменён')
        .reduce((s, o) => s + (o.total || 0), 0);
    const byStatus = {};
    orders.forEach(o => { byStatus[o.status] = (byStatus[o.status] || 0) + 1; });

    // Топ товаров
    const counter = {};
    orders.forEach(o => o.items.forEach(i => {
        counter[i.name] = (counter[i.name] || 0) + i.quantity;
    }));
    const top = Object.entries(counter).sort((a, b) => b[1] - a[1]).slice(0, 5)
        .map(([name, qty]) => ({ name, qty }));

    res.json({
        totals: { orders: orders.length, revenue, products, users },
        byStatus,
        topProducts: top,
    });
});

module.exports = router;