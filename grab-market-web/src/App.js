// import 'antd/dist/antd.css'
import { Button } from 'antd';
import "./App.css";
import { DownloadOutlined } from "@ant-design/icons"
import MainPage from "./components/MainPage";
import ProductsPage from "./products";
import UploadPage from "./upload";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <div>
      <div id="header">
          <div id="header-area">
            <Link to="/">
              <img src="/images/icons/logo.png" alt="logo" />
            </Link>
            <Button id="upload-button" size="large" onClick={() => {
              navigate('/upload')
            }} icon={<DownloadOutlined />}>상품 업로드</Button>
          </div>
      </div>
      <hr></hr>
      <div id="body">
        <Routes exact={true} path="/">
          <Route path="/" element={<MainPage />} />
          <Route path="/product/:id" element={<ProductsPage />} />
          <Route path="/upload" element={<UploadPage />} />
        </Routes>
      </div>
      <div id="footer">
      </div>
    </div>
  );
}

export default App;