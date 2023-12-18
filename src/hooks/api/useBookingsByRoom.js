import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';

export default function useBookingsByRoom(){
    const token = useToken();

    const { 
        data: bookingsByRoom,
        act: getBookingsByRoom
    } = useAsync((roomId) => bookingApi.getBookingsByRoomId(roomId, token), false)

    return{
        bookingsByRoom,
        getBookingsByRoom
    }
}