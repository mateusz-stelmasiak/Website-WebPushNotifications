import './App.css';
import React, {useEffect, useRef, useState} from "react";
import usePushNotifications from "./usePushNotifications";
import {Button, Form, Input, List} from "antd";
import {
    BellOutlined,
} from '@ant-design/icons';
import {Spin} from 'antd';

function App() {
    const {register, featureAvailable, loading} = usePushNotifications()
    const onFinish = async (values) => {
        const username = values.username;
        await register(username);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Spin spinning={loading}>
            <div style={{width: "100%"}}>
                <div style={{fontSize: 40, textAlign: "center", marginBottom: 40, marginTop: 100,fontFamily:"Orbitron"}}>Otrzymuj powiadomienia push</div>

                    <Form
                        layout={"vertical"}
                        name="basic"
                        style={{maxWidth: 600, marginLeft: "auto", marginRight: "auto"}}
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

                </div>

        </Spin>
    );
}

export default App;
