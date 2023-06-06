import './App.css';
import React, {useEffect, useRef, useState} from "react";
import usePushNotifications from "./usePushNotifications";
import {Button, Form, Input, List, message} from "antd";
import {
    BellOutlined,
} from '@ant-design/icons';
import {Spin} from 'antd';

function App() {
    const {register, featureAvailable, loading} = usePushNotifications()
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values) => {
        const username = values.username;
        let res = await register(username);
        if(!res.ok){
            const jsonData = await res.json();
            //display error
            messageApi.open({
                type: 'error',
                content: jsonData.Error,
            });
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            {contextHolder}
            {featureAvailable
                ? <Spin spinning={loading}>
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
                :<div style={{padding:"2rem "}}>
                    <div>
                        <h1>
                            Get push notifications
                        </h1>
                        <p style={{color:"var(--main-color)"}}>
                            We're sorry but this feature is not available on your device.
                        </p>
                        <p style={{fontSize:"0.8rem"}}>
                            get more info <a href={"https://caniuse.com/push-api"}>here</a>
                        </p>
                    </div>
                </div>
            }
        </>
    );
}

export default App;
