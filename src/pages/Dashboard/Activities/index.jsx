import { useEffect } from "react";
import useTicket from "../../../hooks/api/useTicket";
import styled from "styled-components";

export default function Activities() {
  //PARA O CODIGO FUNCIONAR È PRECISO QUE O TICKET ESTEJA RESERVADO E PAGO SE NÂO PODE DAR ERRO
  const {ticket, getTicket } = useTicket();
  useEffect(()=>{
    getTicket()
  },[])

  if(ticket?.status !== 'PAID') {
    return (
      <>
        <Title>Escolha de Atividades</Title>
        <CentralWarning>
        Você precisa ter confirmado o pagamento antes
        de fazer a escolha de atividades
        </CentralWarning>
      </>)
  }
  return (
    <>
      Atividades: Em breve!
    </>
  )
}


const Title = styled.h2 `
  font-family: 'Roboto', sans-serif;
  font-size: 40px;
  color: black;
  margin-bottom: 35px;

`

const CentralWarning = styled.p`
  position: relative;
  top: 36%;
  left: 21%;
  width: 411px;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  color: #8E8E8E;
`
























