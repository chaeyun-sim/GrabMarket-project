import React from "react";
import './styles.css'

const Products = (props) => {
    const product = props.items;
    return (
        <div className='product-card' key={product.id}>
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
        </div>
    )
};

export default Products;