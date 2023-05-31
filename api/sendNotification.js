import {getSnapshot} from "../firebase-config";

const webpush = require('web-push');

webpush.setVapidDetails(
    "mailto:mateusz.stelmasiak@gmail.com",
    process.env.PUBLIC_VAPID_KEY,
    process.env.PRIVATE_VAPID_KEY,
);

export default async function handler(request, response) {
    const message = request.query;
    if(!message?.title || !message.body){
        return response.status(422).json({'Error':"Missing arguments"});
    }

    //Get list of all subscribed web push endpoints
    let subscribers = await getSnapshot("/subscribed");

    //iterate through new subcribers and send push notifications to all subscribers
    const payload = JSON.stringify({ title: message.title,
        body: message.body,
        icon:process.env.LOGO_URL
    });

    subscribers.forEach((subscription)=>{
        delete subscription.username;
        
        webpush
            .sendNotification(subscription, payload)
            .catch(err => console.error(err));
    })
    return response.status(200).json({});
}


