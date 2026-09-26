const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    quantity: Number,
}, { _id: false });

module.exports = mongoose.model('Order', new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [itemSchema],
    total: Number,
    status: {
        type: String,
        enum: ['Принят в обработку', 'Передан в службу доставки', 'Доставлен', 'Отменён'],
        default: 'Принят в обработку',
    },
    address: { city: String, street: String, house: String, flat: String, zip: String },
    phone: String,
    comment: String,
}, { timestamps: true }));