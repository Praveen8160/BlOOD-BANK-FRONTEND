import React, { useEffect, useState } from "react";
import logo from "../assets/logo3.jpeg";
import { MdMenu, MdClose } from "react-icons/md";
import { PiUserSquareFill } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../store/Authaction";

export default function Header() {
  const { isAuth } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  // console.log(isAuth)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
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
                <Link to="/profile">
                  {" "}
                  <PiUserSquareFill size={37} />
                </Link>
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
      </header>
    </>
  );
}
