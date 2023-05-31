import './App.css';
import React, {useEffect, useRef, useState} from "react";
import useSecretsAPI from "./useSecretsAPI";
import usePushNotifications from "./usePushNotifications";
import {Button, Form, Input, List} from "antd";
import {
    BellOutlined,
    BellFilled,
} from '@ant-design/icons';
import Avatar from "antd/es/avatar/avatar";
import {useSwipeable} from "react-swipeable"
import TextArea from "antd/es/input/TextArea";

function App() {
    const {register,featureAvailable,loading} = usePushNotifications()
    const onFinish = async (values) => {
        console.log('Success:', values);
        const username = values.username;
        await register(username);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <main>
            <h2><BellOutlined /> ZAPISZ SIE DO POWIADOMIEŃ </h2>
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
                    label={<label style={{color: "white"}}>Nazwa użytkownika</label>}
                    name="username"
                    rules={[{required: true, message: 'musisz wybrać nazwę użytkownika'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Zapisz mnie
                    </Button>
                </Form.Item>
            </Form>

            {loading && "loadin...."}
        </main>

    );
}

export default App;
