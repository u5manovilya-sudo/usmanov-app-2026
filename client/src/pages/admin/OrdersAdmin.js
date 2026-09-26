import { useEffect, useState } from 'react';
import api from '../../api/axios';

const STATUSES = ['Принят в обработку', 'Передан в службу доставки', 'Доставлен', 'Отменён'];

export default function OrdersAdmin() {
    const [items, setItems] = useState([]);
    const load = () => api.get('/orders').then(r => setItems(r.data));
    useEffect(load, []);

    const changeStatus = async (id, status) => { await api.put(`/orders/${id}/status`, { status }); load(); };

    return (
        <div>
            <h2>Заказы</h2>
            {items.map(o => (
                <div key={o._id} className="order-card">
                    <div className="order-head">
                        <strong>#{o._id.slice(-6)}</strong>
                        <span>{new Date(o.createdAt).toLocaleString('ru-RU')}</span>
                        <select value={o.status} onChange={e => changeStatus(o._id, e.target.value)}>
                            {STATUSES.map(s => <option key={s}>{s}</option>)}
                        </select>
                    </div>
                    <p><b>Клиент:</b> {o.user?.name} ({o.user?.email}, {o.user?.phone})</p>
                    <p><b>Адрес:</b> {o.address?.city}, {o.address?.street} {o.address?.house}{o.address?.flat && `, кв. ${o.address.flat}`}</p>
                    <ul>{o.items.map((i, idx) => <li key={idx}>{i.name} × {i.quantity} = {i.price * i.quantity} ₽</li>)}</ul>
                    <p><b>Итого: {o.total} ₽</b></p>
                </div>
            ))}
        </div>
    );
}