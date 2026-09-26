Интернет-магазин канцелярских товаров. Дипломный проект по ПМ.09
«Проектирование, разработка и оптимизация веб-приложений».

## Стек
- **Frontend:** React 18, React Router 6, Context API, Axios
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, bcrypt
- **Стили:** чистый CSS, адаптивная вёрстка

## Возможности
- Каталог с фильтрами (категория, бренд, цена, поиск, сортировка)
- Карточка товара с характеристиками и отзывами
- Корзина, оформление заказа
- Личный кабинет: профиль, адреса, история заказов
- Акции, статьи, отзывы
- Плавающая кнопка «Позвонить»
- Админ-панель: товары, категории, заказы, статьи, акции, отзывы, настройки, статистика

## Запуск проекта

### 1. Требования
- Node.js 18+
- MongoDB (локально или Atlas)

### 2. Установка
```bash
# Клонировать
git clone https://github.com/<ваш-логин>/stationery-store.git
cd stationery-store

# Backend
cd server
npm install
cp .env.example .env       # Windows: copy .env.example .env
npm run seed               # заполнить БД демо-данными
npm run dev                # http://localhost:5000

# Frontend (новый терминал)
cd ../client
npm install
npm start                  # http://localhost:3000