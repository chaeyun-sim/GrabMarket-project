import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { API_URL } from "../config/constants.js"
import './styles.css'

dayjs.extend(relativeTime);  //확장 기능 호출

const Products = (props) => {
    const product = props.items;
    const date = dayjs(product.createdAt).fromNow()
    return (
        <div className='product-card' key={product.id}>
            {
                product.soldout === 1 && <div className="product-blur" />
            }
            <Link className="product-link" to={`/product/${product.id}`}>
                <div>
                    <img className="product-img" src={`${API_URL}/${product.imageUrl}`} alt={product.name} />
                </div>
                <div className='product-contents'>
                    <span className='product-name'>
                        {product.name}
                        <span>
                            {
                                product.soldout === 1 && <iframe src="https://giphy.com/embed/1rSPMeGA70UH4Uufxx" width="50" height="10" frameBorder="0" class="giphy-embed"></iframe>
                            }
                        </span>
                    </span>
                    <span className="product-price">
                        {product.price}원
                    </span>
                    <div className="product-footer">
                        <div className="product-seller">
                            <img className='product-avatar' src="images/icons/avatar.png" alt="avatar" />
                            <span>{product.seller}</span>
                        </div>
                        {/* <span className="product-date">
                            {date}
                        </span> */}
                    </div>
                </div>
            </Link>
        </div>
    )
};

export default Products;