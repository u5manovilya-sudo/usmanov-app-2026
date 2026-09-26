import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
    const { id } = useParams();
    const [p, setP] = useState(null);
    const [reviews, setReviews] = useState([]);
    const { add } = useCart();

    useEffect(() => {
        api.get(`/products/${id}`).then(r => setP(r.data));
        api.get(`/reviews?product=${id}`).then(r => setReviews(r.data));
    }, [id]);

    if (!p) return <div className="container section">Загрузка…</div>;

    return (
        <div className="container section">
            <div className="product-detail">
                <div className="product-detail-image">
                    {p.images?.[0] ? <img src={p.images[0]} alt={p.name} /> : <span>📦</span>}
                </div>
                <div className="product-detail-info">
                    <h1>{p.name}</h1>
                    <p className="muted">{p.brand}</p>
                    <p className="rating">⭐ {p.rating} ({p.reviewsCount} отзывов)</p>
                    <div className="product-price big">
                        <strong>{p.price} ₽</strong>
                        {p.oldPrice && <s>{p.oldPrice} ₽</s>}
                    </div>
                    <p>{p.description}</p>
                    <button className="btn btn-primary btn-lg" onClick={() => add(p)}>В корзину</button>

                    {p.characteristics && Object.keys(p.characteristics).length > 0 && (
                        <div className="characteristics">
                            <h3>Характеристики</h3>
                            <table>
                                <tbody>
                                    {Object.entries(p.characteristics).map(([k, v]) => (
                                        <tr key={k}><td>{k}</td><td>{v}</td></tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            <section className="section">
                <h2>Отзывы</h2>
                {reviews.length === 0 && <p className="muted">Отзывов пока нет</p>}
                {reviews.map(r => (
                    <div key={r._id} className="review">
                        <strong>{r.user?.name}</strong> <span className="rating">⭐ {r.rating}</span>
                        <p>{r.text}</p>
                    </div>
                ))}
            </section>
        </div>
    );
}