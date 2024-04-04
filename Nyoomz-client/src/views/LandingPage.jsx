import Footer from "../components/Footer";

import gambar1 from "../assets/Online meeting via video conference.jpeg";

import NavbarLandingPage from "../components/NavbarLandingPage";
export default function LandingPage() {
  return (
    <>
      <NavbarLandingPage />

      <div className="flex h-[600px] gap-10 py-40 bg-gray-50">
        <div className="px-20 py-20 text-center">
          <p className="text-4xl space-y-10 subpixel-antialiased tracking-wide font-serif">
            Stay connected, build relationships, and collaborate effortlessly
            with{" "}
          </p>
          <p className="text-5xl py-5 font-bold text-blue-500">
            NYO<span className="text-blue-700 border-white">OMZ</span>
          </p>
        </div>

        <div className="flex flex-col px-16 gap-10 place-items-end">
          <div className="flex justify-center">
            <img src={gambar1} alt="" className="h-full w-full" />
          </div>
        </div>
        {/* <div className="flex justify-center">
          <img src={gambar2} alt="" className="max-h-[350px] max-w-[230px]" />
        </div> */}
      </div>
      <div className="flex h-[600px] gap-10 py-40 bg-blue-500"></div>
      <Footer />
    </>
  );
}
