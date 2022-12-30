import "./App.css";
import MainPage from "./components/MainPage";
import ProductsPage from "./products";
import UploadPage from "./upload";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes exact={true} path="/">
        {/* <Route path={"/"}>
          <MainPage />
        </Route> */}
        <Route path="/" element={<MainPage />} />
        <Route path="/product/:id" element={<ProductsPage />} />
        <Route path="/upload" element={<UploadPage />} />
      </Routes>
    </div>
  );
}

export default App;