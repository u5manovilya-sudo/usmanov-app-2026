import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Contacts() {
    const [s, setS] = useState({});
    useEffect(() => { api.get('/settings').then(r => setS(r.data)); }, []);

    return (
        <div className="container section">
            <h1>Контакты</h1>
            <p className="lead">
                Мы всегда рады помочь вам с выбором и ответить на любые вопросы.
                Свяжитесь с нами любым удобным для вас способом.
            </p>

            <div className="contacts-grid">
                <div className="card">
                    <h3>Адрес магазина</h3>
                    <p>{s.address}</p>

                    <h3>Время работы</h3>
                    <p>{s.workHours}</p>

                    <h3>Телефон</h3>
                    <p>
                        Общий телефон:{' '}
                        <a href={`tel:${(s.phone || '').replace(/[^+\d]/g, '')}`}>{s.phone}</a>
                    </p>
                    <p>Отдел корпоративных продаж: +7 (495) 000-00-01</p>
                    <p className="muted">
                        Для быстрой связи с менеджером используйте кнопку «Позвонить» на нашем сайте.
                    </p>

                    <h3>Электронная почта</h3>
                    <p>
                        Для заказов и коммерческих предложений:{' '}
                        <a href="mailto:zakaz@kancmag.ru">zakaz@kancmag.ru</a>
                    </p>
                    <p>
                        Для общих вопросов и обратной связи:{' '}
                        <a href="mailto:info@kancmag.ru">{s.email || 'info@kancmag.ru'}</a>
                    </p>
                </div>

                <div className="card">
                    <h3>Как нас найти</h3>
                    <div className="map-placeholder">
                        {s.mapEmbed ? (
                            <iframe
                                title="Карта"
                                src={s.mapEmbed}
                                style={{ width: '100%', height: 320, border: 0, borderRadius: 12 }}
                            />
                        ) : (
                            <img
                                src="/images/articles/shop-interior.jpg"
                                alt="Наш магазин"
                                className="contacts-photo"
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}