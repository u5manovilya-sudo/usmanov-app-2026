import { imageUrl } from '../utils/imageUrl';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [promos, setPromos] = useState([]);
    useEffect(() => {
        api.get('/products?promo=true').then(r => setProducts(r.data.slice(0, 4)));
        api.get('/promotions').then(r => setPromos(r.data));
    }, []);

    return (
        <>
            <section className="hero">
                <div className="container">
                    <h1>Канцелярия для офиса и учёбы</h1>
                    <p>Бумага, ручки, оргтехника и всё для продуктивной работы. Доставка по всей России.</p>
                    <Link to="/catalog" className="btn btn-primary btn-lg">Перейти в каталог</Link>
                </div>
            </section>

            {promos.length > 0 && (
                <section className="container section">
                    <h2>🔥 Акции</h2>
                    <div className="grid grid-3">
                        {promos.map(p => {
                            const img = imageUrl(p.image);
                            return (
                                <div key={p._id} className="promo-card">
                                    {img && (
                                        <img
                                            className="promo-image"
                                            src={img}
                                            alt={p.title}
                                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                        />
                                    )}
                                    <div className="promo-body">
                                        <h3>{p.title}</h3>
                                        <p>{p.description}</p>
                                        {p.discount && <span className="tag tag-promo">−{p.discount}%</span>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}

            <section className="container section">
                <h2>Акционные товары</h2>
                <div className="grid grid-4">
                    {products.map(p => <ProductCard key={p._id} product={p} />)}
                </div>
            </section>

            <section className="container section features">
                <div className="feature"><span>🚚</span><h3>Быстрая доставка</h3><p>От 1 дня по Москве</p></div>
                <div className="feature"><span>💳</span><h3>Удобная оплата</h3><p>Карта, наличные, счёт</p></div>
                <div className="feature"><span>🏢</span><h3>Для организаций</h3><p>Работаем с юрлицами</p></div>
                <div className="feature"><span>📞</span><h3>Поддержка</h3><p>Всегда на связи</p></div>
            </section>
        </>
    );
}
