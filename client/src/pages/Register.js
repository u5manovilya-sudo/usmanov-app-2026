import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
    const [err, setErr] = useState(''); const { register } = useAuth(); const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault(); setErr('');
        try { await register(form); navigate('/'); }
        catch (e) { setErr(e.response?.data?.message || 'Ошибка'); }
    };

    return (
        <div className="container section narrow">
            <h1>Регистрация</h1>
            {err && <p className="error">{err}</p>}
            <form className="form" onSubmit={submit}>
                <label>ФИО<input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></label>
                <label>Email<input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></label>
                <label>Телефон<input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></label>
                <label>Пароль<input type="password" required minLength={6} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} /></label>
                <button className="btn btn-primary btn-block">Зарегистрироваться</button>
            </form>
            <p>Уже есть аккаунт? <Link to="/login">Войти</Link></p>
        </div>
    );
}