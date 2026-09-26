import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
    const [err, setErr] = useState(''); const { login } = useAuth(); const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault(); setErr('');
        try { await login(email, password); navigate('/'); }
        catch (e) { setErr(e.response?.data?.message || 'Ошибка'); }
    };

    return (
        <div className="container section narrow">
            <h1>Вход</h1>
            {err && <p className="error">{err}</p>}
            <form className="form" onSubmit={submit}>
                <label>Email<input type="email" required value={email} onChange={e => setEmail(e.target.value)} /></label>
                <label>Пароль<input type="password" required value={password} onChange={e => setPassword(e.target.value)} /></label>
                <button className="btn btn-primary btn-block">Войти</button>
            </form>
            <p>Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></p>
        </div>
    );
}