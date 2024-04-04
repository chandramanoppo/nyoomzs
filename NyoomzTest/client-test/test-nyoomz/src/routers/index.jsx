import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Room from "../pages/Room";
import { redirect } from "react-router-dom";
import CreateRoom from "../pages/CreateRoom";
import { io } from 'socket.io-client';

const socket = io("http://localhost:3000", {
    autoConnect: true
});


  const router = createBrowserRouter([
    {
        path:'/create-room',
        element:<CreateRoom />
    },
    {
      path: "/room/:roomId",
      element: <Room socket={socket}/>,
    },
  ]);

  export default router 