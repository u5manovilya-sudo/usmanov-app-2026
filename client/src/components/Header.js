import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Header() {
    const { user, logout } = useAuth();
    const { count } = useCart();

    return (
        <header className="header">
            <div className="container header-inner">
                <Link to="/" className="logo">📎 КанцМагазин</Link>
                <nav className="nav">
                    <NavLink to="/about">О нас</NavLink>
                    <NavLink to="/catalog">Каталог</NavLink>
                    <NavLink to="/promotions">Акции</NavLink>
                    <NavLink to="/articles">Статьи</NavLink>
                    <NavLink to="/reviews">Отзывы</NavLink>
                    <NavLink to="/contacts">Контакты</NavLink>
                </nav>
                <div className="header-actions">
                    <Link to="/cart" className="cart-link">🛒 {count > 0 && <span className="badge">{count}</span>}</Link>
                    {user ? (
                        <>
                            <Link to={user.role === 'admin' ? '/admin' : '/profile'} className="btn btn-outline">
                                {user.name.split(' ')[0]}
                            </Link>
                            <button onClick={logout} className="btn btn-ghost">Выйти</button>
                        </>
                    ) : (
                        <Link to="/login" className="btn btn-primary">Войти</Link>
                    )}
                </div>
            </div>
        </header>
    );
}