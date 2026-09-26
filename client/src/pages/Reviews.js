import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Reviews() {
    const [items, setItems] = useState([]);
    const [text, setText] = useState('');
    const [rating, setRating] = useState(5);
    const { user } = useAuth();

    const load = () => api.get('/reviews').then(r => setItems(r.data));
    useEffect(() => { load(); }, []);

    const submit = async (e) => {
        e.preventDefault();
        await api.post('/reviews', { text, rating });
        setText(''); setRating(5);
        alert('Спасибо! Отзыв отправлен на модерацию.');
        load();
    };

    return (
        <div className="container section">
            <h1>Отзывы наших клиентов</h1>

            {user ? (
                <form className="form review-form" onSubmit={submit}>
                    <h3>Оставить отзыв</h3>
                    <label>Оценка
                        <select value={rating} onChange={e => setRating(+e.target.value)}>
                            {[5, 4, 3, 2, 1].map(n => <option key={n}>{n}</option>)}
                        </select>
                    </label>
                    <label>Текст отзыва
                        <textarea required value={text} onChange={e => setText(e.target.value)} />
                    </label>
                    <button className="btn btn-primary">Отправить</button>
                </form>
            ) : (
                <p className="muted">Чтобы оставить отзыв, <a href="/login">войдите</a> в личный кабинет.</p>
            )}

            <div className="reviews-list">
                {items.map(r => (
                    <div key={r._id} className="review">
                        <div className="review-head">
                            <strong>{r.user?.name || 'Покупатель'}</strong>
                            <span className="rating">{'⭐'.repeat(r.rating)}</span>
                        </div>
                        <p>{r.text}</p>
                    </div>
                ))}
                {items.length === 0 && <p className="muted">Отзывов пока нет.</p>}
            </div>
        </div>
    );
}