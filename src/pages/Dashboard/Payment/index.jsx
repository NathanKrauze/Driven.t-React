import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import useEnrollment from '../../../hooks/api/useEnrollment'
import {useTypesOfTicket, postUserTickets} from "../../../hooks/api/useTypesOfTicket";


export default function Payment() {
 
 const { typesOfTickets } = useTypesOfTicket()
 const { postUserTicket } = postUserTickets();

 const [ticketTypeId, setTicketTypeId] = useState({});
 const [ticketPrice, setTicketPrice] = useState(0);
 const [isRemote, setIsRemote] = useState(false);
 const [isNotRemote, setIsNotRemote] = useState(false);
 const [withHotel, setWithHotel] = useState(false);
 const [withoutHotel, setWithoutHotel] = useState(false);
 const { enrollment, enrollmentLoading } = useEnrollment();

function selectRemoteorNot(type) {
  if (type === 'Presencial') {
    setIsNotRemote(true);
    setIsRemote(false); 
  } 

  if (type === 'Online') {
    setIsNotRemote(false);
    setIsRemote(true)
    setTicketPrice(result.remoteTicket.price)
  }
}

function withOrWithoutHotel(type) {
  if (type === 'Sem Hotel') {
    setWithoutHotel(true);
    setWithHotel(false);
    setTicketPrice(result.ticketWithoutHotel.price);
  }
  if (type === 'Com Hotel') {
    setWithHotel(true);
    setWithoutHotel(false);
    setTicketPrice(result.ticketWithHotel.price)
  }
}

function getPrice(typesOfTickets) {
  const remoteTicket = typesOfTickets.find((ticketType) => ticketType.isRemote === true);
  const ticketWithoutHotel = typesOfTickets.find(
    (ticketType) => ticketType.isRemote === false && ticketType.includesHotel === false
  );
  const ticketWithHotel = typesOfTickets.find(
    (ticketType) => ticketType.isRemote === false && ticketType.includesHotel === true
  );

  return { remoteTicket, ticketWithoutHotel, ticketWithHotel };
}

let result = {};
  result = {
    ...getPrice(typesOfTickets),
  };

 
  return 'Pagamento: Em breve!';
}
 
