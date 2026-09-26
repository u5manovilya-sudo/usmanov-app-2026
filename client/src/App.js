import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingCallButton from './components/FloatingCallButton';
import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home';
import About from './pages/About';
import Contacts from './pages/Contacts';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import Promotions from './pages/Promotions';
import Reviews from './pages/Reviews';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ProductsAdmin from './pages/admin/ProductsAdmin';
import CategoriesAdmin from './pages/admin/CategoriesAdmin';
import OrdersAdmin from './pages/admin/OrdersAdmin';
import ArticlesAdmin from './pages/admin/ArticlesAdmin';
import PromotionsAdmin from './pages/admin/PromotionsAdmin';
import ReviewsAdmin from './pages/admin/ReviewsAdmin';
import SettingsAdmin from './pages/admin/SettingsAdmin';

export default function App() {
    return (
        <>
            <Header />
            <main className="main">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
                    <Route path="/articles" element={<Articles />} />
                    <Route path="/articles/:slug" element={<ArticleDetail />} />
                    <Route path="/promotions" element={<Promotions />} />
                    <Route path="/reviews" element={<Reviews />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

                    <Route path="/admin" element={<PrivateRoute adminOnly><AdminLayout /></PrivateRoute>}>
                        <Route index element={<Dashboard />} />
                        <Route path="products" element={<ProductsAdmin />} />
                        <Route path="categories" element={<CategoriesAdmin />} />
                        <Route path="orders" element={<OrdersAdmin />} />
                        <Route path="articles" element={<ArticlesAdmin />} />
                        <Route path="promotions" element={<PromotionsAdmin />} />
                        <Route path="reviews" element={<ReviewsAdmin />} />
                        <Route path="settings" element={<SettingsAdmin />} />
                    </Route>
                </Routes>
            </main>
            <Footer />
            <FloatingCallButton />
        </>
    );
}