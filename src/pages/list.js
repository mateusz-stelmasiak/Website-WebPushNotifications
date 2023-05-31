import {useEffect, useState} from "react";


export default function List(){

    const [userNames, setUserNames] = useState();

    useEffect(()=>{
        refreshUserList();
    },[])

    userNames?.forEach(user => console.log(user));

    const refreshUserList = async () => {
        const response = await fetch(process.env.REACT_APP_API_URL+ "/getAllSubscribers");
        const jsonData = await response.json();
        setUserNames(jsonData);
    }

    return <div>
        {userNames?.map(user => <div>{user}</div>)}
    </div>
}
