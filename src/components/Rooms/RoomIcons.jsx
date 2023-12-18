import { useEffect, useState } from "react";
import { IoPersonSharp } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";

export default function PersonIcon({bookingsByRoom, room, roomSelected, applyDisabled }){

    const [ arrOfIcons, setArrOfIcons ] = useState([])

    useEffect(() => {
        createArrOfIcons()
    }, [bookingsByRoom, roomSelected])

    function createArrOfIcons(){
        let capacityForMap = room.capacity
        let selectedForMap = roomSelected
        const mapArray = Array.from({ length: room.capacity }).map(() => {
            const availablesLeft = capacityForMap - bookingsByRoom?.length;
            if (availablesLeft === capacityForMap && !roomSelected) {
                return 'available'
            } else if (availablesLeft === 0) {
                return 'not available'
            } else if (selectedForMap && roomSelected){
                capacityForMap--
                selectedForMap = false
                return 'selected'
            } else {
                capacityForMap--
                return 'available';
            }
        })
        setArrOfIcons(mapArray)
    } 

    return(
        <>
            {arrOfIcons.map((icon)=>{
                if(icon === 'available'){
                    return (
                        <>
                            <IoPersonOutline></IoPersonOutline>
                        </>
                    )
                }
                if(icon === 'not available'){
                    return (
                        <>
                            <IoPersonSharp></IoPersonSharp>
                        </>
                    )
                }
                if(icon === 'selected'){
                    return (
                        <>
                            <IoPersonSharp color="#FF4791"></IoPersonSharp>
                        </>
                    )
                }
                if(applyDisabled){
                    return (
                        <>
                            <IoPersonSharp color="#8C8C8C"></IoPersonSharp>
                        </>
                    )
                }
            })}
        </>
    )
}