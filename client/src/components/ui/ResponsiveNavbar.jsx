import { useDispatch } from "react-redux";
import { navbarLinks } from "../../data";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../services/auth";

function ResponsiveNavbar({ showSidebar, setShowSidebar }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => navigate("/"))
      .catch((error) => {
        console.error("Error Logging out:", error);
      });
  };

  useEffect(() => {
    if (showSidebar) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [showSidebar]);

  return (
    <aside
      id="overflow"
      className={`text-white fixed md:hidden text-[0.72rem] top-0 h-screen bg-navy transition-all duration-300 ease-in-out z-50 overflow-y-auto ${
        showSidebar ? "left-0" : "-left-full"
      } lg:left-0 w-full lg:w-[255px]`}
    >
      <div className="p-3 mt-3 sm:mt-5 flex justify-between lg:justify-center items-center space-x-2 px-7 animate-float">
        <div className="flex flex-col sm:items-center animate__animated animate__bounce">
          <img className="w-[55px]" src="/metro.png" alt="logo" />
          <h1
            className="text-center mt-1 text-base"
            style={{ fontFamily: "Bruno Ace, sans-serif" }}
          >
            Metro Cash & Carry
          </h1>
        </div>
        <div
          onClick={() => setShowSidebar(false)}
          className="lg:hidden w-[30px] h-[30px] bg-gray-600 hover:bg-gray-700 flex justify-center items-center rounded-full cursor-pointer transition-all ease-in-out"
        >
          <i className="fa-solid fa-xmark lg:hidden"></i>
        </div>
      </div>

      <ul className="flex flex-col gap-4 p-4 overflow-y-auto">
        {navbarLinks.map((item, index) => (
          <li
            key={index}
            className="cursor-pointer border-b border-gray-700 py-[6px]"
          >
            <div className="flex justify-between items-center">
              <Link
                to={item.link}
                onClick={() => setShowSidebar(false)}
                className="flex items-center hover:text-gray-200"
              >
                <i
                  className={`${item.iconClass} mr-3 text-sm text-gray-200`}
                ></i>
                <p>{item.name.toUpperCase()}</p>
              </Link>
            </div>
          </li>
        ))}
        <button
          onClick={handleLogout}
          className="flex items-center border-b py-[6px] border-[#4d4d4d] hover:text-gray-300"
        >
          <i className="fas fa-sign-out-alt mr-3 text-sm text-gray-300"></i>
          <p>Logout</p>
        </button>
      </ul>
    </aside>
  );
}

export default ResponsiveNavbar;
