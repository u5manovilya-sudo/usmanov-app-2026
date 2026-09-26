import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Cart() {
    const { items, remove, setQty, total, clear } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const checkout = () => {
        if (!user) return navigate('/login');
        navigate('/checkout');
    };

    if (items.length === 0) return (
        <div className="container section">
            <h1>Корзина</h1>
            <p>Корзина пуста. <Link to="/catalog">Перейти в каталог</Link></p>
        </div>
    );

    return (
        <div className="container section">
            <h1>Корзина</h1>
            <table className="cart-table">
                <thead><tr><th>Товар</th><th>Цена</th><th>Кол-во</th><th>Сумма</th><th /></tr></thead>
                <tbody>
                    {items.map(i => (
                        <tr key={i._id}>
                            <td>{i.name}</td>
                            <td>{i.price} ₽</td>
                            <td><input type="number" min="1" value={i.quantity} onChange={e => setQty(i._id, +e.target.value)} style={{ width: 70 }} /></td>
                            <td>{i.price * i.quantity} ₽</td>
                            <td><button className="btn btn-ghost" onClick={() => remove(i._id)}>Удалить</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="cart-total">
                <strong>Итого: {total} ₽</strong>
                <div>
                    <button className="btn btn-ghost" onClick={clear}>Очистить</button>
                    <button className="btn btn-primary btn-lg" onClick={checkout}>Оформить заказ</button>
                </div>
            </div>
        </div>
    );
}