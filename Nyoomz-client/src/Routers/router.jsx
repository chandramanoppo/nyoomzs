import { redirect, createBrowserRouter } from "react-router-dom";
import RegisterPage from "../views/RegisterPage";
import LoginPage from "../views/LoginPage";
import RootLayout from "../Layouts/RootLayout";
import LandingPage from "../views/LandingPage";
import HomePage from "../views/HomePage";
import ListRoomPage from "../views/ListRoomPage";
import AddRoom from "../views/AddRoom";
import RoomPage from "../views/RoomPage";
import EditProfile from "../views/EditProfile";
import Swal from 'sweetalert2'
import { io } from 'socket.io-client';


const socket = io("http://localhost:3000", {
    autoConnect: true
});

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    element: <RootLayout />,
    loader:()=>{
      if(!localStorage.access_token){
        Swal.fire({
          title: "Error!",
          text: "Please login first!",
          icon: "error"
        });
        return redirect('/')
      } return null
    },
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/list-room",
        element: <ListRoomPage />,
      },
      {
        path: "/add-room",
        element: <AddRoom />,
      },
      {
        path: "/edit-user",
        element: <EditProfile />,
      },
      {
        path: "/rooms/:roomId",
        element: <RoomPage socket={socket} />,
      },
    ],
  },
  {
    path: "/register",
    element: <RegisterPage />,
    loader:()=>{
      if(localStorage.access_token){
        return redirect('/home')
      } return null
    },
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader:()=>{
      if(localStorage.access_token){
        return redirect('/home')
      } return null
    },
  },

]);
