import { useState } from "react";
import useHotelInfo from "../../../hooks/api/useHotelInfo";
import styled from "styled-components";
import Room from "../../../components/Rooms";
import usePostBooking from "../../../hooks/api/usePostBooking";


export default function Hotel() {
  const {hotelInfo, hotelInfoLoading, getHotelInfo} = useHotelInfo()
  const {bookingId, postBooking} = usePostBooking()
  const [showRooms, setShowRooms] = useState(false)
  const [ roomSelected, setRoomSelected ] = useState(undefined)

  //VARIAVEL PARA VISUALIZAR O CODIGO DA SELEÇÃO DE QUARTOS
  //DEPOIS MUDAR PARA O ID DO QUARTO SELECIONADO 
  //
  const HOTELID = 92;
  //
  ////////////////////////////////////////////////////////


  async function selectHotel(){
    setShowRooms(true)
    await getHotelInfo(HOTELID)
  }

  function select(roomId){
    if(roomSelected === roomId){
        setRoomSelected(undefined)
    }else{
        setRoomSelected(roomId)
    }
  }

  function reserveRoom(){
    const body = {
      roomId: roomSelected
    }
    postBooking(body)
  }
  console.log(hotelInfo)

  return (
    <>
      <Title>Escolha de hotel e quarto</Title>
      {!bookingId ? (
        <>
          <TitleSec>Primeiro, escolha seu hotel</TitleSec>
          <HotelOption onClick={selectHotel}></HotelOption>
          <HotelOption onClick={selectHotel}></HotelOption>
          {showRooms ? (
            <>
              <TitleSec>Ótima pedida! Agora escolha seu quarto:</TitleSec>
              <RoomsContainer>
                {hotelInfo?.Rooms.map(room => <Room key={room.id} room={room} roomSelected={roomSelected === room.id} setRoomSelected={setRoomSelected} selectFunction={()=>select(room.id)} />)}
              </RoomsContainer>
              <ReserveBtn onClick={reserveRoom} disabled={roomSelected? false: true}>
                Reservar quarto
              </ReserveBtn>
            </>
          ) : (<></>)}
        </>
      ):(<></>) }
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

const HotelOption = styled.button`
  width: 196px;
  height: 264px;
  border-radius: 10px;
  background: #EBEBEB;
  border: none;
  margin-right: 15px;
`

const RoomsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const ReserveBtn = styled.button`
  width: 182px;
  height: 37px;
  border-radius: 4px;
  background: #E0E0E0;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
  border: none;
  color: #000;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 45px;
`