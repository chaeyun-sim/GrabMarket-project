import { Button, Divider, Form, Input, InputNumber } from "antd";
import './index.css'

const UploadPage = () => {
    const onSubmit = (values) => {
        console.log(values)
    }

    return (
        <div id="upload-container">
            <Form name="상품 업로드" onFinish={onSubmit}> 
                <Form.Item name="upload" label={
                    <div className="upload-label">상품 사진</div>
                }>
                    <div id="upload-img-placeholder">
                        <img src="/images/icons/camera.png" />
                        <span>이미지를 업로드해주세요.</span>
                    </div>
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