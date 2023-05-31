const fetch = require('cross-fetch').fetch;

const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')

    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )

    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }
    return await fn(req, res)
}


export default async function handler(request, response) {
    const {date} = request.query;
    let bookedHours = await getAllRoomsBookedHours(date);
    return response.end(JSON.stringify(bookedHours));
}

module.exports = allowCors(handler)

// Room id to names mapping
export const allRooms = {
    1: 'Kolekcjoner',
    4: 'Cosa Nostra',
    5: 'Skarb Czarnobrodego',
};

export async function getRoomBookedHours(roomId, date) {
    const year = date.substr(0, 4);
    let bookedHours = [];
    let roomName = allRooms[roomId];

    try {
        const response = await fetch('https://time4secrets.pl/wp-admin/admin-ajax.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                action: 'dopbsp_calendar_schedule_get',
                dopbsp_frontend_ajax_request: true,
                id: roomId,
                year: year,
            }),
        });

        if (!response.ok) {
            console.error('ERROR GETTING FROM SERVER')
            return [] //todo error?
        }

        const data = await response.json();
        const parsedData = JSON.parse(data[date]);
        //extract hours from data

        Object.entries(parsedData['hours']).forEach((info) => {
            let roomHour = info[0];
            let roomInfo = info[1];
            if (roomInfo.status === 'booked') {
                bookedHours.push({'hour': roomHour, 'room': roomName})
            }
        })

        return bookedHours

    } catch (error) {
        return []
    }

}

export async function getAllRoomsBookedHours(date) {
    let bookedHours = [];
    for (const room of Object.entries(allRooms)) {
        let roomId = room[0];
        let currRoomBooked = await getRoomBookedHours(roomId, date);

        if (currRoomBooked.length === 0) continue;
        bookedHours = bookedHours.concat(currRoomBooked)
    }
    //sort by hours
    bookedHours.sort(function (a, b) {
        let keyA = a.hour,
            keyB = b.hour;
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });

    return bookedHours;
}


