import React, {useState} from "react";
import './styles.css';
import axios from "axios";
import ProductsList from "./ProductsList";
import { useEffect } from "react";

const MainPage = () => {
    const [products, setProducts] = useState([]);
    const url = 'https://341cf269-c712-4751-a587-2c7fd1b972ec.mock.pstmn.io/products';
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
            <div id="header">
                <div id="header-area">
                    <img src="images/icons/logo.png" alt="logo" />
                </div>
            </div>
            <div id="body">
                <div id="banner">
                    <img src="images/banners/banner1.png" alt="banner" />
                </div>
                <h1>판매되는 상품들</h1>
                <div id="product-list">
                        {products.map((product) => {
                            return (
                                <ProductsList items={product} key={product.id} />
                            )
                        })
                    }
                </div>
            </div>
            <div id="footer"></div>
        </div>
    )
}

export default MainPage;