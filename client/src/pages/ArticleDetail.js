import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';

export default function ArticleDetail() {
    const { slug } = useParams();
    const [a, setA] = useState(null);
    useEffect(() => { api.get(`/articles/${slug}`).then(r => setA(r.data)); }, [slug]);
    if (!a) return <div className="container section">Загрузка…</div>;
    return (
        <article className="container section article">
            <h1>{a.title}</h1>
            <p className="muted">{new Date(a.createdAt).toLocaleDateString('ru-RU')}</p>
            <p className="lead">{a.excerpt}</p>
            <div>{a.content}</div>
        </article>
    );
}