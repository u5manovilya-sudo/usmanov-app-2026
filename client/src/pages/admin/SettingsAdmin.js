import { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function SettingsAdmin() {
    const [form, setForm] = useState({});
    const [ok, setOk] = useState(false);
    useEffect(() => { api.get('/settings').then(r => setForm(r.data)); }, []);

    const submit = async (e) => {
        e.preventDefault();
        const { data } = await api.put('/settings', form);
        setForm(data); setOk(true); setTimeout(() => setOk(false), 2000);
    };

    return (
        <div>
            <h2>Настройки магазина</h2>
            {ok && <p className="success">Сохранено ✓</p>}
            <form className="form" onSubmit={submit}>
                <div className="grid grid-2">
                    <label>Телефон (для кнопки «Позвонить»)<input value={form.phone || ''} onChange={e => setForm({ ...form, phone: e.target.value })} /></label>
                    <label>Email<input value={form.email || ''} onChange={e => setForm({ ...form, email: e.target.value })} /></label>
                    <label>Адрес<input value={form.address || ''} onChange={e => setForm({ ...form, address: e.target.value })} /></label>
                    <label>Часы работы<input value={form.workHours || ''} onChange={e => setForm({ ...form, workHours: e.target.value })} /></label>
                </div>
                <label>Ссылка карты (iframe embed)<textarea value={form.mapEmbed || ''} onChange={e => setForm({ ...form, mapEmbed: e.target.value })} /></label>
                <button className="btn btn-primary">Сохранить</button>
            </form>
        </div>
    );
}