import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

export default function SendNotification(){

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return <div>
        TUTAJ SEND NOTIFICATION
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                style={{color:"white"}}
                label={<label style={{ color: "white" }}>Tytuł</label>}
                name="title"
                rules={[{ required: true, message: 'tytuł nie może być pusty' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label={<label style={{ color: "white" }}>Wiadomość</label>}
                name="body"
                rules={[{ required: true, message: 'wiadomość nie może być pusta' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Wyślij
                </Button>
            </Form.Item>
        </Form>

    </div>
}
