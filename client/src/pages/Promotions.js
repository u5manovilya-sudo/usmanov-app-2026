import { useEffect, useState } from 'react';
import api from '../api/axios';
import { imageUrl } from '../utils/imageUrl';

export default function Promotions() {
    const [items, setItems] = useState([]);
    useEffect(() => { api.get('/promotions').then(r => setItems(r.data)); }, []);

    return (
        <div className="container section">
            <h1>Акции и спецпредложения</h1>
            <p className="lead">Следите за нашими предложениями — мы регулярно обновляем ассортимент скидок.</p>

            <div className="grid grid-3">
                {items.map(p => {
                    const img = imageUrl(p.image);
                    return (
                        <div key={p._id} className="promo-card">
                            {img && (
                                <img
                                    className="promo-image"
                                    src={img}
                                    alt={p.title}
                                    loading="lazy"
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
        </div>
    );
}