import { useParams } from "react-router-dom"

const ProductsPage = () => {
    const {id} = useParams();
    return <h1>상품 페이지</h1>
};

export default ProductsPage;