import gambar4 from "../assets/Online meeting via video conference.jpeg";

export default function EditProfile() {
  return (
    <>
      <form className="flex flex-col flex-wrap min-w-screen gap-2 py-36 bg-white min-h-[560px] ml-[280px] justify-center items-center ">
        <div className="flex flex-col mb-10 justify-center sm:mx-auto sm:w-full sm:max-w-sm">
          <p className="text-center text-3xl font-bold text-blue-500">
            NYO<span className="text-blue-700 border-white">OMZ</span>
          </p>
          <p className="text-center text-l text-gray-700">Edit your profile</p>
        </div>
        <div className="relative w-20 h-20 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <img src={gambar4} alt="" />
        </div>
        <div>
          <label className="block mt-3 text-sm font-medium leading-6 text-gray-900">
            Username
          </label>
          <div className="mt-2">
            <input
              type="text"
              required
              className="block w-[300px] rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-inset ring-blue-700 placeholder:text-blue-400 focus:ring-2 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="block mt-3 text-sm font-medium leading-6 text-gray-900">
              Image Url
            </label>
            <div className="text-sm"></div>
          </div>
          <div className="mt-2">
            <input
              type="text"
              required
              className="block px-2 w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-inset ring-blue-700 placeholder:text-blue-400 focus:ring-2 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="mt-5">
          <button
            type="submit"
            className="flex w-[300px] rounded-md justify-center bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:text-white hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Update
          </button>
        </div>
      </form>
    </>
  );
}
