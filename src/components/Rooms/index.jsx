import styled from "styled-components"
import useBookingsByRoom from "../../hooks/api/useBookingsByRoom"
import { useEffect, useState } from "react"
import PersonIcon from "./RoomIcons"
import ROOM_BUTTON_COLORS from "../../constants/roomButtonColors"

export default function Room({ room, setRoomSelected, roomSelected, selectFunction }) {
    const { bookingsByRoom, getBookingsByRoom } = useBookingsByRoom()
    const [colorProp, setColorProp] = useState(ROOM_BUTTON_COLORS.allAvailable)

    useEffect(() => {
        getBookingsByRoom(room.id)
    }, [])
    useEffect(()=>{
        if(bookingsByRoom?.length === room.capacity){
            setColorProp(ROOM_BUTTON_COLORS.noneAvailable)
        }else if(roomSelected){
            setColorProp(ROOM_BUTTON_COLORS.selected)
        }else if(!roomSelected){
            setColorProp(ROOM_BUTTON_COLORS.allAvailable)
        }
    },[roomSelected, selectFunction,bookingsByRoom])


    return (
        <Button onClick={()=>selectFunction()} disabled={colorProp.disabled} background={colorProp}>
            <h1>{room.name}</h1>
            <PersonIcon bookingsByRoom={bookingsByRoom} roomSelected={roomSelected} room={room} applyDisabled={colorProp.disabled}/>
        </Button>
    )
}

const Button = styled.button`
    width: 190px;
    height: 45px;
    border-radius: 10px;
    border: 1px solid #CECECE;
    margin: 8px;
    background-color: ${(props)=> props.background.backgroundColor}
    
`
