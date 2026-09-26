import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
    const [items, setItems] = useState(() => JSON.parse(localStorage.getItem('cart') || '[]'));

    useEffect(() => { localStorage.setItem('cart', JSON.stringify(items)); }, [items]);

    const add = (product, quantity = 1) => {
        setItems(prev => {
            const found = prev.find(i => i._id === product._id);
            if (found) return prev.map(i => i._id === product._id ? { ...i, quantity: i.quantity + quantity } : i);
            return [...prev, { _id: product._id, name: product.name, price: product.price, image: product.images?.[0], quantity }];
        });
    };
    const remove = (id) => setItems(prev => prev.filter(i => i._id !== id));
    const setQty = (id, quantity) => setItems(prev => prev.map(i => i._id === id ? { ...i, quantity } : i));
    const clear = () => setItems([]);
    const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
    const count = items.reduce((s, i) => s + i.quantity, 0);

    return (
        <CartContext.Provider value={{ items, add, remove, setQty, clear, total, count }}>
            {children}
        </CartContext.Provider>
    );
}