import { sidebarLinks } from "../../data";
import { logout } from "../../services/auth";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState(null);
  const user = useSelector((state) => state.authentication.user);

  const toggleSubMenu = (index) =>
    setOpenSubMenuIndex(openSubMenuIndex === index ? null : index);

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
    <div>
      {/* Navigation Bar */}
      <nav className="w-full fixed top-0 left-0 lg:hidden h-[70px] bg-navy flex justify-between items-center px-7 z-50">
        <img
          className="w-[25px]"
          onClick={() => setShowSidebar(true)}
          src="/menu.svg"
          alt="hamburger"
        />
        <img className="w-[55px]" src="/metro.png" alt="logo" />
        <div className="w-[35px] h-[35px] border-[2px] border-gray-700 rounded-full overflow-hidden cursor-pointer">
          <img
            className="w-full"
            src={user.profilePicture || "https://via.placeholder.com/40"}
            alt={user?.name}
          />
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        id="overflow"
        className={`fixed top-0 h-screen bg-navy transition-all duration-300 ease-in-out z-50 overflow-y-auto ${
          showSidebar ? "left-0" : "-left-full"
        } lg:left-0 w-full lg:w-[255px]`}
      >
        {/* Logo and Close Button */}
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

        {/* Sidebar Links */}
        <ul className="flex flex-col gap-4 p-4 overflow-y-auto">
          {sidebarLinks.map((item, index) => (
            <li
              key={index}
              onClick={() => toggleSubMenu(index)}
              className="cursor-pointer border-b border-gray-700 py-[6px]"
            >
              {/* Main Link */}
              <div className="flex justify-between items-center">
                <Link
                  to={item.link}
                  onClick={() => setShowSidebar(false)}
                  className="flex items-center hover:text-gray-200"
                >
                  <i
                    className={`${item.iconClass} mr-3 text-sm text-gray-200`}
                  ></i>
                  <p>{item.name}</p>
                </Link>
                {/* Arrow Icon for Submenu */}
                {item.childrens && item.childrens.length > 0 && (
                  <i
                    className={`fas text-xs text-gray-400 transition-transform ${
                      openSubMenuIndex === index
                        ? "fa-chevron-up"
                        : "fa-chevron-down"
                    }`}
                  ></i>
                )}
              </div>

              {/* Submenu */}
              {item.childrens &&
                item.childrens.length > 0 &&
                openSubMenuIndex === index && (
                  <ul className="flex flex-col gap-2 pl-5 p-3 my-2 rounded-lg bg-secondary animate_animated animate__bounceIn">
                    {item.childrens.map((subLink, subIndex) => (
                      <li
                        key={subIndex}
                        onClick={() => setShowSidebar(false)}
                        className="hover:text-gray-300 cursor-pointer flex items-center py-[5px]"
                      >
                        <Link to={subLink.link}>{subLink.name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
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
        <div className="w-full pl-2 py-2 hidden sm:block">
            <div className="flex items-center gap-4">
              <div className="w-[50px] h-[50px] rounded-full overflow-hidden cursor-pointer">
                <img
                  className="w-full"
                  src={user.profilePicture || "https://via.placeholder.com/40"}
                  alt="obaid"
                />
              </div>
              <div>
                <p className="text-sm">{user?.name}</p>
                <p className="text-xs">{user?.email}</p>
              </div>
            </div>
          </div>
      </aside>
    </div>
  );
};

export default Sidebar;
