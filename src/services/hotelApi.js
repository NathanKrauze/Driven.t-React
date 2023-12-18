import api from './api'

export async function getHotelInfo(hotelId, token){
    const res = await api.get(`/hotels/${hotelId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    return res.data;
}