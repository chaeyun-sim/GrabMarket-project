import { useParams } from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css"

const ProductsPage = () => {
    const [product, setProduct] = useState(null);
    const {id} = useParams();
    useEffect(() => {
        axios.get(`https://85e74a4e-f796-49de-a926-6c2fce40e69d.mock.pstmn.io/products/${id}`)
        .then((result) => { 
            setProduct(result.data)
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
                <img src={product.imageUrl} alt="product" />
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
                    2022-12-30
                </div>
                <div id="description">
                    {product.description}
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;