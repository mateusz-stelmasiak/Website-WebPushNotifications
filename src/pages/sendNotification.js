import React from 'react';
import {Button, Checkbox, Form, Input, message} from 'antd';
import TextArea from "antd/es/input/TextArea";

export default function SendNotification() {
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values) => {
        console.log('Success:', values);
        const response = await fetch(
            process.env.REACT_APP_API_URL + `/send?body=${values.body}&title=${values.title}`);
        const jsonData = await response.json();

        if(!response.ok){
            //display error
            messageApi.open({
                type: 'error',
                content: jsonData.Error,
            });
            return;
        }
        messageApi.open({
            type: 'success',
            content: "Your message has been sent!",
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return <div style={{padding: "2rem"}}>
        {contextHolder}
        <div className={"headerContainer"}>
            <h1>
                Notify EVERYONE
            </h1>
            <p>
                Send notifications to <b>all</b> registered users
            </p>
        </div>

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
                label={<label style={{color: "white"}}>Title</label>}
                name="title"
                rules={[{required: true, message: 'the title cannot be empty'}]}
            >
                <Input
                    showCount={true}
                    maxLength={63}
                />
            </Form.Item>

            <Form.Item
                label={<label style={{color: "white"}}>Message</label>}
                name="body"
                rules={[{required: true, message: 'the message cannot be empty'}]}

            >
                <TextArea
                    showCount={true}
                    maxLength={128}
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Send to all
                </Button>
            </Form.Item>
        </Form>
    </div>
}
