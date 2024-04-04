import { io } from 'socket.io-client'
import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { Peer } from "peerjs";
export default function Room({socket}){

    const [video,setVideo] = useState([])

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
            console.log(myVideo);
            call.answer(stream)
            const video = document.createElement('video')
            call.on('stream', userVideoStream => {
                addVideoStream(video, userVideoStream)
            })
        })

    socket.on('user-connected', userId => {
        console.log(`User ${userId} has connected`);
        connectToNewUser(userId, stream)
    })
    })

    socket.on('user-disconnected', userId => {
        console.log(`Bye ${userId}`);
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
    // const test = <video controls width="300" height="200"></video>;
    return(
        <div>
           {/* {test}  */}
        </div>
    )
}