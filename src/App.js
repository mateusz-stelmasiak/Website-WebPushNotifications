import './App.css';
import {useEffect, useRef, useState} from "react";
import useSecretsAPI from "./useSecretsAPI";
import usePushNotifications from "./usePushNotifications";
import {Button, List} from "antd";
import {
    BellOutlined,
    BellFilled,
} from '@ant-design/icons';
import Avatar from "antd/es/avatar/avatar";
import {useSwipeable} from "react-swipeable"

function App() {
    const {register,featureAvailable} = usePushNotifications()
    const {getAllBookingsByDate,loading,setLoading} = useSecretsAPI()
    const [shownBookings,setShownBookings] = useState([])
    const [selectedDate,setSelectedDate] = useState(new Date());
    const apiCallTimeout = useRef();
    const swipeHandlers = useSwipeable({
        onSwipedLeft: (eventData) => changeSelectedDate(1),
        onSwipedRight: (eventData) => changeSelectedDate(-1),
        trackTouch: true,                      // track touch input
        trackMouse: true,                     // track mouse input
    });

    const roomIcons = {
        "Cosa Nostra":"https://time4secrets.pl/wp-content/uploads/2015/09/Kopiuj-z-cosa-nostra.jpg",
        "Kolekcjoner":"https://time4secrets.pl/wp-content/uploads/2015/09/Kopiuj-z-kolekcjoner1.jpg",
        "Skarb Czarnobrodego":"https://time4secrets.pl/wp-content/uploads/2015/09/Kopiuj-z-skarb-Czarnobrodego.jpg"
    }
    const weekdays = ["ndz.","pon.","wt.","śr.","czw.","pt.","sob."]

    useEffect(()=>{
        updateBookingList(new Date())
    },[])


    let updateBookingList = async(date)=>{
        await setLoading(true);
        await getBookingsList(date);
        await setLoading(false);
    }

    let getBookingsList = async (date)=>{
        let temp= await getAllBookingsByDate(date);
        setShownBookings(()=>temp)
    }

    let changeSelectedDate = async (days)=>{
        if(days<0 && !canSwipeLeft()) return;
        clearTimeout(apiCallTimeout.current);

        let result = new Date(selectedDate);
        result.setDate(result.getDate() + days);
        setSelectedDate(result);
        // Set the timer to make an API call after a specified interval

        apiCallTimeout.current = setTimeout(() => {
            updateBookingList(result);
        }, 500); // 5000ms = 5 seconds
    }

    let canSwipeLeft = ()=>{
        let currDate =new Date();
        return selectedDate>currDate;
    }

    let formatDate = (date) =>{
        let weekday = weekdays[date.getDay()];

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${weekday}, ${day}/${month}/${year}`;
    }

    return (
        <main>
            <section>

                <div className={"sectionHeader"}>
                    <div className={"sectionTitle"}>
                        <h2>ZAPISZ SIE DO POWIADOMIEŃ</h2>
                        <span>({selectedDate && formatDate(selectedDate)})</span>
                    </div>
                    <Button className={"pushSubcribe"} onClick={register} disabled={!featureAvailable}>
                        <BellOutlined />
                    </Button>
                </div>
            </section>


        </main>

    );
}

export default App;
