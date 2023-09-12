import {initializeApp, getApps, getApp} from "firebase/app";
import {get, getDatabase, orderByChild, orderByKey, query, ref} from "firebase/database";

// Your web app's Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
   
};


let firebase = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const firebaseApp = firebase;
export const firebaseDb = getDatabase(firebaseApp);

export async function getSnapshot(path,orderBy){
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

export async function getSnapshotWithKey(path,orderBy){
    let quer = await query(ref(firebaseDb, path)
        ,(orderBy ? orderByChild(orderBy) : orderByKey())
    );

    let snapshot = await get(quer);
    let items =[];
    snapshot.forEach((snap)=>{
        items.unshift({'key':snap.key,'data':snap.val()});
    })
    //handle single items
    if(items.length ===0){items = {'key':snapshot.key,'data':snapshot.val()};}
    return items;
}



