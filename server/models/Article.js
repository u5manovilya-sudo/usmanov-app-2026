const mongoose = require('mongoose');

module.exports = mongoose.model('Article', new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: String,
    content: String,
    image: String,
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
}, { timestamps: true }));