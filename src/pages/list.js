import {useEffect, useState} from "react";
import {DeleteOutlined, MailOutlined} from "@ant-design/icons";
import {Avatar, List, Spin} from 'antd';
import "./list.css"

export default function ListPage() {

    const [users, setUsers] = useState();
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);


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
        const response = await fetch(process.env.REACT_APP_API_URL+ "/delete/" + id);
        if(!response.ok){
            console.log("ERROR DX")
        }
        await refreshUserList();
        setLoading(false);
    }

    const onSendClick = async (id) => {

    }

    return <div style={{width: "100%"}}>
        <div style={{fontSize: 32, textAlign: "center", marginBottom: 40, marginTop: 100}}>User List</div>
        <Spin spinning={loading}>
        <List
            style={{maxWidth: 500, marginLeft: "auto", marginRight: "auto"}}
            loading={initLoading}
            itemLayout="horizontal"
            dataSource={users}
            renderItem={(item, index) => (
                <List.Item actions={[<DeleteOutlined onClick={() => onDeleteClick(item.id)} style={{color: "white", fontSize: 24, cursor:"pointer"}}/>,
                    <MailOutlined onClick={() => onSendClick(item.id)} style={{color: "white", fontSize: 24, cursor:"pointer"}}/>]}>
                    <List.Item.Meta
                        title={<a className={"userListItem"} href="https://ant.design">{item.username}</a>}
                    />
                </List.Item>
            )}
        />
        </Spin>
    </div>
}
