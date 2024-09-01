import React from "react";
import logo from "../assets/logo3.jpeg";
export default function Header() {
  return (
    <>
      <header className="h-28 shrink bg-slate-50 shadow-2xl rounded-b-lg sticky top-0">
        <div className="flex justify-evenly text-center">
          <img src={logo} alt="" className="h-28 w-32 shrink" />
          <div className="flex items-center mt-5 gap-5 shrink cursor-pointer lg:ml-80 md:ml-40">
            <h1 className="font-semibold shrink">Home</h1>
            <select
              title="Click it"
              className="flex-shrink-0 lg:w-44 md:w-40 text-center p-2.5 lg:focus:w-52 lg:hover:w-52 font-semibold text-black  border-none bg-white border rounded-3xl shadow-sm outline-none hover:bg-red-500 transition-all duration-500 appearance-none cursor-pointer"
            >
              <option className="" selected hidden disabled>
                Looking for blood
              </option>
              <option className="bg-white" value="Blood Availability">
                Blood Availability
              </option>
              <option className="bg-white" value="Nearby Blood Availablity">
                Nearby Blood Availablity
              </option>
            </select>
            <select
              title="Click it"
              className=" shrink text-center lg:w-44 md:w-40 font-semibold lg:hover:w-52 lg:focus:w-52 p-2.5 border-none text-black appearance-none bg-white rounded-3xl outline-none hover:bg-red-500 transition-all duration-1000 focus:ring-0 focus:border-none shadow-none cursor-pointer"
            >
              <option className="font-bold" selected hidden disabled>
                Blood Bank Login
              </option>
              <option value="Blood Availability" className="bg-white">
                Add Your Blood Bank
              </option>
              <option className="bg-white" value="Nearby Blood Availablity">
                Login Blood Bank
              </option>
            </select>
            <select
              title="Click it"
              className=" shrink text-center lg:w-44 md:w-36 font-semibold lg:hover:w-52 lg:focus:w-52 p-2.5 border-none text-black appearance-none bg-white rounded-3xl outline-none hover:bg-red-500 transition-all duration-1000 focus:ring-0 focus:border-none shadow-none cursor-pointer"
            >
              <option className="font-bold" selected hidden disabled>
                Donor Login
              </option>
              <option value="Blood Availability" className="bg-white">
                Donor Register
              </option>
              <option className="bg-white" value="Nearby Blood Availablity">
                Donor Login
              </option>
              <option className="bg-white" value="Nearby Blood Availablity">
                Blood Donation Camp
              </option>
            </select>
          </div>
        </div>
      </header>
    </>
  );
}
