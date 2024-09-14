import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { format, isPast } from "date-fns";
import { IoTime } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { BsCalendar2DateFill } from "react-icons/bs";
function DonorRegcamp() {
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [campToCancel, setCampToCancel] = useState(null);
  const [registeredCamps, setRegisteredCamps] = useState([]);
  const getDonorCamp = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/camp/donorCampRegistered",
        {
          withCredentials: true,
        }
      );
      if (res.data.success === true) {
        setRegisteredCamps(res.data.data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  useEffect(() => {
    getDonorCamp();
  }, []);

  const getStatusBadge = (status, date) => {
    const status2 = status.map((stat) => stat.status).join();
    if (isPast(date) === true && status2 !== "Completed") {
      return (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
          Missed
        </span>
      );
    } else if (isPast(date) === true && status2 === "Completed") {
      return (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
          Completed
        </span>
      );
    } else if (isPast(date) !== true && status2 !== "Completed") {
      return (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
          Upcoming
        </span>
      );
    }
  };

  const handleCancelClick = (camp) => {
    setCampToCancel(camp);
    setShowCancelDialog(true);
  };

  const handleCancelConfirm = async () => {
    console.log(`Cancelled registration for camp: ${campToCancel.campName}`);
    try {
      const res = await axios.delete(
        "http://localhost:4000/camp/cancelRegistration",
        {
          data: {
            campId: campToCancel._id,
          },
          withCredentials: true,
        }
      );
      if (res.data.success === true) {
        console.log(res.data.message);
        setRegisteredCamps((prev) => {
          return prev.filter((camp) => camp._id !== campToCancel._id);
        });
        setShowCancelDialog(false);
        setCampToCancel(null);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 sm:p-6 md:p-8 rounded-t-lg shadow-lg">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">
            My Registered Blood Donation Camps
          </h1>
          <p className="text-sm sm:text-base md:text-lg">
            View and manage your registered blood donation appointments
          </p>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-b-lg shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-7 lg:gap-16">
            {registeredCamps.map((camp) => (
              <div
                key={camp._id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-lg font-semibold">{camp.campName}</h2>
                    {getStatusBadge(camp.donorsRegistered, camp.date)}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{camp.campName}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <BsCalendar2DateFill className="mr-3" />
                      <span>{format(camp.date, "MMMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center">
                      <IoTime className="mr-3" />
                      <span>
                        {camp.startTime} - {camp.endTime}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FaLocationDot className="mr-3" />
                      <span className="truncate">{camp.address}</span>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                  {camp.donorsRegistered.map((stat) => stat.status).join() !==
                    "Completed" &&
                    isPast(camp.date) !== true && (
                      <div className="flex flex-col sm:flex-row justify-around space-y-2 sm:space-y-0 sm:space-x-2">
                        <button
                          onClick={() => handleCancelClick(camp)}
                          className="w-full sm:w-auto px-3 py-1.5 bg-red-500 text-white text-sm rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                        >
                          Cancel Registration
                        </button>
                        <button className="w-full sm:w-auto px-3 py-1.5 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                          View Details
                        </button>
                      </div>
                    )}
                  {camp.donorsRegistered.map((stat) => stat.status).join("") ===
                    "Completed" &&
                    isPast(camp.date) === true && (
                      <button className="w-full px-3 py-1.5 bg-green-500 text-white text-sm rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                        View Certificate
                      </button>
                    )}
                </div>
              </div>
            ))}
          </div>

          {registeredCamps.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">
                No registered camps found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>

      {showCancelDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Cancel Registration</h3>
            <p className="mb-6">
              Are you sure you want to cancel your registration for{" "}
              {campToCancel.campName}?
            </p>
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setShowCancelDialog(false)}
                className="w-full sm:w-auto px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
              >
                No, Keep Registration
              </button>
              <button
                onClick={handleCancelConfirm}
                className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Yes, Cancel Registration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DonorRegcamp;
