import { NavLink, Outlet } from 'react-router-dom';

export default function AdminLayout() {
    return (
        <div className="container section admin">
            <h1>Административная панель</h1>
            <div className="admin-layout">
                <aside className="admin-nav">
                    <NavLink to="/admin" end>Дашборд</NavLink>
                    <NavLink to="/admin/products">Товары</NavLink>
                    <NavLink to="/admin/categories">Категории</NavLink>
                    <NavLink to="/admin/orders">Заказы</NavLink>
                    <NavLink to="/admin/articles">Статьи</NavLink>
                    <NavLink to="/admin/promotions">Акции</NavLink>
                    <NavLink to="/admin/reviews">Отзывы</NavLink>
                    <NavLink to="/admin/settings">Настройки</NavLink>
                </aside>
                <div className="admin-content"><Outlet /></div>
            </div>
        </div>
    );
}