import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';

export default function Catalog() {
    const [params, setParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    const filters = Object.fromEntries(params.entries());

    useEffect(() => {
        api.get('/categories').then(r => setCategories(r.data));
        api.get('/products/brands').then(r => setBrands(r.data));
    }, []);

    useEffect(() => {
        const q = new URLSearchParams(filters).toString();
        api.get(`/products?${q}`).then(r => setProducts(r.data));
    }, [params]);

    const update = (k, v) => {
        const next = new URLSearchParams(params);
        v ? next.set(k, v) : next.delete(k);
        setParams(next);
    };

    return (
        <div className="container section">
            <h1>Каталог</h1>
            <div className="catalog-layout">
                <aside className="filters">
                    <h3>Фильтры</h3>
                    <label>Поиск<input value={filters.search || ''} onChange={e => update('search', e.target.value)} /></label>
                    <label>Категория
                        <select value={filters.category || ''} onChange={e => update('category', e.target.value)}>
                            <option value="">Все</option>
                            {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                        </select>
                    </label>
                    <label>Бренд
                        <select value={filters.brand || ''} onChange={e => update('brand', e.target.value)}>
                            <option value="">Все</option>
                            {brands.map(b => <option key={b}>{b}</option>)}
                        </select>
                    </label>
                    <label>Цена от<input type="number" value={filters.minPrice || ''} onChange={e => update('minPrice', e.target.value)} /></label>
                    <label>Цена до<input type="number" value={filters.maxPrice || ''} onChange={e => update('maxPrice', e.target.value)} /></label>
                    <label>Сортировка
                        <select value={filters.sort || ''} onChange={e => update('sort', e.target.value)}>
                            <option value="">По новизне</option>
                            <option value="price_asc">Цена ↑</option>
                            <option value="price_desc">Цена ↓</option>
                            <option value="rating">По рейтингу</option>
                        </select>
                    </label>
                    <button className="btn btn-ghost btn-block" onClick={() => setParams({})}>Сбросить</button>
                </aside>

                <div>
                    <p className="muted">Найдено: {products.length}</p>
                    <div className="grid grid-3">
                        {products.map(p => <ProductCard key={p._id} product={p} />)}
                    </div>
                    {products.length === 0 && <p>Ничего не найдено</p>}
                </div>
            </div>
        </div>
    );
}