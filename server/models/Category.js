const mongoose = require('mongoose');

module.exports = mongoose.model('Category', new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: String,
}, { timestamps: true }));