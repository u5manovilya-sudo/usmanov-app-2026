import { useEffect, useState } from 'react';
import api from '../../api/axios';

const EMPTY = { title: '', slug: '', excerpt: '', content: '', status: 'draft' };

export default function ArticlesAdmin() {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState(EMPTY);
    const [editing, setEditing] = useState(null);

    const load = () => api.get('/articles?all=1').then(r => setItems(r.data));
    useEffect(load, []);

    const submit = async (e) => {
        e.preventDefault();
        if (editing) await api.put(`/articles/${editing}`, form);
        else await api.post('/articles', form);
        setForm(EMPTY); setEditing(null); load();
    };

    const edit = (a) => { setEditing(a._id); setForm(a); };
    const remove = async (id) => { if (window.confirm('Удалить?')) { await api.delete(`/articles/${id}`); load(); } };

    return (
        <div>
            <h2>Статьи</h2>
            <form className="form" onSubmit={submit}>
                <div className="grid grid-2">
                    <label>Заголовок<input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></label>
                    <label>Slug<input required value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} /></label>
                </div>
                <label>Краткое описание<textarea value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} /></label>
                <label>Содержание<textarea rows={6} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} /></label>
                <label>Статус
                    <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                        <option value="draft">Черновик</option>
                        <option value="published">Опубликована</option>
                        <option value="archived">В архиве</option>
                    </select>
                </label>
                <button className="btn btn-primary">{editing ? 'Обновить' : 'Добавить'}</button>
                {editing && <button type="button" className="btn btn-ghost" onClick={() => { setEditing(null); setForm(EMPTY); }}>Отмена</button>}
            </form>
            <table className="admin-table">
                <thead><tr><th>Заголовок</th><th>Статус</th><th /></tr></thead>
                <tbody>{items.map(a => (
                    <tr key={a._id}><td>{a.title}</td><td>{a.status}</td>
                        <td><button className="btn btn-outline" onClick={() => edit(a)}>Ред.</button>
                            <button className="btn btn-ghost" onClick={() => remove(a._id)}>Удал.</button></td>
                    </tr>))}
                </tbody>
            </table>
        </div>
    );
}