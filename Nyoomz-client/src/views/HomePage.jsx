import SideNavbar from "../components/SidebarHome";
import gambar3 from "../assets/user-laptop.png";
export default function HomePage() {
  return (
    <>
      <div className="flex min-w-screen gap-10 py-36 bg-white min-h-[560px] ml-[280px] justify-center">
        <div className="flex flex-col items-center">
          <p className="text-3xl font-semibold">Welcome to Nyooms!</p>
          <p className="py-5 text-xl text-wrap">
            Join Video Chat today and experience the future of video
            communication with us!
          </p>
          <img className="w-[250px] h-[250px] py-4" src={gambar3} alt="" />
        </div>
      </div>
    </>
  );
}
