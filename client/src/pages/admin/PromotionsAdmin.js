import { useEffect, useState } from 'react';
import api from '../../api/axios';

const EMPTY = { title: '', description: '', discount: 0, status: 'active' };

export default function PromotionsAdmin() {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState(EMPTY);
    const [editing, setEditing] = useState(null);

    const load = () => api.get('/promotions?all=1').then(r => setItems(r.data));
    useEffect(load, []);

    const submit = async (e) => {
        e.preventDefault();
        const payload = { ...form, discount: +form.discount };
        if (editing) await api.put(`/promotions/${editing}`, payload);
        else await api.post('/promotions', payload);
        setForm(EMPTY); setEditing(null); load();
    };

    const remove = async (id) => { if (window.confirm('Удалить?')) { await api.delete(`/promotions/${id}`); load(); } };
    const edit = (p) => { setEditing(p._id); setForm(p); };

    return (
        <div>
            <h2>Акции</h2>
            <form className="form" onSubmit={submit}>
                <div className="grid grid-2">
                    <label>Заголовок<input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></label>
                    <label>Скидка (%)<input type="number" value={form.discount} onChange={e => setForm({ ...form, discount: e.target.value })} /></label>
                </div>
                <label>Описание<textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></label>
                <label>Статус
                    <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                        <option value="active">Активна</option>
                        <option value="archived">В архиве</option>
                    </select>
                </label>
                <button className="btn btn-primary">{editing ? 'Обновить' : 'Добавить'}</button>
            </form>
            <table className="admin-table">
                <thead><tr><th>Заголовок</th><th>Скидка</th><th>Статус</th><th /></tr></thead>
                <tbody>{items.map(p => (
                    <tr key={p._id}><td>{p.title}</td><td>{p.discount}%</td><td>{p.status}</td>
                        <td><button className="btn btn-outline" onClick={() => edit(p)}>Ред.</button>
                            <button className="btn btn-ghost" onClick={() => remove(p._id)}>Удал.</button></td>
                    </tr>))}
                </tbody>
            </table>
        </div>
    );
}