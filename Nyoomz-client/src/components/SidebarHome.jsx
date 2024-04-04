import { Link, useNavigate } from "react-router-dom";

export default function SideNavbar() {
  const navigate = useNavigate();

  function handleLogout() {
      localStorage.removeItem("access_token");
      navigate("/login");
  }

  return (
    <>
      <aside
        id="default-sidebar"
        className="fixed z-10 top-16 left-0 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 mr-64"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-100 border-r-4 border-gray-300">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/edit-user"
                className="flex text-blue-700 items-center p-2 mt-4 rounded-lg hover:bg-blue-500 hover:text-white group"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
              </Link>
            </li>
            <li>
              <Link
                to="/list-room"
                className="flex text-blue-700 items-center p-2 rounded-lg hover:bg-blue-500 hover:text-white group"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">
                  List Rooms
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/add-room"
                className="flex text-blue-700 items-center p-2 rounded-lg hover:bg-blue-500 hover:text-white group"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">New Room</span>
              </Link>
            </li>

            <li>
              <a onClick={handleLogout} className="flex text-blue-700 items-center p-2 rounded-lg hover:bg-blue-500 hover:text-white group">
                <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
