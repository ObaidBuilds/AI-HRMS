import { sidebarLinks } from "../../data";
import { logout } from "../../services/authentication.service";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../shared/modals/Modal";
import { useTheme } from "../../context";
import Loader from "../shared/loaders/Loader";
import SettingModal from "../shared/modals/SettingModal";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { loading, user } = useSelector((state) => state.authentication);

  const [showSidebar, setShowSidebar] = useState(false);
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSettingModal, setShowSettingModal] = useState(false);

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

  const confirmLogout = () => {
    handleLogout();
    setShowConfirmModal(false);
  };

  useEffect(() => {
    if (showSidebar) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [showSidebar]);

  return (
    <div className="text-white">
      {loading && <Loader />}

      <nav
        className={`w-full fixed top-0 left-0 lg:hidden h-[70px] ${
          theme === "light"
            ? "bg-gradient-to-r from-[#0a2540] to-[#1d3557]"
            : "bg-gradient-to-r from-[#212d3f] to-[#1e293b]"
        } flex justify-between items-center px-7 z-50`}
      >
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

      <aside
        id="overflow"
        className={`fixed top-0 h-screen ${
          theme === "light"
            ? "bg-gradient-to-r from-[#0a2540] to-[#1d3557]"
            : "bg-gradient-to-r from-[#1e293b] to-[#212d3f]"
        }  transition-all duration-300 ease-in-out z-50 overflow-y-auto text-[0.72rem] font-medium ${
          showSidebar ? "left-0" : "-left-full"
        } lg:left-0 w-[75%] lg:w-[255px]`}
      >
        <div className="p-3 mt-3 sm:mt-5 flex justify-between lg:justify-center items-center space-x-2 px-7 animate-float">
          <div className="flex flex-col items-center">
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
          {sidebarLinks.map((item, index) => (
            <li
              key={index}
              onClick={() => toggleSubMenu(index)}
              className="cursor-pointer border-b border-gray-700 py-[5px]"
            >
              <div className="flex justify-between items-center">
                <Link
                  to={item.link}
                  onClick={() => setShowSidebar(false)}
                  className="flex items-center hover:text-primary"
                >
                  <i
                    className={`${item.iconClass} mr-3 text-sm text-gray-200`}
                  ></i>
                  <p>{item.name.toUpperCase()}</p>
                </Link>

                {item.childrens && item.childrens.length > 0 && (
                  <i
                    className={`fas text-[0.6rem] text-gray-400 transition-transform ${
                      openSubMenuIndex === index
                        ? "fa-chevron-up"
                        : "fa-chevron-down"
                    }`}
                  ></i>
                )}
              </div>

              {item.childrens &&
                item.childrens.length > 0 &&
                openSubMenuIndex === index && (
                  <ul
                    key={index}
                    className={`flex flex-col gap-2 pl-5 p-3 my-2 rounded-lg ${
                      theme === "light" ? "bg-[#233d64]" : "bg-gray-700"
                    } dropdown-active`}
                  >
                    {item.childrens.map((subLink, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subLink.link}
                        className="text-[0.82rem]"
                      >
                        <li
                          key={subIndex}
                          onClick={() => setShowSidebar(false)}
                          className="hover:text-gray-300 cursor-pointer flex items-center py-[3px]"
                        >
                          {subLink.name}
                        </li>
                      </Link>
                    ))}
                  </ul>
                )}
            </li>
          ))}

          <button
            onClick={() => {
              setShowSidebar(false);
              setShowConfirmModal(true);
            }}
            className="flex items-center border-b py-[4px] border-gray-700 hover:text-gray-300"
          >
            <i className="far fa-arrow-alt-circle-right mr-3 text-sm text-gray-300"></i>
            <p className=" text-[0.72rem]">LOGOUT</p>
          </button>

          <div className="w-full bg-[#1d3557] dark:bg-[#182233] rounded-xl relative group">
            <button
              onClick={() => {
                setShowSidebar(false);
                setShowSettingModal(true);
              }}
              className="absolute top-2 right-2 hidden group-hover:flex items-center justify-center w-8 h-8 bg-gray-700 dark:bg-gray-600 rounded-full cursor-pointer hover:bg-gray-600 transition-all duration-300"
            >
              <i className="fas fa-cog text-white text-sm"></i>
            </button>
            <div className="flex flex-col items-center gap-3 p-4">
              <div className="w-[60px] h-[60px] rounded-full overflow-hidden cursor-pointer border-2 border-gray-500 hover:scale-105 transition-all duration-300">
                <img
                  className="w-full h-full object-cover"
                  src={user.profilePicture || "https://via.placeholder.com/60"}
                  alt="Profile"
                />
              </div>
              <div className="text-center text-white">
                <p className="text-sm font-semibold">{user?.name}</p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
            </div>
          </div>
        </ul>
      </aside>

      {showConfirmModal && (
        <Modal
          onClose={() => setShowConfirmModal(false)}
          action="logout"
          isConfirm={confirmLogout}
        />
      )}

      {showSettingModal && (
        <SettingModal onClose={() => setShowSettingModal(false)} />
      )}
    </div>
  );
};

export default Sidebar;
