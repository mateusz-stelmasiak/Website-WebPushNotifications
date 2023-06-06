import {useEffect, useState} from "react";
import {DeleteOutlined, MailOutlined} from "@ant-design/icons";
import {Button, Checkbox, Form, Input, Modal, Spin, List} from 'antd';
import "./list.css"
import TextArea from "antd/es/input/TextArea";

export default function ListPage() {

    const [users, setUsers] = useState();
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(undefined);
    const [isModalTwoOpen, setIsModalTwoOpen] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setCurrentUserId(undefined);
    };

    useEffect(() => {
        refreshUserList();
    }, [])


    const refreshUserList = async () => {
        const response = await fetch(process.env.REACT_APP_API_URL + "/getAllSubscribers");
        const jsonData = await response.json();
        setUsers(jsonData);
        setInitLoading(false);
    }

    const onDeleteClick = async (id) => {
        setLoading(true);
        const response = await fetch(process.env.REACT_APP_API_URL + "/delete/" + id);
        if (!response.ok) {
            console.log("ERROR DX")
        }
        await refreshUserList();
        setLoading(false);
    }

    const onSendClick = async (id) => {
        setIsModalOpen(true);
        setCurrentUserId(id);
    }

    const onFinish = async (values) => {
        console.log(currentUserId);
        const response = await fetch(
            process.env.REACT_APP_API_URL + `/send/${currentUserId}?body=${values.body}&title=${values.title}`);
        const jsonData = await response.json();
        setCurrentUserId(undefined);
        setIsModalOpen(false);
    };

    const onModalTwoFinish = async (values) => {
        console.log(values);
        for(let i=0;i<selectedUsers.length;i++){
            console.log(selectedUsers[i].id);
            const response = await fetch(
                process.env.REACT_APP_API_URL + `/send/${selectedUsers[i].id}?body=${values.body}&title=${values.title}`);
            const jsonData = await response.json();
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onCheckboxChange = (e, item) => {
        if (e.target.checked) {
            setSelectedUsers([...selectedUsers, item]);
        } else {
            setSelectedUsers(selectedUsers.filter(el => el !== item))
        }
    }

    return <div style={{width: "100%"}}>
        <div style={{fontSize: 32, textAlign: "center", marginBottom: 40}}>User List</div>
        <Spin spinning={loading}>
            <div style={{maxWidth: 500, marginLeft: "auto", marginRight: "auto"}}>


                <List
                    loading={initLoading}
                    itemLayout="horizontal"
                    dataSource={users}
                    renderItem={(item, index) => (
                        <List.Item actions={[<DeleteOutlined onClick={() => onDeleteClick(item.id)} style={{
                            color: "white",
                            fontSize: 24,
                            cursor: "pointer"
                        }}/>,
                            <MailOutlined onClick={() => onSendClick(item.id)}
                                          style={{color: "white", fontSize: 24, cursor: "pointer"}}/>]}>
                            <List.Item.Meta
                                avatar={<Checkbox style={{height: "100%"}}
                                                  onChange={(e) => onCheckboxChange(e, item)}/>}
                                title={<a className={"userListItem"} href="https://ant.design">{item.username}</a>}
                            />
                        </List.Item>
                    )}
                />
                <Button onClick={() => setIsModalTwoOpen(true)} type={"primary"} loading={loading || initLoading} disabled={loading || initLoading}
                        style={{marginTop:27, float:"right"}}> Wyślij do zaznaczonych</Button>
            </div>
        </Spin>

        <Modal title="Wyślij wiadomość" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
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
                    label={<label style={{color: "black"}}>Tytuł</label>}
                    name="title"
                    rules={[{required: true, message: 'tytuł nie może być pusty'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label={<label style={{color: "black"}}>Wiadomość</label>}
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
        </Modal>

        <Modal title="Wyślij do zaznaczonych" open={isModalTwoOpen} onOk={() =>setIsModalTwoOpen(false)} onCancel={() => setIsModalTwoOpen(false)} footer={null}>
            <Form
                layout={"vertical"}
                name="basic"
                style={{maxWidth: 600, marginLeft: "auto", marginRight: "auto"}}
                onFinish={onModalTwoFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    style={{color: "white"}}
                    label={<label style={{color: "black"}}>Tytuł</label>}
                    name="title"
                    rules={[{required: true, message: 'tytuł nie może być pusty'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label={<label style={{color: "black"}}>Wiadomość</label>}
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
        </Modal>
    </div>
}
