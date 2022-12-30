import React from "react";
import { Link } from "react-router-dom";
import './styles.css'

const Products = (props) => {
    const product = props.items;
    return (
        <div className='product-card' key={product.id}>
            <Link className="product-link" to={`/product/${product.id}`}>
                <div>
                    <img className="product-img" src={product.imageUrl} alt={product.name} />
                </div>
                <div className='product-contents'>
                    <span className='product-name'>
                        {product.name}
                    </span>
                    <span className="product-price">
                        {product.price}원
                    </span>
                    <div className="product-seller">
                        <img className='product-avatar' src="images/icons/avatar.png" alt="avatar" />
                        <span>{product.seller}</span>
                    </div>
                </div>
            </Link>
        </div>
    )
};

export default Products;