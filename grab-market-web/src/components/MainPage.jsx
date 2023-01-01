import React, {useState} from "react";
import './styles.css';
import axios from "axios";
import ProductsList from "./ProductsList";
import { useEffect } from "react";
import { API_URL } from "../config/constants.js"

const MainPage = () => {
    const [products, setProducts] = useState([]);
    const url = (`${API_URL}/products`);
    useEffect(() => {
        axios.get(url).then((result) => {
            const data = result.data.products;
            // console.log(data)
            setProducts(data)
        }).catch((err) => {
            console.error(err)
        })
    }, []);

    return (
        <div>
            <div id="banner">
                <img src="images/banners/banner1.png" alt="banner" />
            </div>
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