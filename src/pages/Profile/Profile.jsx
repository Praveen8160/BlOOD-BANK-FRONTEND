import React from "react";
import { Link, Outlet } from "react-router-dom";
function Profile() {
  return (
    <div className="flex">
      {/* Side Panel */}
      <aside className="lg:w-1/4 bg-gray-200 p-4 rounded-r-[20rem] fixed top-28 bottom-0 h-full">
        <nav className="bg-white flex justify-center items-center mt-48">
          <ul>
            <li className="mb-4">
              <Link to="/profile/profileOverview">Profile Overview</Link>
            </li>
            <li className="mb-4">
              <Link to="/profile/blood-requests">Blood Requests</Link>
            </li>
            {/* Add more links as needed */}
          </ul>
        </nav>
      </aside>

      {/* Content Area */}
      <main className="ml-[25%] w-3/4 p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Profile;
