import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export default function Articles() {
    const [items, setItems] = useState([]);
    useEffect(() => { api.get('/articles').then(r => setItems(r.data)); }, []);
    return (
        <div className="container section">
            <h1>Полезные статьи</h1>
            <div className="grid grid-3">
                {items.map(a => (
                    <article key={a._id} className="card">
                        <h3><Link to={`/articles/${a.slug}`}>{a.title}</Link></h3>
                        <p>{a.excerpt}</p>
                    </article>
                ))}
            </div>
        </div>
    );
}