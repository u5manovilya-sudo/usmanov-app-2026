const mongoose = require('mongoose');

module.exports = mongoose.model('Promotion', new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    image: String,
    discount: Number,
    startDate: Date,
    endDate: Date,
    status: { type: String, enum: ['active', 'archived'], default: 'active' },
}, { timestamps: true }));