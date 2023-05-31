import {
    push,
    ref,
    set,
} from "firebase/database";
import {firebaseDb, getSnapshot} from "../firebase-config";
import {allowCors} from "./CORS";
const webpush = require('web-push');

webpush.setVapidDetails(
    "mailto:mateusz.stelmasiak@gmail.com",
    process.env.PUBLIC_VAPID_KEY,
    process.env.PRIVATE_VAPID_KEY,
);



async function handler(request, response) {
    const subscription = request.body;
    const userData = request.query;
    const userName = userData.username;
    if(!subscription || !userName){
        return response.status(402).json({"Error":"Missing arguments"});
    }


    //Check if isn't already subscribed
    let subscribers = await getSnapshot("/subscribed");
    if(subscribers){
        let duplicate = subscribers.find((iterSub)=>{
            return areSubscriptionsEqual(iterSub,subscription)
        })
        if(duplicate){
            return response.status(406).json({"Error":"To urządzenie jest już zapisane"});
        }
    }


    //ADD to DB, with username
    let dbSubscription = subscription;
    dbSubscription.username = userName;
    let newItemRef = push(ref(firebaseDb, "/subscribed"));
    set(newItemRef, dbSubscription);

    // Notify user that they have been subscribed
    const payload = JSON.stringify({ title: "Dziękujemy za zapisanie!" ,
        body:"Dziękujemy za zapisanie się do powiadomień push!"
    });

    webpush
        .sendNotification(subscription, payload)
        .catch(err => console.error(err));
//
    return response.status(201).json({});
}

module.exports = allowCors(handler)

function areSubscriptionsEqual(sub1, sub2){
    if (!sub1 || !sub2) return false;

    return (
        sub1.endpoint === sub2.endpoint &&
        sub1.keys.auth === sub2.keys.auth &&
        sub1.keys.p256dh === sub2.keys.p256dh
    );
};

