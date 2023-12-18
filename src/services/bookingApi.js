import api from './api'

export async function getBookingsByRoomId(roomId, token){
    const res = await api.get(`/booking/${roomId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return res.data;
}

export async function postBooking(body, token){
    const res = await api.post(`/booking/`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return res.data;
}