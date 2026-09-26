import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Profile() {
    const { user, setUser } = useAuth();
    const { add } = useCart();
    const [orders, setOrders] = useState([]);
    const [form, setForm] = useState({ name: user.name, phone: user.phone || '', password: '' });
    const [addr, setAddr] = useState({ title: '', city: '', street: '', house: '', flat: '', zip: '' });
    const [me, setMe] = useState(null);

    const load = () => {
        api.get('/orders/my').then(r => setOrders(r.data));
        api.get('/auth/me').then(r => setMe(r.data));
    };
    useEffect(load, []);

    const save = async (e) => {
        e.preventDefault();
        const { data } = await api.put('/auth/me', form);
        setUser(data); alert('Сохранено');
    };

    const addAddr = async (e) => {
        e.preventDefault();
        await api.post('/auth/me/addresses', addr);
        setAddr({ title: '', city: '', street: '', house: '', flat: '', zip: '' });
        load();
    };

    const delAddr = async (id) => {
        await api.delete(`/auth/me/addresses/${id}`);
        load();
    };

    const repeat = (order) => {
        order.items.forEach(i => add({ _id: i.product, name: i.name, price: i.price }, i.quantity));
        alert('Товары добавлены в корзину');
    };

    return (
        <div className="container section">
            <h1>Личный кабинет</h1>

            <section>
                <h2>Личные данные</h2>
                <form className="form" onSubmit={save}>
                    <div className="grid grid-2">
                        <label>ФИО<input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></label>
                        <label>Телефон<input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></label>
                        <label>Новый пароль<input type="password" placeholder="оставьте пустым" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} /></label>
                    </div>
                    <button className="btn btn-primary">Сохранить</button>
                </form>
            </section>

            <section>
                <h2>Адреса доставки</h2>
                {me?.addresses?.map(a => (
                    <div key={a._id} className="address-row">
                        <span>{a.title}: {a.city}, {a.street} {a.house}{a.flat && `, кв. ${a.flat}`}</span>
                        <button className="btn btn-ghost" onClick={() => delAddr(a._id)}>Удалить</button>
                    </div>
                ))}
                <form className="form" onSubmit={addAddr}>
                    <div className="grid grid-3">
                        <input placeholder="Название" value={addr.title} onChange={e => setAddr({ ...addr, title: e.target.value })} />
                        <input placeholder="Город" value={addr.city} onChange={e => setAddr({ ...addr, city: e.target.value })} />
                        <input placeholder="Улица" value={addr.street} onChange={e => setAddr({ ...addr, street: e.target.value })} />
                        <input placeholder="Дом" value={addr.house} onChange={e => setAddr({ ...addr, house: e.target.value })} />
                        <input placeholder="Кв." value={addr.flat} onChange={e => setAddr({ ...addr, flat: e.target.value })} />
                        <input placeholder="Индекс" value={addr.zip} onChange={e => setAddr({ ...addr, zip: e.target.value })} />
                    </div>
                    <button className="btn btn-outline">Добавить адрес</button>
                </form>
            </section>

            <section>
                <h2>История заказов</h2>
                {orders.length === 0 && <p className="muted">Заказов пока нет</p>}
                {orders.map(o => (
                    <div key={o._id} className="order-card">
                        <div className="order-head">
                            <strong>Заказ от {new Date(o.createdAt).toLocaleDateString('ru-RU')}</strong>
                            <span className={`status status-${o.status}`}>{o.status}</span>
                        </div>
                        <ul>
                            {o.items.map((i, idx) => <li key={idx}>{i.name} × {i.quantity} = {i.price * i.quantity} ₽</li>)}
                        </ul>
                        <p><strong>Итого: {o.total} ₽</strong></p>
                        <button className="btn btn-outline" onClick={() => repeat(o)}>Повторить покупку</button>
                    </div>
                ))}
            </section>
        </div>
    );
}