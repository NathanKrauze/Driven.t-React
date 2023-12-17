import useToken from "../useToken";
import useAsync from "../useAsync";
import * as ticketsApi from '../../services/ticketApi';

function useTypesOfTicket() {
    const token = useToken();
    const {
        data: typesOfTickets,
        act: getTypesOfTickets,
        
    } = useAsync(() => ticketsApi.getTypesOfTickets(token))
    return {
        typesOfTickets,
        getTypesOfTickets,
    };
}

function postUserTickets() {
    const token = useToken();

    const {
        act: postUserTicket
    } = useAsync((data) => ticketsApi.postUserTicket(data, token))

    return {
        postUserTicket,
    };
}

const hookTickets = {
    useTypesOfTicket,
    postUserTickets
}

export default hookTickets
