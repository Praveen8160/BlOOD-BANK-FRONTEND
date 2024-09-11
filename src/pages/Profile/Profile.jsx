import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaClockRotateLeft } from "react-icons/fa6";
import { FaCalendarPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Profile() {
  const { Role } = useSelector((state) => state.Auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!Role) {
      navigate("/");
    }
  }, [Role, navigate]);
  return (
    <>
      {Role === null ? (
        <div className="w-full h-[40rem] flex flex-col justify-center items-center">
          <span class="loader"></span>
          <h1 className="text-xl font-semibold animate-ping">Loading</h1>
        </div>
      ) : (
        <div className="flex md:flex-row flex-col md:justify-normal md:items-start">
          {/* Side Panel */}
          <aside className="lg:w-2/5 md:bg-gray-200 p-4 mt-10 rounded-r-[10rem] h-auto">
            <nav className=" flex justify-center items-center mt-20">
              <ul className="flex flex-col justify-evenly">
                <li className="mb-10 px-10 py-4 text-xl text-center text-white hover:scale-105 transition-all duration-300 font-bold gap-1 inline-flex cursor-pointer bg-red-600 hover:bg-red-400 hover:text-black rounded-full">
                  <span className="self-center">
                    <CgProfile size={30} />
                  </span>
                  <Link to="/profile/profileOverview" className="">
                    Profile Overview
                  </Link>
                </li>
                <li className="mb-10 px-10 py-4 text-xl text-center text-white hover:scale-105 transition-all duration-300 font-bold gap-1 inline-flex cursor-pointer bg-red-600 hover:bg-red-400 hover:text-black rounded-full">
                  <span className="self-center">
                    <FaClockRotateLeft size={28} />
                  </span>
                  <Link to="/profile/request">Request</Link>
                </li>
                <li className="mb-10 px-10 py-4 text-xl text-center text-white hover:scale-105 transition-all duration-300 font-bold gap-1 inline-flex cursor-pointer bg-red-600 hover:bg-red-400 hover:text-black rounded-full">
                  <span className="self-center">
                    <FaCalendarPlus size={30} />
                  </span>
                  <Link to="/profile/donation_request">Donation Request</Link>
                </li>
                {Role === "bloodbank" && (
                  <>
                    <li className="mb-10 px-10 py-4 text-xl text-center text-white hover:scale-105 transition-all duration-300 font-bold gap-1 inline-flex cursor-pointer bg-red-600 hover:bg-red-400 hover:text-black rounded-full">
                      <span className="self-center">
                        <CgProfile size={30} />
                      </span>
                      <Link to="/profile/blood_inventory">Add Blood</Link>
                    </li>
                    <li className="mb-10 px-10 py-4 text-xl text-center text-white hover:scale-105 transition-all duration-300 font-bold gap-1 inline-flex cursor-pointer bg-red-600 hover:bg-red-400 hover:text-black rounded-full">
                      <span className="self-center">
                        <CgProfile size={30} />
                      </span>
                      <Link to="/profile/AddBlood_Camp">Add Blood Camp</Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </aside>

          {/* Content Area */}
          <main className="md:w-2/4 mt-14 md:ml-10 m-5 h-auto">
            <Outlet />
          </main>
        </div>
      )}
    </>
  );
}

export default Profile;
