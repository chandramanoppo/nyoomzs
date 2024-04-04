import { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router'


export default function AddRoom() {
  const navigate = useNavigate()
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState(null);
  const [form,setForm] = useState({
    name:'',
    password:null,
    allowPublic:true
  })
  useEffect(() => {
    console.log(isPublic, "<<isPublic");
    if (isPublic) setPassword(null);
  }, [isPublic]);

  async function handleSubmit(e){
    try {
      e.preventDefault()
      let {data} = await axios.post(`http://localhost:3000/create-room`,form,{headers:{Authorization:`Bearer ${localStorage.access_token}`}})
      navigate('/list-room')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}  className="flex flex-col flex-wrap min-w-screen gap-2 py-36 bg-white min-h-[560px] ml-[280px] justify-center items-center ">
        <div className="flex flex-col mb-10 justify-center sm:mx-auto sm:w-full sm:max-w-sm">
          <p className="text-center text-3xl font-bold text-blue-500">
            NYO<span className="text-blue-700 border-white">OMZ</span>
          </p>
          <p className="text-center text-l text-gray-700">Create room</p>
        </div>

        <div>
          <label className="block mt-3 text-sm font-medium leading-6 text-gray-900">
            Room Name
          </label>
          <div className="mt-2">
            <input
              type="text"
              onChange={(e)=>{setForm({...form,name:e.target.value})}}
              required
              className="block w-[300px] rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-inset ring-blue-700 placeholder:text-blue-400 focus:ring-2 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <select
          className="mt-3"
          onChange={(e) => {
            setIsPublic(!isPublic);
            setForm({...form,allowPublic:e.target.value})
          }}
        >
          <option defaultValue={"select"} value={true}>
            Public
          </option>
          <option value={false}>Private</option>
        </select>
        <div>
          {isPublic ? null : (
            <>
              <div className="flex items-center justify-between">
                <label className="block mt-3 text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm" ></div>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  onChange={(e)=>{setForm({...form,password:e.target.value})}}
                  required
                  className="block px-2 w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-inset ring-blue-700 placeholder:text-blue-400 focus:ring-2 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6"
                />
              </div>
            </>
          )}
        </div>

        <div className="mt-5">
          <button
            type="submit"
            className="flex w-[300px] rounded-md justify-center bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:text-white hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Create Room
          </button>
        </div>
      </form>
    </>
  );
}
