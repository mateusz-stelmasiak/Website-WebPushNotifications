import {getSnapshot} from "../firebase-config";


export default async function handler(request, response) {
    //Get list of all subscribed web push endpoints
    let subscribers = await getSnapshot("/subscribed");
    return response.status(200).json(subscribers);
}