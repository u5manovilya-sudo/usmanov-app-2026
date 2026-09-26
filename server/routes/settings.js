const router = require('express').Router();
const Settings = require('../models/Settings');
const { protect, admin } = require('../middleware/auth');

async function getOrCreate() {
    let s = await Settings.findOne();
    if (!s) s = await Settings.create({});
    return s;
}

router.get('/', async (_req, res) => res.json(await getOrCreate()));
router.put('/', protect, admin, async (req, res) => {
    const s = await getOrCreate();
    Object.assign(s, req.body);
    await s.save();
    res.json(s);
});

module.exports = router;