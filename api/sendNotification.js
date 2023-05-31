import {push, ref, set,query,orderByChild,orderByKey,get} from "firebase/database";
import {firebaseDb} from "../firebase-config";
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
        webpush
            .sendNotification(subscription, payload)
            .catch(err => console.error(err));
    })
    return response.status(200).json({});
}

async function getSnapshot(path,orderBy){
    let quer = await query(ref(firebaseDb, path)
        ,(orderBy ? orderByChild(orderBy) : orderByKey())
    );

    let snapshot = await get(quer);
    let items =[];
    snapshot.forEach((snap)=>{
        items.unshift(snap.val());
    })
    //handle single items
    if(items.length ===0){items = snapshot.val();}
    return items;
}
