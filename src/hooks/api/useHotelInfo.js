import useAsync from '../useAsync';
import useToken from '../useToken';

import * as hotelApi from '../../services/hotelApi';

export default function useHotelInfo(){
    const token = useToken();

    const {
        data: hotelInfo,
        loading: hotelInfoLoading,
        act: getHotelInfo
    } = useAsync((hotelId)=> hotelApi.getHotelInfo(hotelId, token), false)

    return {
        hotelInfo,
        hotelInfoLoading,
        getHotelInfo
    }
}