import React, { useState } from "react";
import logo from "../assets/logo3.jpeg";
import { MdMenu, MdClose } from "react-icons/md";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

          <button
            onClick={handleToggleMenu}
            className="md:hidden flex items-center text-gray-700 focus:outline-none"
          >
            <span className="sr-only">Toggle menu</span>
            {isMenuOpen ? <MdClose size={30} /> : <MdMenu size={30} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:justify-evenly md:w-auto md:ml-10 lg:ml-40">
          <div className="flex flex-col md:flex-row md:items-center gap-5 cursor-pointer">
            <h1 className="font-semibold mr-6">Home</h1>
            <select
              title="Click it"
              className="lg:w-44 text-center md:w-40 p-2.5 font-semibold text-black border-none rounded-3xl shadow-sm outline-none bg-red-500 transition-all duration-500 appearance-none cursor-pointer md:hover:w-48"
            >
              <option className="bg-white" selected hidden disabled>
                Looking for blood
              </option>
              <option className="bg-white" value="Blood Availability">
              Blood Bank Directory
              </option>
              <option className="bg-white" value="Nearby Blood Availablity">
                Nearby Donor
              </option>
            </select>
            <select
              title="Click it"
              className="lg:w-44 text-center md:w-40 font-semibold p-2.5 border-none text-black appearance-none rounded-3xl outline-none bg-red-500 transition-all duration-500 focus:ring-0 focus:border-none shadow-none cursor-pointer md:hover:w-48"
            >
              <option className="bg-white" selected hidden disabled>
                Blood Bank Login
              </option>
              <option className="bg-white" value="Add Your Blood Bank">
                Add Your Blood Bank
              </option>
              <option className="bg-white" value="Login Blood Bank">
                Login Blood Bank
              </option>
            </select>
            <select
              title="Click it"
              className="lg:w-44 md:w-36 text-center font-semibold p-2.5 border-none text-black appearance-none rounded-3xl outline-none bg-red-500 transition-all duration-500 focus:ring-0 focus:border-none shadow-none cursor-pointer md:hover:w-48"
            >
              <option className="bg-white" selected hidden disabled>
                Donor Login
              </option>
              <option className="bg-white" value="Donor Register">
                Donor Register
              </option>
              <option className="bg-white" value="Donor Login">
                Donor Login
              </option>
            </select>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <div className="flex flex-col items-start gap-4">
              <h1 className="font-semibold self-center">Home</h1>
              <select
                title="Click it"
                className="w-full text-center p-2.5 font-semibold text-black border-none bg-white rounded-3xl shadow-sm outline-none hover:bg-red-500 transition-all duration-500 appearance-none cursor-pointer"
              >
                <option className="bg-white" selected hidden disabled>
                  Looking for blood
                </option>
                <option className="bg-white" value="Blood Availability">
                  Blood Bank Directory
                </option>
                <option className="bg-white" value="Nearby Blood Availablity">
                  Nearby Blood Availablity
                </option>
              </select>
              <select
                title="Click it"
                className="w-full text-center font-semibold p-2.5 border-none text-black appearance-none bg-white rounded-3xl outline-none hover:bg-red-500 transition-all duration-1000 focus:ring-0 focus:border-none shadow-none cursor-pointer"
              >
                <option className="bg-white" selected hidden disabled>
                  Blood Bank Login
                </option>
                <option className="bg-white" value="Add Your Blood Bank">
                  Add Your Blood Bank
                </option>
                <option className="bg-white" value="Login Blood Bank">
                  Login Blood Bank
                </option>
              </select>
              <select
                title="Click it"
                className="w-full text-center font-semibold p-2.5 border-none text-black appearance-none bg-white rounded-3xl outline-none hover:bg-red-500 transition-all duration-1000 focus:ring-0 focus:border-none shadow-none cursor-pointer"
              >
                <option className="bg-white" selected hidden disabled>
                  Donor Login
                </option>
                <option className="bg-white" value="Donor Register">
                  Donor Register
                </option>
                <option className="bg-white" value="Donor Login">
                  Donor Login
                </option>
                <option className="bg-white" value="Blood Donation Camp">
                  Blood Donation Camp
                </option>
              </select>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
