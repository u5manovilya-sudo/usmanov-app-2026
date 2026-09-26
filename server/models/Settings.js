const mongoose = require('mongoose');

module.exports = mongoose.model('Settings', new mongoose.Schema({
    phone: { type: String, default: '+7 (900) 000-00-00' },
    email: { type: String, default: 'shop@example.ru' },
    address: { type: String, default: 'г. Москва, ул. Канцелярская, д. 1' },
    mapEmbed: String,
    workHours: String,
    social: { vk: String, telegram: String, whatsapp: String },
}, { timestamps: true }));