import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import ResponsiveNavbar from "./ResponsiveNavbar";
import { logout, updateProfie } from "../../services/auth";
import ProfileModal from "../shared/modals/ProfileModal";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, user } = useSelector((state) => state.authentication);
  const [imagePreview, setImagePreview] = useState(user.profilePicture);
  const [showSidebar, setShowSidebar] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => navigate("/"));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
        setShowButton(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = async () => {
    const updatedProfilePicture = await updateProfie(setProfileLoading);
    if (updatedProfilePicture) {
      setImagePreview(updatedProfilePicture);
    }
    setToggleModal(false);
  };

  return (
    <>
      <header className="hidden bg-navy text-white h-[50px] border-b md:flex justify-around items-center border-gray-700">
        <div className="text-sm">
          <Link to={"/update"}>
            <p className="flex items-center gap-2">
              <i className="fa fa-bullhorn text-xs"></i>
              Updates
            </p>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-[0.81rem]">{user.name}</p>
          <span className="text-gray-400">|</span>
          <div
            onClick={() => setToggleModal(true)}
            className="w-[35px] h-[35px] rounded-full overflow-hidden border border-gray-600 cursor-pointer"
          >
            <img
              className="w-full text-sm"
              src={imagePreview}
              alt={user.name}
            />
          </div>
        </div>
      </header>
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
          <Link to={"/security"}>
            <li className="text-[0.9rem] flex-col md:flex-row flex items-center md:gap-2">
              Security
            </li>
          </Link>
          <Link to={"/attendance"}>
            <li className="text-[0.9rem] flex-col md:flex-row flex items-center md:gap-2">
              Attendance
            </li>
          </Link>
          <Link to={"/leave"}>
            <li className="text-[0.9rem] flex-col md:flex-row flex items-center md:gap-2">
              Leave
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
          <div
            onClick={() => setToggleModal(true)}
            className="block md:hidden w-[40px] h-[40px] rounded-full overflow-hidden border border-gray-600 cursor-pointer"
          >
            <img className="w-full" src={imagePreview} alt={user.name} />
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
      {toggleModal && (
        <ProfileModal
          name={user.name}
          showButton={showButton}
          loading={profileLoading}
          handleClick={handleClick}
          imagePreview={imagePreview}
          close={() => setToggleModal(false)}
          handleFileChange={handleFileChange}
        />
      )}
    </>
  );
};

export default Navbar;
