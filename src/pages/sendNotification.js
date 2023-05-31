import React from 'react';
import {Button, Checkbox, Form, Input} from 'antd';
import TextArea from "antd/es/input/TextArea";

export default function SendNotification() {

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return <div>
        <div style={{fontSize:32,textAlign:"center",marginBottom:40, marginTop:100}}>SEND NOTIFICATION</div>
            <Form
                layout={"vertical"}
                name="basic"
                style={{maxWidth: 600, marginLeft:"auto",marginRight:"auto"}}
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    style={{color: "white"}}
                    label={<label style={{color: "white"}}>Tytuł</label>}
                    name="title"
                    rules={[{required: true, message: 'tytuł nie może być pusty'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label={<label style={{color: "white"}}>Wiadomość</label>}
                    name="body"
                    rules={[{required: true, message: 'wiadomość nie może być pusta'}]}
                >
                    <TextArea/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Wyślij
                    </Button>
                </Form.Item>
            </Form>
    </div>
}
