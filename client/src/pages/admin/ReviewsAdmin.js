import { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function ReviewsAdmin() {
    const [items, setItems] = useState([]);
    const load = () => api.get('/reviews/all').then(r => setItems(r.data));
    useEffect(load, []);

    const setStatus = async (id, status) => { await api.put(`/reviews/${id}/status`, { status }); load(); };
    const remove = async (id) => { await api.delete(`/reviews/${id}`); load(); };

    return (
        <div>
            <h2>Модерация отзывов</h2>
            {items.map(r => (
                <div key={r._id} className="review admin-review">
                    <p><b>{r.user?.name}</b> — ⭐ {r.rating} — <span className={`status status-${r.status}`}>{r.status}</span></p>
                    <p>{r.text}</p>
                    <div>
                        {r.status !== 'approved' && <button className="btn btn-primary" onClick={() => setStatus(r._id, 'approved')}>Одобрить</button>}
                        {r.status !== 'rejected' && <button className="btn btn-ghost" onClick={() => setStatus(r._id, 'rejected')}>Отклонить</button>}
                        <button className="btn btn-ghost" onClick={() => remove(r._id)}>Удалить</button>
                    </div>
                </div>
            ))}
        </div>
    );
}