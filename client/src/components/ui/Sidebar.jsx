import { sidebarLinks } from "../../data";
import { logoutAdmin } from "../../services/auth";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState(null);
  const admin = useSelector((state) => state.authentication.admin);

  const toggleSubMenu = (index) =>
    setOpenSubMenuIndex(openSubMenuIndex === index ? null : index);

  const handleLogout = () => {
    dispatch(logoutAdmin())
      .unwrap()
      .then(() => navigate("/"))
      .catch((error) => {
        console.error("Logout failed:", error);
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
          src="https://acdemicdashboard.netlify.app/menu.svg"
          alt="hamburger"
        />
        <img
          className="w-[50px]"
          src="https://buyfunoon.com/cdn/shop/files/FRAGRANCES_2_04d6b587-9fb1-4d9b-8a30-a406a1c54468.png?v=1717138062&width=90"
          alt="logo"
        />
        <div className="w-[35px] h-[35px] border-[2px] border-gray-700 rounded-full overflow-hidden cursor-pointer">
          <img className="w-full" src={admin.profilePicture} alt={admin.name} />
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        id="overflow"
        className={`fixed top-0 h-screen bg-navy transition-all duration-300 ease-in-out z-50 text-[0.82rem] overflow-y-auto ${
          showSidebar ? "left-0" : "-left-full"
        } lg:left-0 w-full lg:w-[250px]`}
      >
        {/* Logo and Close Button */}
        <div className="p-4 flex justify-between lg:justify-center items-center space-x-2 px-7">
          <img
            className="w-[50px]"
            src="https://buyfunoon.com/cdn/shop/files/FRAGRANCES_2_04d6b587-9fb1-4d9b-8a30-a406a1c54468.png?v=1717138062&width=90"
            alt="logo"
          />
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
              className="cursor-pointer border-b border-[#4d4d4d] py-[6px]"
            >
              {/* Main Link */}
              <div className="flex justify-between items-center">
                <Link
                  to={item.link}
                  onClick={() => setShowSidebar(false)}
                  className="flex items-center hover:text-gray-300"
                >
                  <i
                    className={`${item.iconClass} mr-3 text-sm text-gray-300`}
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
                    onClick={() => toggleSubMenu(index)}
                  ></i>
                )}
              </div>
              {/* Submenu */}
              {item.childrens &&
                item.childrens.length > 0 &&
                openSubMenuIndex === index && (
                  <ul className="flex flex-col gap-2 pl-5 p-3 my-2 rounded-lg bg-gray-700">
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

          <div className="w-full sm:bottom-2 left-2 pt-2 hidden sm:block">
            <div className="flex items-center gap-4">
              <div className="w-[50px] h-[50px] rounded-full overflow-hidden cursor-pointer">
                <img
                  className="w-full"
                  src={admin.profilePicture}
                  alt="obaid"
                />
              </div>
              <div>
                <p className="text-sm">{admin.name}</p>
                <p className="text-xs">{admin.email}</p>
              </div>
            </div>
          </div>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
