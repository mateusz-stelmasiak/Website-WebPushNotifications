import {getSnapshot, getSnapshotWithKey} from "../firebase-config";


export default async function handler(request, response) {
    //Get list of all subscribed web push endpoints
    const subscribers = await getSnapshotWithKey("/subscribed")

    const usernames = subscribers.map((subscriber)=>{
        return {'id':subscriber.key ,'username':subscriber.data.username}
    })
    return response.status(200).json(usernames);
}