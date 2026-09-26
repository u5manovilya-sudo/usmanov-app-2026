import { useEffect, useState } from 'react';
import api from '../../api/axios';

const EMPTY = { name: '', price: 0, oldPrice: '', category: '', brand: '', stock: 0, isPromo: false, description: '', images: [] };

export default function ProductsAdmin() {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState(EMPTY);
    const [editing, setEditing] = useState(null);
    const [chars, setChars] = useState('');

    const load = () => api.get('/products').then(r => setItems(r.data));
    useEffect(() => { load(); api.get('/categories').then(r => setCategories(r.data)); }, []);

    const startEdit = (p) => {
        setEditing(p._id);
        setForm({ ...p, images: p.images || [] });
        setChars(Object.entries(p.characteristics || {}).map(([k, v]) => `${k}:${v}`).join('\n'));
    };

    const reset = () => { setEditing(null); setForm(EMPTY); setChars(''); };

    const submit = async (e) => {
        e.preventDefault();
        const characteristics = {};
        chars.split('\n').forEach(line => {
            const [k, ...rest] = line.split(':');
            if (k && rest.length) characteristics[k.trim()] = rest.join(':').trim();
        });
        const payload = { ...form, price: +form.price, stock: +form.stock, characteristics };
        if (editing) await api.put(`/products/${editing}`, payload);
        else await api.post('/products', payload);
        reset(); load();
    };

    const remove = async (id) => {
        if (!window.confirm('Удалить товар?')) return;
        await api.delete(`/products/${id}`); load();
    };

    return (
        <div>
            <h2>Управление товарами</h2>
            <form className="form admin-form" onSubmit={submit}>
                <div className="grid grid-2">
                    <label>Название<input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></label>
                    <label>Категория
                        <select required value={form.category?._id || form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                            <option value="">— выберите —</option>
                            {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                        </select>
                    </label>
                    <label>Бренд<input value={form.brand || ''} onChange={e => setForm({ ...form, brand: e.target.value })} /></label>
                    <label>Цена<input type="number" required value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} /></label>
                    <label>Старая цена<input type="number" value={form.oldPrice || ''} onChange={e => setForm({ ...form, oldPrice: e.target.value })} /></label>
                    <label>Остаток<input type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} /></label>
                </div>
                <label>Описание<textarea value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} /></label>
                <label>Характеристики (по одной в строке, формат «Ключ:Значение»)
                    <textarea value={chars} onChange={e => setChars(e.target.value)} placeholder="Формат:A4&#10;Плотность:80 г/м²" />
                </label>
                <label className="checkbox"><input type="checkbox" checked={form.isPromo} onChange={e => setForm({ ...form, isPromo: e.target.checked })} /> Акционный товар</label>
                <div>
                    <button className="btn btn-primary">{editing ? 'Обновить' : 'Добавить'}</button>
                    {editing && <button type="button" className="btn btn-ghost" onClick={reset}>Отмена</button>}
                </div>
            </form>

            <table className="admin-table">
                <thead><tr><th>Название</th><th>Цена</th><th>Остаток</th><th>Категория</th><th /></tr></thead>
                <tbody>
                    {items.map(p => (
                        <tr key={p._id}>
                            <td>{p.name}</td>
                            <td>{p.price} ₽</td>
                            <td>{p.stock}</td>
                            <td>{p.category?.name}</td>
                            <td>
                                <button className="btn btn-outline" onClick={() => startEdit(p)}>Ред.</button>
                                <button className="btn btn-ghost" onClick={() => remove(p._id)}>Удал.</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}