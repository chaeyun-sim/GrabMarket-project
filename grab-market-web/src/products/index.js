import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios";
import dayjs from "dayjs";
import { Button, message } from "antd";
import relativeTime from "dayjs/plugin/relativeTime";
import "./index.css"
import { API_URL } from "../config/constants.js"
import Products from "../components/ProductsList";

dayjs.extend(relativeTime);  //확장 기능 호출

const ProductsPage = () => {
    const [product, setProduct] = useState(null);
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [sellersProduct, setSellersProduct] = useState([]);

    const {id} = useParams();
    const navigate = useNavigate();

    const getProduct = () => {
        axios.get(`${API_URL}/products/${id}`)
        .then((result) => { 
            setProduct(result.data.product)
            console.log(result.data.product)
        }).catch((err) => {
            console.error(err)
        })
    };

    const getRecommendation = () => {
        axios.get(`${API_URL}/products/${id}/recommendation`).then((result) => {
            setRecommendedProducts(result.data.products);
        }).catch((err) => {
            console.error(err);
        })
    };

    const getSeller = () => {
        axios.get(`${API_URL}/products/${id}/seller`).then((result) => {
            setSellersProduct(result.data.products)
        }).catch((err) => {
            console.error(err);
        })
    }

    useEffect(() => {
        getProduct();
        getRecommendation();
        getSeller();
    }, [id]);

    if(product === null){
        return <h2 id="loading">상품 정보를 받고 있습니다....</h2>
    };

    const onClickPurchase = () => {
        axios.post(`${API_URL}/purchase/${id}`).then((result) => {
            message.info('구매가 완료되었습니다!')
            getProduct();
            navigate('/');
        }).catch((err) => {
            message.error(err.message)
        })
    };

    return (
        <div>
            <div id="image-box">
                <img src={`${API_URL}/${product.imageUrl}`} alt="product" />
            </div>
            <div id="overline">
                <div id="purchase-box">
                    <Button
                        id="purchase-button"
                        size="large"
                        type="primary"
                        danger
                        onClick={onClickPurchase}
                        disabled={product.soldout === 1 ? true : false}
                    >
                        {product.soldout === 0 ? "구매하기" : "품절"}
                    </Button>
                </div>
                <div id="profile-box">
                    <img src="/images/icons/avatar.png" alt="avatar" />
                    <span>{product.seller}</span>
                </div>
            </div>
            <div id="contents-box">
                <div id="name">
                    {product.name}
                </div>
                <div id="price">
                    {product.price}
                </div>
                {/* <div id="createdAt">
                    {dayjs(product.createdAt).format('YYYY년 MM월 DD일')}
                </div> */}
                <div id="description-box">
                    <pre id="description">{product.description}</pre>
                </div>
                <div>
                    <h1 style={{ marginBottom: 10 }}>추천 상품</h1>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {
                        recommendedProducts.map((product, index) => {
                            return (
                                    <Products key={product.id} items={product} />
                               
                            )
                        })
                    }
                    </div>
                </div>
                <div style={{ marginTop: 25 }}>
                    <h1 style={{ marginBottom: 10 }}>같은 판매자의 상품</h1>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {
                        sellersProduct.map((product, index) => {
                            return (
                                    <Products key={product.id} items={product} />
                            )
                        })
                    }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;