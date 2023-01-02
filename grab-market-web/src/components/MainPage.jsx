import React, {useState} from "react";
import './styles.css';
import axios from "axios";
import ProductsList from "./ProductsList";
import { useEffect } from "react";
import { API_URL } from "../config/constants.js"
import { Carousel } from "antd";
import { Link } from "react-router-dom";

const MainPage = () => {
    const [products, setProducts] = useState([]);
    const [banners, setBanners] = useState([]);
    const url = (`${API_URL}/products`);

    useEffect(() => {
        axios.get(url).then((result) => {
            const data = result.data.products;
            // console.log(data)
            setProducts(data)
        }).catch((err) => {
            console.error(err)
        });

        axios.get(`${API_URL}/banners`).then((result) => {
            const banners = result.data.banners
            setBanners(banners)
        }).catch((err) => {
            console.error(err)
        })
    }, []);

    return (
        <div>
            <Carousel autoplay autoplaySpeed={3000}>
                {
                    banners.map((banner, index) => {
                        return (
                            <Link to={banner.href}>
                                <div id="banner">
                                    <img src={`${API_URL}/${banner.imageUrl}`} alt="banner" />
                                </div>
                            </Link>
                        )
                    })
                }
            </Carousel>
            
            <h1 id="product-headline">판매되는 상품들</h1>
            <div id="product-list">
                {products.map((product) => {
                    return (
                        <ProductsList items={product} key={product.id} />
                    )}
                )}
            </div>
        </div>
    )
}

export default MainPage;