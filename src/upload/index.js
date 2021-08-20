import {Input, Divider, Form, InputNumber, Button, Upload, message} from "antd";
import { useState } from "react";
import './index.css'
import {API_URL} from "../config/constants.js";
import axios from "axios";
import { throwStatement } from "@babel/types";
import {useHistory} from "react-router-dom";


function UploadPage(){
    const [imageUrl, setImageUrl] = useState(null);
    const history = useHistory();

    const onSubmit = (values) => {
        console.log(values);
        axios.post(`${API_URL}/products`, {
            name: values.name,
            description : values.description,
            seller: values.seller,
            price : parseInt(values.price),
            imageUrl : imageUrl
        }).then((result) =>{
            console.log(result);
            history.replace('/');
        }).catch((error) =>{
            console.error(error);
            message.error(`에러가 발생했습니다. ${error.message}`)
        });

    };

    const onChangeImage = (info) => {
        if(info.file.status === 'uploading'){
            return;
        }
        if(info.file.status === 'done'){
            const response = info.file.response;
            const imageUrl = response.imageUrl;
            setImageUrl(imageUrl);

        }
    }

return <div id="upload-container">
    <Form name ="상품 업로드" onFinish={onSubmit}>
<Form.Item name="upload" label={<div className="upload-label">Image</div>}>

< Upload name="image" action={`${API_URL}/image`}
list Type="picture" showUploadList={false}
onChange={onChangeImage}>

    {
        imageUrl ? <img id="upload-img" src={`${API_URL}/${imageUrl}`}/> : <div id="upload-img-placeholder">
        <img src="/images/icons/camera.png" />
        <span>Please Upload product image</span>

    </div>
    }


    </Upload>
    </Form.Item>
    <Divider />
    <Form.Item
    label={<div className="upload-label" >Seller</div>}
    name="seller" rules={[{required: true, message: 'type the name of the seller'}]}
    
    >
        <Input className="upload-name" size="large" placeholder="type the name of the seller." />
    </Form.Item>
    <Divider/>
    <Form.Item name="name"
    label={<div className="upload-label">P.Name</div>}
    rules={[{required: true, message: 'type the name of the product.'}]}>
<Input className="upload-name" size="large" placeholder="type the name of the product."></Input>
    </Form.Item>

<Divider/>
<Form.Item name="price" label={<div className="upload-label">Price</div>}
rules={[{required: true, message: 'price required.'}]}
>
    <InputNumber 
    defaultValue={0}
    className="upload-price" size="large"/>
</Form.Item>
<Divider/>
<Form.Item name="description"
label={<div className="upload-label">Description</div>}
rules={[{required: true, message: "type the description."}]}
>
    
    <Input.TextArea size="large" id= "product-description" showCount maxLength={300} placeholder="상품 소개를 적어주세요."></Input.TextArea>
</Form.Item>
<Form.Item>
    <Button id="submit-button" size="large" htmlType="submit">등록하기</Button>
</Form.Item>
</Form>
</div>

}

export default UploadPage;