/**
 * ѕреобразует путь к изображению:
 * - внешние URL (http/https) оставл€ет без изменений
 * - относительные пути /images/... отдаЄт как есть
 * - undefined/null превращает в пустую строку
 */
export function imageUrl(path) {
    if (!path) return '';
    if (/^https?:\/\//i.test(path)) return path;
    return path.startsWith('/') ? path : `/${path}`;
}