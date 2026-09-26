import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
    const { add } = useCart();
    return (
        <div className="product-card">
            <Link to={`/product/${product._id}`} className="product-image">
                {product.images?.[0] ? <img src={product.images[0]} alt={product.name} /> : <span>📦</span>}
            </Link>
            <div className="product-body">
                {product.isPromo && <span className="tag tag-promo">Акция</span>}
                <h3 className="product-title"><Link to={`/product/${product._id}`}>{product.name}</Link></h3>
                <p className="product-brand">{product.brand}</p>
                <div className="product-price">
                    <strong>{product.price} ₽</strong>
                    {product.oldPrice && <s>{product.oldPrice} ₽</s>}
                </div>
                <button className="btn btn-primary btn-block" onClick={() => add(product)}>В корзину</button>
            </div>
        </div>
    );
}