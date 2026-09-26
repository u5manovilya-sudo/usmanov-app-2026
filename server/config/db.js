const mongoose = require('mongoose');

module.exports = async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB подключена');
    } catch (err) {
        console.error('❌ Ошибка MongoDB:', err.message);
        process.exit(1);
    }
};