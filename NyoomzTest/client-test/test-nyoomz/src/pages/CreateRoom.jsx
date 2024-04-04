import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
export default function CreateRoom(){
    let navigate = useNavigate()

    async function createRoom(){
        try {
            let {data} = await axios.get('http://localhost:3000/')
            navigate(`/room${data.path}`)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        createRoom()
    },[])
    return(
        <div></div>
    )
}