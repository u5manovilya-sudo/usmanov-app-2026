import { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function CategoriesAdmin() {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState({ name: '', slug: '' });
    const [editing, setEditing] = useState(null);

    const load = () => api.get('/categories').then(r => setItems(r.data));
    useEffect(load, []);

    const submit = async (e) => {
        e.preventDefault();
        if (editing) await api.put(`/categories/${editing}`, form);
        else await api.post('/categories', form);
        setForm({ name: '', slug: '' }); setEditing(null); load();
    };

    const edit = (c) => { setEditing(c._id); setForm({ name: c.name, slug: c.slug }); };
    const remove = async (id) => { if (window.confirm('Удалить?')) { await api.delete(`/categories/${id}`); load(); } };

    return (
        <div>
            <h2>Категории</h2>
            <form className="form" onSubmit={submit}>
                <div className="grid grid-2">
                    <label>Название<input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value, slug: form.slug || e.target.value.toLowerCase().replace(/\s+/g, '-') })} /></label>
                    <label>Slug<input required value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} /></label>
                </div>
                <button className="btn btn-primary">{editing ? 'Обновить' : 'Добавить'}</button>
                {editing && <button type="button" className="btn btn-ghost" onClick={() => { setEditing(null); setForm({ name: '', slug: '' }); }}>Отмена</button>}
            </form>
            <table className="admin-table">
                <thead><tr><th>Название</th><th>Slug</th><th /></tr></thead>
                <tbody>{items.map(c => (
                    <tr key={c._id}><td>{c.name}</td><td>{c.slug}</td>
                        <td><button className="btn btn-outline" onClick={() => edit(c)}>Ред.</button>
                            <button className="btn btn-ghost" onClick={() => remove(c._id)}>Удал.</button></td>
                    </tr>))}
                </tbody>
            </table>
        </div>
    );
}