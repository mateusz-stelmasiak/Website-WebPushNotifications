import {getSnapshot, getSnapshotWithKey} from "../../firebase-config";
import {allowCors} from "../CORS";

const webpush = require('web-push');

webpush.setVapidDetails(
    "mailto:mateusz.stelmasiak@gmail.com",
    process.env.PUBLIC_VAPID_KEY,
    process.env.PRIVATE_VAPID_KEY,
);

async function handler(request, response) {
    const {userId} = request.query;
    const message = request.query;
    if(!message?.title || !message.body){
        return response.status(422).json({'Error':"Missing arguments"});
    }

    let subscribers = await getSnapshotWithKey("/subscribed");

    let recipientSubscription = subscribers?.find((subscriber)=>{
        return subscriber.key =userId;
    })
    if(!recipientSubscription){
        return response.status(400).json({"Error":"User not found"});
    }
    recipientSubscription = recipientSubscription.data;
    delete recipientSubscription.username;
    const payload = JSON.stringify({ title: message.title,
        body: message.body,
        icon:process.env.LOGO_URL
    });

    webpush
        .sendNotification(recipientSubscription, payload)
        .catch(err => console.error(err));

    return response.status(200).json({});
}
module.exports = allowCors(handler)