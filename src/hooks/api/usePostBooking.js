import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';

export default function usePostBooking(){
    const token = useToken();

    const { 
        data: bookingId,
        act: postBooking
    } = useAsync((roomId) => bookingApi.postBooking(roomId, token), false)

    return{
        bookingId,
        postBooking
    }
}