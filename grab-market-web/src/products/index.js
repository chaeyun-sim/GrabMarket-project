import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "./index.css"

dayjs.extend(relativeTime);  //확장 기능 호출

const ProductsPage = () => {
    const [product, setProduct] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8080/products/${id}`)
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
    return (
        <div>
            <div id="image-box">
                <img src={'/' + product.imageUrl} alt="product" />
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
                    {dayjs(product.createdAt).fromNow()}
                </div>
                <div id="description">
                    {product.description}
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;