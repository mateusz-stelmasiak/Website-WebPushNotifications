import {
    push,
    ref,
    set,
} from "firebase/database";
import {firebaseDb} from "../firebase-config";
const webpush = require('web-push');

webpush.setVapidDetails(
    "mailto:mateusz.stelmasiak@gmail.com",
    process.env.PUBLIC_VAPID_KEY,
    process.env.PRIVATE_VAPID_KEY,
);

export default function handler(request, response) {
    const subscription = request.body;
    response.status(201).json({});
    if(!subscription){return;}

    //ADD to DB
    let newItemRef = push(ref(firebaseDb, "/subscribed"));
    set(newItemRef, subscription);

    // Notify user that they have been subscribed
    const payload = JSON.stringify({ title: "Dziękujemy za zapisanie!" ,
        body:"Dziękujemy za zapisanie się do powiadomień push!",
        icon: "http://image.ibb.co/frYOFd/tmlogo.png"
    });

    webpush
        .sendNotification(subscription, payload)
        .catch(err => console.error(err));
}

