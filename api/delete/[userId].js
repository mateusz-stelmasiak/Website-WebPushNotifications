import {ref,remove} from "firebase/database";
import {firebaseDb} from "../../firebase-config";

export default async function handler(request, response) {
    const {userId} = request.query;

    await remove(ref(firebaseDb, `/subscribed/${userId}`))
    return response.status(201).json();
}