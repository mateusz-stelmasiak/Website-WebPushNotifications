import {getSnapshot, getSnapshotWithKey} from "../firebase-config";
import {allowCors} from "./CORS";


async function handler(request, response) {
    //Get list of all subscribed web push endpoints
    const subscribers = await getSnapshotWithKey("/subscribed")
    if(!subscribers) return response.status(200).json({});

    const usernames = subscribers?.map((subscriber)=>{
        return {'id':subscriber.key ,'username':subscriber.data.username}
    })
    return response.status(200).json(usernames);
}
module.exports = allowCors(handler)