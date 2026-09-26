import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useCart } from '../context/CartContext';

export default function Checkout() {
    const { items, total, clear } = useCart();
    const navigate = useNavigate();
    const [form, setForm] = useState({ city: '', street: '', house: '', flat: '', zip: '', phone: '', comment: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true); setError('');
        try {
            await api.post('/orders', {
                items: items.map(i => ({ product: i._id, name: i.name, price: i.price, quantity: i.quantity })),
                total,
                address: form,
                phone: form.phone,
                comment: form.comment,
            });
            clear();
            navigate('/profile');
        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка оформления');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container section">
            <h1>Оформление заказа</h1>
            {error && <p className="error">{error}</p>}
            <form className="form" onSubmit={submit}>
                <div className="grid grid-2">
                    <label>Город<input required value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} /></label>
                    <label>Улица<input required value={form.street} onChange={e => setForm({ ...form, street: e.target.value })} /></label>
                    <label>Дом<input required value={form.house} onChange={e => setForm({ ...form, house: e.target.value })} /></label>
                    <label>Квартира<input value={form.flat} onChange={e => setForm({ ...form, flat: e.target.value })} /></label>
                    <label>Индекс<input value={form.zip} onChange={e => setForm({ ...form, zip: e.target.value })} /></label>
                    <label>Телефон<input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></label>
                </div>
                <label>Комментарий<textarea value={form.comment} onChange={e => setForm({ ...form, comment: e.target.value })} /></label>
                <button className="btn btn-primary btn-lg" disabled={loading}>
                    {loading ? 'Отправка…' : `Заказать на ${total} ₽`}
                </button>
            </form>
        </div>
    );
}