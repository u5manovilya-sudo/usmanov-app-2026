require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');
const Article = require('./models/Article');
const Promotion = require('./models/Promotion');
const Review = require('./models/Review');
const Settings = require('./models/Settings');

(async () => {
    try {
        await connectDB();

        // ---------- Очистка ----------
        await Promise.all([
            User.deleteMany(),
            Category.deleteMany(),
            Product.deleteMany(),
            Article.deleteMany(),
            Promotion.deleteMany(),
            Review.deleteMany(),
            Settings.deleteMany(),
        ]);

        // ---------- Пользователи ----------
        const admin = await User.create({
            name: 'Администратор',
            email: 'admin@shop.ru',
            password: 'admin123',
            role: 'admin',
        });

        const ivan = await User.create({
            name: 'Иван С.',
            email: 'user@shop.ru',
            password: 'user123',
        });

        const elena = await User.create({
            name: 'Елена П.',
            email: 'elena@shop.ru',
            password: 'user123',
        });

        const alexey = await User.create({
            name: 'Алексей Р.',
            email: 'alexey@shop.ru',
            password: 'user123',
        });

        // ---------- Категории ----------
        const cats = await Category.insertMany([
            { name: 'Бумага', slug: 'bumaga' },
            { name: 'Письменные принадлежности', slug: 'pismennye' },
            { name: 'Карандаши и черчение', slug: 'karandashi' },
            { name: 'Органайзеры и хранение', slug: 'organizery' },
            { name: 'Папки и портфели', slug: 'papki' },
            { name: 'Оргтехника', slug: 'orgtehnika' },
        ]);
        const [paper, pens, pencils, organizers, folders, tech] = cats;

        // ---------- Товары ----------
        await Product.insertMany([
            {
                name: 'Набор ручек с котиками, 12 шт., 0.5 мм',
                price: 490, oldPrice: 620,
                category: pens._id, brand: 'LEX', stock: 85, isPromo: true,
                rating: 4.8, reviewsCount: 34,
                images: ['/images/products/pens-cat.jpg'],
                description: 'Стираемые гелевые ручки с милым дизайном. Идеальны для школы и творчества.',
                characteristics: {
                    'Цвет чернил': 'Ассорти (6 оттенков)',
                    'В упаковке': '12 шт.',
                    'Толщина линии': '0.5 мм',
                    'Особенность': 'Стираемые чернила',
                },
            },
            {
                name: 'Ручка шариковая Erich Krause Slender Grip, синяя',
                price: 65,
                category: pens._id, brand: 'Erich Krause', stock: 400,
                rating: 4.9, reviewsCount: 112,
                images: ['/images/products/pens-erichkrause.jpg'],
                description: 'Классическая шариковая ручка с прорезиненной манжетой Slender Grip.',
                characteristics: {
                    'Цвет чернил': 'Синий',
                    'Толщина линии': '0.7 мм',
                    'Механизм': 'Кнопочный',
                },
            },
            {
                name: 'Карандаши графитные Koh-I-Noor 1500, набор 6 шт.',
                price: 720,
                category: pencils._id, brand: 'Koh-I-Noor', stock: 60,
                rating: 4.9, reviewsCount: 48,
                images: ['/images/products/pencils-kohinoor.jpg'],
                description: 'Профессиональные графитные карандаши разных степеней твёрдости.',
                characteristics: {
                    'Твёрдость': 'HB, B, 2B, 4B, 6B, 8B',
                    'В упаковке': '6 шт.',
                },
            },
            {
                name: 'Цветные карандаши «Невская палитра», 36 цветов',
                price: 1290, oldPrice: 1490,
                category: pencils._id, brand: 'Невская палитра', stock: 25, isPromo: true,
                rating: 5.0, reviewsCount: 61,
                images: ['/images/products/pencils-nevskaya.jpg'],
                description: 'Профессиональные художественные карандаши в металлической коробке.',
                characteristics: {
                    'Количество цветов': '36',
                    'Упаковка': 'Металлический пенал',
                },
            },
            {
                name: 'Настольный органайзер, бордовый, 4 секции',
                price: 1150,
                category: organizers._id, brand: 'Attache', stock: 20,
                rating: 4.6, reviewsCount: 18,
                images: ['/images/products/organizer-burgundy.jpg'],
                description: 'Компактный органайзер для хранения канцелярии.',
                characteristics: { 'Секций': '4', 'Материал': 'Эко-кожа', 'Цвет': 'Бордовый' },
            },
            {
                name: 'Настольный органайзер, серый, 4 секции',
                price: 1150,
                category: organizers._id, brand: 'Attache', stock: 22,
                rating: 4.6, reviewsCount: 12,
                images: ['/images/products/organizer-gray.jpg'],
                description: 'Компактный органайзер для хранения канцелярии.',
                characteristics: { 'Секций': '4', 'Материал': 'Эко-кожа', 'Цвет': 'Серый' },
            },
            {
                name: 'Подставка-органайзер Brauberg, 9 секций, чёрная',
                price: 890,
                category: organizers._id, brand: 'BRAUBERG', stock: 35,
                rating: 4.7, reviewsCount: 27,
                images: ['/images/products/organizer-brauberg.jpg'],
                description: 'Практичная подставка для офиса: 9 секций.',
                characteristics: { 'Секций': '9', 'Материал': 'Пластик', 'Цвет': 'Чёрный' },
            },
            {
                name: 'Стакан-карандашница MU, бетон, серый',
                price: 780,
                category: organizers._id, brand: 'MU', stock: 15,
                rating: 4.9, reviewsCount: 9,
                images: ['/images/products/pen-holder-mu.jpg'],
                description: 'Минималистичный стакан из архитектурного бетона.',
                characteristics: { 'Материал': 'Бетон', 'Цвет': 'Серый' },
            },
            {
                name: 'Папка-портфель Erich Krause A4, чёрная',
                price: 590,
                category: folders._id, brand: 'Erich Krause', stock: 45,
                rating: 4.7, reviewsCount: 22,
                images: ['/images/products/folder-erichkrause.jpg'],
                description: 'Прочная пластиковая папка-портфель с ручкой.',
                characteristics: { 'Формат': 'A4', 'Материал': 'Пластик' },
            },
            {
                name: 'Портфель офисный серый, A4',
                price: 1890,
                category: folders._id, brand: 'Attache', stock: 12,
                rating: 4.5, reviewsCount: 8,
                images: ['/images/products/briefcase-gray.jpg'],
                description: 'Деловой портфель из ткани с кожаной отделкой.',
                characteristics: { 'Формат': 'A4', 'Цвет': 'Серый' },
            },
            {
                name: 'Портфель офисный синий, A4',
                price: 1890,
                category: folders._id, brand: 'Attache', stock: 10,
                rating: 4.5, reviewsCount: 6,
                images: ['/images/products/briefcase-blue.jpg'],
                description: 'Деловой портфель из ткани с кожаной отделкой.',
                characteristics: { 'Формат': 'A4', 'Цвет': 'Синий' },
            },
            {
                name: 'Бумага А4, 500 листов, 80 г/м²',
                price: 450, oldPrice: 550,
                category: paper._id, brand: 'SvetoCopy', stock: 120, isPromo: true,
                rating: 4.7, reviewsCount: 23,
                images: ['/images/products/paper-a4.jpg'],
                characteristics: { 'Формат': 'A4', 'Плотность': '80 г/м²', 'В упаковке': '500 л.' },
            },
            {
                name: 'МФУ лазерное HP LaserJet',
                price: 22900,
                category: tech._id, brand: 'HP', stock: 5,
                images: ['/images/products/mfu-hp.jpg'],
                characteristics: { 'Тип': 'МФУ', 'Печать': 'Ч/б' },
            },
        ]);

        // ---------- Статьи ----------
        await Article.insertMany([
            {
                title: 'Как выбрать бумагу для офиса',
                slug: 'kak-vybrat-bumagu',
                excerpt: 'Разбираем плотность, белизну и формат офисной бумаги.',
                content: 'Плотность 80 г/м² — универсальный стандарт для большинства офисных задач...',
                image: '/images/articles/shop-shelf.jpg',
                status: 'published',
            },
            {
                title: 'Организация рабочего места: подборка органайзеров',
                slug: 'organizaciya-rabochego-mesta',
                excerpt: 'Как правильно организовать пространство стола.',
                content: 'Хорошо организованное рабочее место повышает продуктивность...',
                image: '/images/articles/shop-interior.jpg',
                status: 'published',
            },
        ]);

        // ---------- Акции ----------
        await Promotion.insertMany([
            {
                title: 'Лето в разгаре!',
                description: 'Скидки до 40% на широкий ассортимент: тетради, блокноты, папки, файлы, цветная бумага и картон. Срок действия — до 31 августа.',
                discount: 40, status: 'active',
                image: '/images/promotions/summer-sale.jpg',
            },
            {
                title: 'Готовимся к 1 сентября',
                description: 'Готовые наборы для школьников и студентов. При покупке любого набора — пенал в подарок!',
                discount: 20, status: 'active',
                image: '/images/promotions/back-to-school.jpg',
            },
            {
                title: 'Скидка на объём',
                description: 'Специальные условия для офисов и организаций: 10% от 10 000 ₽, 15% от 30 000 ₽, 20% от 50 000 ₽.',
                status: 'active',
                image: '/images/promotions/volume-discount.jpg',
            },
            {
                title: 'Товар дня',
                description: 'Каждый день — товары со скидкой до 50%. Следите за обновлением на главной!',
                discount: 50, status: 'active',
                image: '/images/promotions/product-of-day.jpg',
            },
            {
                title: 'Приведи друга',
                description: 'Скидка 500 ₽ на следующий заказ за каждого приглашённого друга.',
                status: 'active',
                image: '/images/promotions/refer-friend.jpg',
            },
        ]);

        // ---------- Отзывы (одобренные, каждый от своего пользователя) ----------
        await Review.insertMany([
            {
                user: ivan._id, rating: 5, status: 'approved',
                text: 'Заказывали большую партию бумаги А4 и канцелярских наборов для всего офиса. Менеджер очень быстро обработал заказ, предложил выгодную цену с учётом опта, а доставка была на следующий же день. Все товары качественные. Теперь будем работать только с вами!',
            },
            {
                user: elena._id, rating: 5, status: 'approved',
                text: 'Нужно было срочно собрать ребенка в школу, а в обычных магазинах уже пустые полки и очереди. Нашла на вашем сайте готовый набор «Школьный базовый» — просто спасение! Заказ оформили за 5 минут, а забрали в пункте выдачи в тот же вечер. Спасибо за вашу работу!',
            },
            {
                user: alexey._id, rating: 5, status: 'approved',
                text: 'Постоянно покупаю у вас ручки, маркеры и бумагу для работы. Ассортимент всегда актуальный, цены ниже, чем у конкурентов, а сайт очень удобный. Особенно радует быстрая доставка. Однозначно рекомендую!',
            },
        ]);

        // ---------- Настройки ----------
        await Settings.create({
            phone: '+7 (495) 010-00-10',
            email: 'info@kancmag.ru',
            address: 'г. Москва, ул. Примерная, д. 10, офис 5, ТЦ «Офис-Плаза», 2 этаж',
            workHours: 'Пн–Пт: 09:00–20:00, Сб–Вс: 10:00–18:00',
            mapEmbed: '',
            social: {},
        });

        console.log('✅ База наполнена демо-данными');
        console.log(`   Пользователей: 4 (admin + 3 клиента)`);
        console.log(`   Категорий: 6`);
        console.log(`   Товаров: 13`);
        console.log(`   Акций: 5`);
        console.log(`   Отзывов: 3`);
        console.log('');
        console.log('👤 Админ:    admin@shop.ru / admin123');
        console.log('👤 Клиент:   user@shop.ru  / user123');
    } catch (err) {
        console.error('❌ Ошибка:', err.message);
        console.error(err.stack);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
})();