import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "./index.css"
import { API_URL } from "../config/constants.js"

dayjs.extend(relativeTime);  //확장 기능 호출

const ProductsPage = () => {
    const [product, setProduct] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        axios.get(`${API_URL}/products/${id}`)
        .then((result) => { 
            setProduct(result.data.product)
        }).catch((err) => {
            console.error(err)
        })
    }, []);
    // console.log(product.id)

    if(product === null){
        return <h2 id="loading">상품 정보를 받고 있습니다....</h2>
    }

    console.log('')
    return (
        <div>
            <div id="image-box">
                <img src={`${API_URL}/${product.imageUrl}`} alt="product" />
            </div>
            <div id="profile-box">
                <img src="/images/icons/avatar.png" alt="avatar" />
                <span>{product.seller}</span>
            </div>
            <div id="contents-box">
                <div id="name">
                    {product.name}
                </div>
                <div id="price">
                    {product.price}
                </div>
                <div id="createdAt">
                    {dayjs(product.createdAt).format('YYYY년 MM월 DD일')}
                </div>
                <pre id="description">
                    {product.description}
                </pre>
            </div>
        </div>
    );
};

export default ProductsPage;