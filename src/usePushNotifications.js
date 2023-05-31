import {useEffect, useState} from "react";


const usePushNotifications = ()=>{
    const featureAvailable = "serviceWorker" in navigator
    const publicVapidKey =
        "BKUCiPCKcs5ER21--Nu-sA5QkUNUKXudDVyrtAmrW-UF38U3H3-VwFDp8LUmW4asBavbXjCqxpqU7fhmJBaPFAQ";
    const [loading,setLoading] = useState(false);

    // Register SW, Register Push, Send Push
    async function register(username) {
        // Check for service worker
        if (!featureAvailable) {
            console.log("Feature unavaliable")
            return
        }

        setLoading(true);
        // Register Service Worker
        const register = await navigator.serviceWorker.register("/worker.js", {
            scope: "/"
        });

        // Register Push
        const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
        });


        await fetch(`${process.env.REACT_APP_API_URL}/subscribe?username=${username}`, {
            method: "POST",
            body: JSON.stringify(subscription),
            headers: {
                "content-type": "application/json"
            }
        });
        setLoading(false);
    }

    function urlBase64ToUint8Array(base64String) {
        const padding = "=".repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, "+")
            .replace(/_/g, "/");

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    return {register,featureAvailable,loading}
}

export default usePushNotifications;