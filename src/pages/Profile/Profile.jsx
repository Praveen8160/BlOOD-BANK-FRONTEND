import React from "react";
import { Link, Outlet } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaClockRotateLeft } from "react-icons/fa6";
import { FaCalendarPlus } from "react-icons/fa";
function Profile() {
  return (
    <div className="flex md:flex-row flex-col overflow-hidden">
      {/* Side Panel */}
      <aside className="lg:w-2/5 md:bg-gray-200 p-4 mt-10 rounded-r-[10rem] h-auto">
        <nav className=" flex justify-center items-center mt-20">
          <ul className="flex flex-col justify-evenly">
            <li className="mb-10 px-10 py-4 text-xl text-center font-bold gap-1 inline-flex cursor-pointer bg-red-600 rounded-full">
              <span className="self-center"><CgProfile size={30} /></span>
              <Link to="/profile/profileOverview">Profile Overview</Link>
            </li>
            <li className="mb-10 px-10 py-4 text-xl text-center font-bold gap-1 inline-flex cursor-pointer bg-red-600 rounded-full">
              <span className="self-center"><FaClockRotateLeft size={28} /></span>
              <Link to="/profile/profileOverview">Request</Link>
            </li>
            <li className="mb-10 px-10 py-4 text-xl text-center font-bold gap-1 inline-flex cursor-pointer bg-red-600 rounded-full">
              <span className="self-center"><FaCalendarPlus size={30} /></span>
              <Link to="/profile/profileOverview">Donation Request</Link>
            </li>
            <li className="mb-10 px-10 py-4 text-xl text-center font-bold gap-1 inline-flex cursor-pointer bg-red-600 rounded-full">
              <span className="self-center"><CgProfile size={30} /></span>
              <Link to="/profile/profileOverview">Profile Overview</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Content Area */}
      <main className="w-2/4 mt-10 ml-10 h-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default Profile;
