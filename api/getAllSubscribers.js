import {getSnapshot} from "../firebase-config";


export default async function handler(request, response) {
    //Get list of all subscribed web push endpoints
    const subscribers = await getSnapshot("/subscribed")
    const usernames = subscribers.map((subscriber)=>{
        return subscriber.username
    })
    return response.status(200).json(usernames);
}