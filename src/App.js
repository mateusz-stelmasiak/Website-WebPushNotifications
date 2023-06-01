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
            <div style={{padding:"2rem "}}>
                <div>
                    <h1>
                        Get push notifications
                    </h1>
                    <p>
                        <i>Push</i> the button to get <i>Push</i> notifications
                    </p>
                </div>


                <Form
                    layout={"vertical"}
                    name="basic"
                    style={{maxWidth: 600, marginLeft: "auto", marginRight: "auto",marginTop:"3rem"}}
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        style={{color: "white"}}
                        label={<label style={{color: "white"}}>Username</label>}
                        name="username"
                        rules={[{required: true, message: 'you must choose a username'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Sign me up
                        </Button>
                    </Form.Item>
                </Form>

            </div>

        </Spin>
    );
}

export default App;
