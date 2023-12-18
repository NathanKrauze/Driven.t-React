import { useState } from "react";
import ErrorMessage from "../../../components/ErrorMessage";
import styled from 'styled-components';
import useEnrollment from '../../../hooks/api/useEnrollment'
import hookTickets from "../../../hooks/api/useTypesOfTicket";


export default function Payment() {
 const { typesOfTickets } = hookTickets.useTypesOfTicket()
 //console.log(typesOfTickets)
 

 
 const [ticketPrice, setTicketPrice] = useState(0);
 const [isRemote, setIsRemote] = useState(false);
 const [isNotRemote, setIsNotRemote] = useState(false);
 const [withHotel, setWithHotel] = useState(false);
 const [withoutHotel, setWithoutHotel] = useState(false);
 const { enrollment, enrollmentLoading } = useEnrollment();
 const [ reserved, setReserved ] = useState(false);

 function reserve(){
  setReserved(true);
 }

 function analyseTicket(){
  if(isRemote){
    return result.remoteTicket
  }
  if(isNotRemote && withHotel){
    return result.ticketWithHotel
  }
  if(isNotRemote && withoutHotel){
    return result.ticketWithoutHotel
  }
 }

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
  const remoteTicket = typesOfTickets?.find((ticketType) => ticketType.isRemote === true);
  const ticketWithoutHotel = typesOfTickets?.find(
    (ticketType) => ticketType.isRemote === false && ticketType.includesHotel === false
  );
  const ticketWithHotel = typesOfTickets?.find(
    (ticketType) => ticketType.isRemote === false && ticketType.includesHotel === true
  );

  return { remoteTicket, ticketWithoutHotel, ticketWithHotel };
}

let result = {};
  result = {
    ...getPrice(typesOfTickets),
  };


  return (
    <>
      <Title>Ingresso e pagamento</Title>
      {enrollmentLoading ? (
        'Loading...'
      ) : !enrollment ? (
        <ErrorMessage
          error={'Para conseguir visualizar os ingressos, você deve completar sua inscrição antes de prosseguir para escolha de ingresso'}
        />
      ) : !reserved ? (
        <>
          <TitleSec>Primeiro, escolha sua modalidade de ingresso</TitleSec>
          <Ticket
            onClick={() => selectRemoteorNot('Presencial')}
          >
            <p className="type">Presencial</p>
            <p className="price">R$ {result.ticketWithoutHotel.price}</p>
          </Ticket>
          <Ticket
            onClick={() => selectRemoteorNot('Online')}
          >
            <p className="type">Online</p>
            <p className="price">R$ {result.remoteTicket.price}</p>
          </Ticket>
          {isNotRemote ? (
            <>
              <TitleSec>Ótimo! Agora escolha sua modalidade de hospedagem</TitleSec>
              <Ticket
                onClick={() => withOrWithoutHotel('Sem Hotel')}
              >
                <p className="type">Sem Hotel</p>
                <p className="price">+ R$ 0</p>
              </Ticket>
              <Ticket
                onClick={() => withOrWithoutHotel('Com Hotel')}
              >
                <p className="ticketType">Com Hotel</p>
                <p className="price">
                  + R$ {result.ticketWithHotel.price - result.ticketWithoutHotel.price}
                </p>
              </Ticket>
              {withoutHotel || withHotel ? (
                <>
                  <TitleSec>
                    Fechado! O total ficou em <strong>R$ {ticketPrice}</strong>. Agora é só confirmar:
                  </TitleSec>
                  <Button onClick={reserve}>
                    RESERVAR INGRESSO
                  </Button>
                </>
              ) : (
                <></>
              )}
            </>
          ) : isRemote ? (
            <>
              <TitleSec>
                Fechado! O total ficou em <strong>R$ {ticketPrice}</strong>. Agora é só confirmar:
              </TitleSec>
              <Button onClick={reserve}>
                RESERVAR INGRESSO
              </Button>
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          <TitleSec>
            Ingresso escolhido
          </TitleSec>
          <Resume>
            <p className="type">{analyseTicket().name}</p>
            <p className="price">R$ {analyseTicket().price}</p>
          </Resume>
        </>
      )}
    </>
  );
  
}

const Title = styled.h2 `
  font-family: 'Roboto', sans-serif;
  font-size: 40px;
  color: black;
  margin-bottom: 35px;

`

const TitleSec = styled.h3 `
  font-family: 'Roboto', sans-serif;
  font-size: 22px;
  color: #8e8e8e;
  margin-bottom: 22px;
  margin-top: 32px;
 
`
const Button = styled.button `
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  color: black;
  background-color: #e0e0e0;
  border: none;
  padding: 11px 14px;
  border-radius: 4px;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }


`
const Ticket = styled.button `
  font-family: 'Roboto', sans-serif;
  height: 150px;
  width: 150px;
  margin-right: 27px;
  background-color: white;
  cursor: pointer;
  border: 1px solid #cecece;
  border-radius: 22px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.8;
  }

  .type {
    font-size: 18px;
    color: #454545;
  }

  .price {
    font-size: 16px;
    color: #898989;
  }


`


const Resume = styled.button `
  font-family: 'Roboto', sans-serif;
  height: 108px;
  width: 290px;
  margin-right: 27px;
  background-color: #FFEED2;
  border: none;
  border-radius: 22px;
  .type {
    font-size: 18px;
    color: #454545;
  }

  .price {
    font-size: 16px;
    color: #898989;
  }


`

