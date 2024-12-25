import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import ResponsiveNavbar from "./ResponsiveNavbar";
import { logout } from "../../services/auth";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false);
  const { loading } = useSelector((state) => state.authentication);

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => navigate("/"))
      .catch((error) => {
        console.error("Error Logging out:", error);
      });
  };
  return (
    <>
      <nav className="bg-navy w-full h-[70px] md:h-[85px] flex items-center px-8 md:px-0 justify-between md:justify-around relative top-0 left-0 border-b border-gray-700 text-white">
        <div
          onClick={() => setShowSidebar(!showSidebar)}
          className="block md:hidden"
        >
          <img className="w-[25px] cursor-pointer" src="/menu.svg" alt="Menu" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <img className="w-[55px]" src="/metro.png" alt="logo" />
          <h1
            className="text-center mt-1 text-sm hidden lg:block"
            style={{ fontFamily: "Bruno Ace, sans-serif" }}
          >
            Metro Cash & Carry
          </h1>
        </div>
        <ul className="hidden md:flex items-center gap-6 justify-center">
          <Link to={"/"}>
            <li className="text-[0.9rem] flex-col md:flex-row flex items-center md:gap-2">
              Home
            </li>
          </Link>
          <Link to={"/"}>
            <li className="text-[0.9rem] flex-col md:flex-row flex items-center md:gap-2">
              Profile
            </li>
          </Link>
          <Link to={"/"}>
            <li className="text-[0.9rem] flex-col md:flex-row flex items-center md:gap-2">
              Security
            </li>
          </Link>
          <Link to={"/attendance"}>
            <li className="text-[0.9rem] flex-col md:flex-row flex items-center md:gap-2">
              Attendance
            </li>
          </Link>
          <Link to={"/complaint"}>
            <li className="text-[0.9rem] flex-col md:flex-row flex items-center md:gap-2">
              Complaint
            </li>
          </Link>
          <Link to={"/feedback"}>
            <li className="text-[0.9rem] flex-col md:flex-row flex items-center md:gap-2">
              Feedback
            </li>
          </Link>
        </ul>
        <div>
          <div className="block md:hidden w-[40px] h-[40px] rounded-full overflow-hidden border border-gray-600 cursor-pointer">
            <img
              className="w-full"
              src="https://obaidbroimages.netlify.app/obaid.png"
              alt="Profile"
            />
          </div>
          <div className="hidden md:block">
            <button
              disabled={loading}
              onClick={handleLogout}
              className="text-sm flex items-center justify-center gap-2 h-[38px] p-2 w-[150px] rounded-3xl bg-blue-700 border-2 border-blue-700 hover:bg-blue-800 transition-all ease-in-out"
            >
              {loading ? (
                <ClipLoader size={10} color="white" loading={loading} />
              ) : (
                <>
                  <i className=" text-xs fas fa-sign-out-alt"></i>
                  Logout
                </>
              )}
            </button>
          </div>
        </div>
      </nav>
      <ResponsiveNavbar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
    </>
  );
};

export default Navbar;
