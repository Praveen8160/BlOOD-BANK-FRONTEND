import React, { useEffect, useState } from "react";
import logo from "../assets/logo3.jpeg";
import { MdMenu, MdClose, MdNotifications } from "react-icons/md";
import { PiUserSquareFill } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../store/Authaction";
import axios from "axios";
import io from "socket.io-client";

export default function Header() {
  const { isAuth } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const savedBloodBankId = localStorage.getItem("id");

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navigate = useNavigate();

  const handleNavigation = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue) {
      navigate(selectedValue);
      event.target.value = "";
      if (isMenuOpen) {
        setIsMenuOpen(!isMenuOpen);
      }
    }
  };
  useEffect(() => {
    dispatch(login());
    const socket = io("http://localhost:4000");
    if (savedBloodBankId) {
      socket.emit("register", savedBloodBankId);
    }
    socket.on("newRequest", (data) => {
      // console.log("data", data);
      setNotifications((prev) => [...prev, data]);
      // toast.success(data.message);
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch, savedBloodBankId]);

  const handleLogout = () => {
    dispatch(logout());
    setNotifications([]);
    setIsOpen(false)
    navigate("/");
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const removeAll = async () => {
    try {
      const res = await axios.delete(
        "http://localhost:4000/bloodrequest/removeAll",
        {
          withCredentials: true,
        }
      );
      if (res.data.success === true) {
        toast.success("All Notifications Removed");
        setNotifications([]);
        toggleDropdown();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <header
        className={`bg-slate-50 shadow-2xl rounded-b-lg sticky top-0 flex flex-col md:flex-row md:justify-between md:items-center px-4 md:px-10 transition-all duration-700 z-50 overflow-hidden${
          isMenuOpen ? "h-auto py-4" : "h-28"
        }`}
      >
        <div className="flex justify-between items-center w-full">
          <img src={logo} alt="Logo" className="md:h-28 md:w-32 h-24 w-28" />
          <div className="md:hidden flex gap-5">
            <button
              onClick={handleToggleMenu}
              className="md:hidden flex items-center text-gray-700 focus:outline-none"
            >
              <span className="sr-only">Toggle menu</span>
              {isMenuOpen ? <MdClose size={30} /> : <MdMenu size={30} />}
            </button>
            {isAuth === true && (
              <>
                <Link to="/profile" className="md:hidden">
                  {" "}
                  <PiUserSquareFill size={37} />
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:justify-evenly md:w-auto md:ml-10 lg:ml-40">
          <div className="flex flex-col md:flex-row md:items-center gap-5 cursor-pointer">
            <Link to="/" className="font-semibold mr-6">
              Home
            </Link>

            <select
              title="Option"
              className="lg:w-44 text-center md:w-40 p-2.5 font-semibold text-white border-none rounded-3xl shadow-sm outline-none bg-red-700 transition-all duration-500 appearance-none cursor-pointer md:hover:w-48"
              onChange={handleNavigation}
            >
              <option className="bg-white" value="" selected hidden disabled>
                Looking for blood
              </option>
              <option className="bg-white text-black" value="/BloodDirectory">
                Blood Bank Directory
              </option>
              <option className="bg-white text-black" value="/NearbyDonor">
                Nearby Donor
              </option>
              <option className="bg-white text-black" value="/BloodbankCamps">
                Blood Bank Camps
              </option>
            </select>
            {isAuth === false ? (
              <>
                <select
                  title="Option"
                  className="lg:w-44 text-center md:w-40 font-semibold p-2.5 border-none text-white appearance-none rounded-3xl outline-none bg-red-700 transition-all duration-500 focus:ring-0 focus:border-none shadow-none cursor-pointer md:hover:w-48"
                  onChange={handleNavigation}
                >
                  <option
                    className="bg-white"
                    value=""
                    selected
                    hidden
                    disabled
                  >
                    Blood Bank
                  </option>
                  <option
                    className="bg-white text-black"
                    value="/BloodBankRegister"
                  >
                    Add Your Blood Bank
                  </option>
                  <option
                    className="bg-white text-black"
                    value="/BloodBankLogin"
                  >
                    Login Blood Bank
                  </option>
                </select>

                <select
                  title="Option"
                  className="lg:w-44 md:w-36 text-center font-semibold p-2.5 border-none text-white appearance-none rounded-3xl outline-none bg-red-700 transition-all duration-500 focus:ring-0 focus:border-none shadow-none cursor-pointer md:hover:w-48"
                  onChange={handleNavigation}
                >
                  <option
                    className="bg-white"
                    value=""
                    selected
                    hidden
                    disabled
                  >
                    Donor
                  </option>
                  <option
                    className="bg-white text-black"
                    value="/DonorRegister"
                  >
                    Donor Register
                  </option>
                  <option className="bg-white text-black" value="/DonorLogin">
                    Donor Login
                  </option>
                </select>
              </>
            ) : (
              <div className="flex gap-5">
                <button
                  className="lg:w-44 text-center md:w-40 p-2.5 font-bold text-white border-none rounded-3xl shadow-sm outline-none bg-red-700 transition-all duration-500 appearance-none cursor-pointer md:hover:w-48 hover:text-black"
                  onClick={handleLogout}
                >
                  Logout
                </button>
                <Link
                  to="/profile"
                  className="flex justify-center items-center hover:text-black"
                >
                  {" "}
                  <PiUserSquareFill size={37} />
                </Link>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center p-2 text-gray-600 hover:text-gray-800 focus:outline-none rounded-full transition-colors duration-200"
                  aria-label="Notifications"
                >
                  <MdNotifications size={30} />
                  {notifications.length > 0 && (
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium ${
                        notifications.length > 0
                          ? "bg-red-100 text-red-800"
                          : null
                      }`}
                    >
                      {notifications.length}
                    </span>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <div className="flex flex-col items-start gap-4">
              <Link to="/" className="font-semibold self-center">
                Home
              </Link>
              <select
                title="Option"
                className="w-full text-center font-semibold p-2.5 border-none text-black appearance-none bg-white rounded-3xl outline-none hover:bg-red-500 transition-all duration-1000 focus:ring-0 focus:border-none shadow-none cursor-pointer"
                onChange={handleNavigation}
              >
                <option className="bg-white" value="" selected hidden disabled>
                  Looking for blood
                </option>
                <option className="bg-white" value="/BloodDirectory">
                  Blood Bank Directory
                </option>
                <option className="bg-white" value="/NearbyDonor">
                  Nearby Donor
                </option>
                <option className="bg-white" value="/BloodbankCamps">
                  Blood Bank Camps
                </option>
              </select>
              {isAuth === false ? (
                <>
                  {" "}
                  <select
                    title="Option"
                    className="w-full text-center font-semibold p-2.5 border-none text-black appearance-none bg-white rounded-3xl outline-none hover:bg-red-500 transition-all duration-1000 focus:ring-0 focus:border-none shadow-none cursor-pointer"
                    onChange={handleNavigation}
                  >
                    <option
                      className="bg-white"
                      value=""
                      selected
                      hidden
                      disabled
                    >
                      Blood Bank
                    </option>
                    <option
                      className="bg-white text-black"
                      value="/BloodBankRegister"
                    >
                      Add Your Blood Bank
                    </option>
                    <option
                      className="bg-white text-black"
                      value="/BloodBankLogin"
                    >
                      Login Blood Bank
                    </option>
                  </select>
                  <select
                    title="Option"
                    className="w-full text-center font-semibold p-2.5 border-none text-black appearance-none bg-white rounded-3xl outline-none hover:bg-red-500 transition-all duration-1000 focus:ring-0 focus:border-none shadow-none cursor-pointer"
                    onChange={handleNavigation}
                  >
                    <option
                      className="bg-white"
                      value=""
                      selected
                      hidden
                      disabled
                    >
                      Donor
                    </option>
                    <option className="bg-white" value="/DonorRegister">
                      Donor Register
                    </option>
                    <option className="bg-white" value="/DonorLogin">
                      Donor Login
                    </option>
                  </select>
                </>
              ) : (
                <button
                  className="w-full text-center font-semibold p-2.5 border-none text-black appearance-none bg-white rounded-3xl outline-none hover:bg-red-500 transition-all duration-1000 focus:ring-0 focus:border-none shadow-none cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
        <ToastContainer />
        {isOpen && (
          <div className="absolute right-10 top-28 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-20 border border-gray-200">
            <div className="py-2">
              <div className="px-4 py-2 bg-gray-50 text-gray-800 font-semibold flex justify-between items-center border-b border-gray-200">
                <span>Notification/Requests</span>
                <span className="text-sm bg-blue-500 text-white px-2 py-1 rounded-full">
                  {notifications.length} New
                </span>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((request) => (
                  <div
                    className="px-4 py-3 hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {request.message}
                        </p>
                        {/* <p className="text-xs text-gray-600 mt-1">
                          Date: {request.date}
                        </p>
                        <p className="text-xs text-gray-700 mt-1">
                          {request.message}
                        </p> */}
                      </div>
                      {/* <span
                        className={`px-2 py-1 text-xs rounded-full font-medium ${
                          request.urgency === "High"
                            ? "bg-red-100 text-red-800"
                            : request.urgency === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {request.urgency}
                      </span> */}
                    </div>
                  </div>
                ))}
              </div>
              {notifications.length > 0 && (
                <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
                  <button
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
                    onClick={removeAll}
                  >
                    Remove All
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
