const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    oldPrice: Number,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    brand: String,
    images: [String],
    stock: { type: Number, default: 0 },
    characteristics: { type: Map, of: String },
    isPromo: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
}, { timestamps: true });

productSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);