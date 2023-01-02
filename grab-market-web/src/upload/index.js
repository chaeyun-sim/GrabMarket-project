import { Button, Divider, Form, Input, InputNumber, Upload, message } from "antd";
import './index.css'
import React, { useState } from "react";
import { API_URL } from "../config/constants.js";
import axios from "axios";
import {useNavigate} from "react-router-dom"

const UploadPage = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const navigate = useNavigate();

    const onSubmit = (values) => {
        axios
        .post(`${API_URL}/products`, {
            name: values.name,
            description: values.description,
            seller: values.seller,
            price: parseInt(values.price),
            imageUrl: imageUrl,
        })
        .then((result) => {
            console.log(result);
            navigate('/');
        }).catch((err) => {
            console.error(err);
            message.error(`에러가 발생했습니다. ${err.message}`)
        });
    };

    const onChangeImage = (info) => {
        if(info.file.status === 'uploading'){
            return;
        }
        if(info.file.status === 'done'){
            const response = info.file.response;
            const imageUrl = response.imageUrl;
            setImageUrl(imageUrl)
        }
    };

    return (
        <div id="upload-container">
            <Form id="upload-product" name="상품 업로드" onFinish={onSubmit}> 
                <Form.Item name="upload" label={
                    <div className="upload-label">상품 사진</div>
                }>
                    <Upload
                        name="image"
                        action={`${API_URL}/image`  }
                        listType="picture"
                        showUploadList={false}
                        onChange={onChangeImage}
                    >
                        {imageUrl ?( 
                            <img id="upload-img" src={`${API_URL}/${imageUrl}`} />
                        ) : (
                                <div id="upload-img-placeholder">
                                    <img src="/images/icons/camera.png" alt="camera" />
                                    <span>이미지를 업로드해주세요.</span>
                                </div>
                            )
                        }
                        
                    </Upload>
                </Form.Item>
                <Divider />
                <Form.Item label={
                    <div className="upload-label">판매자 명</div>
                } name="seller" rules={[{required: true, message: '판매자 명을 입력해주세요.'}]}>
                    <Input className="upload-name" placeholder="판매자 명을 입력해주세요" />
                </Form.Item>
                <Divider />
                <Form.Item label={
                    <div className="upload-label">상품 명</div>
                } name="name" rules={[{required: true, message: '상품 명을 입력해주세요.'}]}>
                    <Input className="upload-name" placeholder="상품 명을 입력해주세요" />
                </Form.Item>
                <Divider />
                <Form.Item label={
                    <div className="upload-label">상품 가격</div>
                } name="price" rules={[{required: true, message: '상품 가격을 입력해주세요'}]}>
                    <InputNumber className="upload-price" defaultValue={0} />
                </Form.Item>
                <Divider />
                <Form.Item label={
                    <div className="upload-label">상품 설명</div>
                } name="description" rules={[{required: true, message: "상품 설명을 입력해주세요."}]}>
                    <Input.TextArea id="product-description" showCount maxLength={300} placeholder="상품 설명을 입력해주세요." />
                </Form.Item>
                <Form.Item>
                    <Button id="submit-button" htmlType="submit" type="primary">
                        동록하기
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default UploadPage;