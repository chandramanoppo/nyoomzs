import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SideNavbar from "../components/SidebarHome";

export default function RootLayout() {
  return (
    <div>
      <Navbar />
      <SideNavbar />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
}
