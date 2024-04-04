import { Link, useNavigate } from "react-router-dom"



export default function RegisterPage() {
    // const navigate = useNavigate()

    // async function handleRegister(
    //     e,
    //     username,
    //     email,
    //     password
    // ) {
    //     e.preventDefault();
    //     try {
    //         const { data } = await axios.post(
    //             `${}/register`,
    //             { username, email, password },
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${localStorage.access_token}`,
    //                 },
    //             }
    //         );

    //         navigate("/login");
    //     } catch (error) {
    //         console.log(error);
    //    
    //     }
    // }

    return (<>
        <>
            {/* TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com */}
            <section className="h-screen">
                <div className="container h-full px-6 py-24">
                    <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                        {/* Left column container with background*/}
                        <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
                            <img
                                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                className="w-full"
                                alt="Phone image"
                            />
                        </div>
                        {/* Right column container with form */}


                        <div className="flex justify-center md:w-8/12 lg:ml-6 lg:w-5/12">

                            <form>
                                <div className="flex flex-col mb-10 justify-center sm:mx-auto sm:w-full sm:max-w-sm">
                                    <p className="text-center text-3xl font-bold text-blue-500">
                                        NYO<span className="text-blue-700 border-white">OMS</span>
                                    </p>
                                    <p className="text-center text-l text-gray-700">
                                        Register to your account
                                    </p>
                                </div>
                                <div >
                                    <label className="block mt-3 text-sm font-medium leading-6 text-gray-900">
                                        Username
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="username"
                                            type="text"
                                            required
                                            className="block w-[300px] rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-inset ring-blue-700 placeholder:text-green-400 focus:ring-2 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block mt-3 text-sm font-medium leading-6 text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            className="block w-[300px] rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-inset ring-blue-700 placeholder:text-blue-400 focus:ring-2 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>


                                <div>
                                    <div className="flex items-center justify-between">
                                        <label className="block mt-3 text-sm font-medium leading-6 text-gray-900">
                                            Password
                                        </label>
                                        <div className="text-sm"></div>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
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
                                        Register
                                    </button>
                                </div>
                                <div className="mt-3 text-xs">Already have an account? <Link to={"/login"} className="text-blue-500">Sign In</Link></div>

                            </form>

                        </div>
                    </div>
                </div>
            </section>
        </>
    </>)
}