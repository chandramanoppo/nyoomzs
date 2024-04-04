import { useSelector, useDispatch } from 'react-redux'
import { fetchPublicRooms } from '../features/rooms/roomSlice';
import { useEffect, useState} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios'
import { useNavigate } from "react-router-dom"

export default function ListRoomPage() {
  const array = [1, 1, 1, 1, 1];
  const url = 'http://localhost:3000'
  const navigate = useNavigate()
  const [form,setForm] = useState({
    roomId:'',
    password:null
  })

  const {loading,rooms,error} = useSelector((state)=>state.room)
  const dispatch = useDispatch()

  useEffect(()=>{
      dispatch(fetchPublicRooms())
  },[])

  async function handleDelete(e){
    try {
      console.log(e);
      let data = await axios.delete(`${url}/browse-room/${e}`,{headers:{Authorization:`Bearer ${localStorage.access_token}`}})
      dispatch(fetchPublicRooms())
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "Not your room!",
        icon: "error"
      });
    }
  }

  async function handleJoin(e){
    try {
      e.preventDefault()
      console.log(form);
      let {data} = await axios.post(`${url}/join-room/${form.roomId}`,{password:form.password},{headers:{Authorization:`Bearer ${localStorage.access_token}`}})
      navigate(`/rooms/${form.roomId}`)
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: error.response,
        icon: "error"
      });
    }
  }

  async function handleJoinPublic(e,roomId){
    try {
      e.preventDefault()
      console.log(roomId);
      let {data} = await axios.post(`${url}/join-room/${roomId}`,{},{headers:{Authorization:`Bearer ${localStorage.access_token}`}})
      navigate(`/rooms/${roomId}`)
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: error.response,
        icon: "error"
      });
    }
  }
  
  return (
    <>
      <div></div>
      <div className="flex flex-row flex-wrap min-w-screen gap-10 py-40 bg-white min-h-[560px] ml-[280px] justify-center ">
        <p className="text-2xl font-semibold text-blue-700">
          Browse private room
        </p>
        <form onSubmit={handleJoin} className="flex gap-2 justify-center w-screen mb-10">
          <label>Room Id</label>
          <input type="text" className="border rounded-md" onChange={(e)=>{setForm({...form,roomId:e.target.value})}}/>

          <label>Password</label>
          <input type="text" className="border rounded-md" onChange={(e)=>{setForm({...form,password:e.target.value})}}/>

          <button
            type="submit"
            className="bg-blue-600 text-white hover:bg-blue-700 px-3 py-1 rounded-md"
          >
            Browse
          </button>
        </form>
        {rooms.map((el, idx) => {
          return (
            <div
              key={idx}
              className="px-32 py-10 max-md:text-center max-md:w-[90%] max-md:gap-3 flex flex-col border-2 rounded-xl border-blue-700 bg-white hover:shadow-xl"
              style={{ whiteSpace: "nowrap" }}
            >
              <div className="flex flex-col items-center py-3 mb-5 ">
                <p className="flex text-center first-letter:uppercase text-l font-semibold">
                  {el.name}
                </p>
              </div>
              <div className="flex flex-col items-center w-full mb-5 gap-5">
                <button
                  type="button"
                  className="text-white bg-blue-700focus:ring-4 focus:outline-nonefont-medium rounded-lg text-sm px-10 py-2 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                  onClick={(e)=>{handleJoinPublic(e,el.roomId)}}
                >
                  <a>Join Room</a>
                </button>
                <button onClick={()=>{handleDelete(el.id)}} className='text-white bg-red-700focus:ring-4 focus:outline-nonefont-medium rounded-lg text-sm px-10 py-2 text-center bg-red-600 hover:bg-red-700 focus:ring-red-800'>
                  Delete Room
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
