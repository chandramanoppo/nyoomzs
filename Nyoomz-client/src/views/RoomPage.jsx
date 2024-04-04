import Navbar from "../components/Navbar";
import { Icon } from "@iconify/react";
import { Peer } from "peerjs";
import { useEffect,useState } from 'react';
import { io } from 'socket.io-client'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router'


export default function RoomPage({socket}) {
  const navigate = useNavigate()
  const [users,setUsers] = useState([])

  let { roomId } = useParams();
  // const videoGrid = document.getElementById('video-grid')

  const myPeer = new Peer(undefined, {
  host: '/',
  port: '3001'
  })
  

  const myVideo = document.createElement('video')
  myVideo.muted = true
  const peers = {}
  navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
  }).then(stream => {
      addVideoStream(myVideo, stream)
      
      myPeer.on('call', call => {
          call.answer(stream)
          const video = document.createElement('video')
          call.on('stream', userVideoStream => {
              addVideoStream(video, userVideoStream)
          })
      })

  socket.on('user-connected', userId => {
      connectToNewUser(userId, stream)
  })
  })

  socket.on('user-disconnected', userId => {
    getProfile()

      if (peers[userId]) peers[userId].close()
  })

  myPeer.on('open', id => {
      socket.emit('join-room', roomId, id)
  })

  function connectToNewUser(userId, stream) {
      const call = myPeer.call(userId, stream)
      const video = document.createElement('video')
      call.on('stream', userVideoStream => {
          addVideoStream(video, userVideoStream)
      })
      call.on('close', () => {

          video.remove()
  })

  peers[userId] = call
  }

  function addVideoStream(video, stream) {
      video.srcObject = stream
      video.addEventListener('loadedmetadata', () => {
          video.play()
  })
  // videoGrid.append(video)

  }

  async function getProfile(){
    try {
      let {data} = await axios.get('http://localhost:3000/profile',{headers:{Authorization:`Bearer ${localStorage.access_token}`}})
      // console.log(data);
      setUsers([...users,data])
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getProfile()
  },[])



  return (
    <>
      <Navbar />
      <div className="pl-96 h-screen grid grid-cols-4 min-w-screen gap-1 my-32 bg-white max-h-screen m-8 auto-cols-max ">
        {users.map((el, i) => {
          console.log(users);
          return (
            <div className="flex flex-col flex-wrap w-[290px] h-[200px] rounded-sm max-md:text-center max-md:w-[90%] max-md:gap-3 border border-blue-700">
              <img src={el.imgUrl} alt="" />
            </div>
          );
        })}
      </div>
      <div className="bg-transparent w-full flex items-center justify-center fixed bottom-0 z-50">
        <button onClick={()=>{
          navigate('/list-room')
        }}>
        <Icon
          icon="ion:close-circle-sharp"
          width="50"
          height="128"
          className="text-red-500"
        />
        </button>
      </div>
    </>
  );
}
