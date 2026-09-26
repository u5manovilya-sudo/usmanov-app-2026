import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function FloatingCallButton() {
    const [phone, setPhone] = useState('');
    useEffect(() => { api.get('/settings').then(r => setPhone(r.data.phone)).catch(() => { }); }, []);
    if (!phone) return null;
    const clean = phone.replace(/[^+\d]/g, '');
    return (
        <a href={`tel:${clean}`} className="floating-call" title={`Позвонить: ${phone}`}>
            📞 <span className="floating-call-text">Позвонить</span>
        </a>
    );
}