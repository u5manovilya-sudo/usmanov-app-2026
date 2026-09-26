import { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function Dashboard() {
    const [s, setS] = useState(null);
    useEffect(() => { api.get('/stats').then(r => setS(r.data)); }, []);
    if (!s) return <p>Загрузка…</p>;
    return (
        <div>
            <h2>Статистика</h2>
            <div className="grid grid-4">
                <div className="stat"><strong>{s.totals.orders}</strong><span>Заказов</span></div>
                <div className="stat"><strong>{s.totals.revenue.toLocaleString('ru-RU')} ₽</strong><span>Выручка</span></div>
                <div className="stat"><strong>{s.totals.products}</strong><span>Товаров</span></div>
                <div className="stat"><strong>{s.totals.users}</strong><span>Пользователей</span></div>
            </div>

            <h3>По статусам</h3>
            <ul>
                {Object.entries(s.byStatus).map(([k, v]) => <li key={k}>{k}: <b>{v}</b></li>)}
            </ul>

            <h3>Топ товаров</h3>
            <ol>{s.topProducts.map(p => <li key={p.name}>{p.name} — {p.qty} шт.</li>)}</ol>
        </div>
    );
}