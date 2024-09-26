import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { IoIosCall } from "react-icons/io";
import { MdDelete } from "react-icons/md";
function AllCamp() {
  const { Role } = useSelector((state) => state.Auth);
  const [AllCamps, setAllCamps] = useState([]);
  const [expandedCamp, setExpandedCamp] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [campToDelete, setCampToDelete] = useState(null);
  const toggleCamp = (campId) => {
    setExpandedCamp(expandedCamp === campId ? null : campId);
  };
  const handleDeleteClick = (campId) => {
    setCampToDelete(campId);
    setShowDeleteDialog(true);
  };
  const handledeletecamp = async () => {
    try {
      const res = await axios.delete("http://localhost:4000/camp/deleteCamp", {
        data: {
          campId: campToDelete,
        },
        withCredentials: true,
      });
      if (res.data.success === true) {
        setAllCamps((prevCamps) =>
          prevCamps.filter((camp) => camp._id !== campToDelete)
        );
        setShowDeleteDialog(false);
        setCampToDelete(null);
        toast.success("Camp Deleted Successfully");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  const handleStatusChange = (campid, donorid) => async (e) => {
    try {
      const newStatus = e.target.value;
      const res = await axios.put(
        "http://localhost:4000/camp/updateDonorStatus",
        {
          campid: campid,
          donorid: donorid,
          status: newStatus,
        },
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      setAllCamps((prevCamps) =>
        prevCamps.map((camp) =>
          camp._id === campid
            ? {
                ...camp,
                donorsRegistered: camp.donorsRegistered.map((donor) =>
                  donor.donorId === donorid
                    ? { ...donor, status: newStatus }
                    : donor
                ),
              }
            : camp
        )
      );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const getAllCamps = async () => {
    try {
      const res = await axios.get("http://localhost:4000/camp/allCamp", {
        withCredentials: true,
      });
      if (res.data.success === true) {
        setAllCamps(res.data.data);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    if (Role === "bloodbank") {
      getAllCamps();
    } else {
      toast.error("You are not authorized to view this page");
    }
  }, [Role]);
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 text-center mb-10">
          Blood Donation Camps
        </h1>
        {AllCamps.length > 0 ? (
          AllCamps.map((camp) => (
            <div
              key={camp._id}
              className="bg-white rounded-lg shadow-md overflow-hidden mb-6"
            >
              <div className="px-6 py-4 cursor-pointer flex justify-between items-center bg-gradient-to-r from-red-500 to-pink-500 text-white">
                <div className="flex gap-3 justify-center items-center">
                  {" "}
                  <img src={camp.Image} alt="camp-image" className="w-16 h-16 rounded-full" />
                  <h2 className="text-xl font-semibold">{camp.campName}</h2>
                </div>
                <div className="flex justify-center gap-2 items-center">
                  <MdDelete
                    size={30}
                    className="hover:text-gray-300"
                    onClick={() => handleDeleteClick(camp._id)}
                  />
                  <span
                    className="text-2xl"
                    onClick={() => toggleCamp(camp._id)}
                  >
                    {expandedCamp === camp._id ? "−" : "+"}
                  </span>
                </div>
              </div>
              <div
                className={`px-6 py-4 ${
                  expandedCamp === camp._id ? "block" : "hidden"
                }`}
              >
                <p className="text-gray-700">
                  <strong>Date:</strong> {camp.date.split("T")[0]}
                </p>
                <p className="text-gray-700">
                  <strong>Location:</strong> {camp.address}
                </p>
                <p className="text-gray-700">
                  <strong>State:</strong> {camp.state}
                </p>
                <p className="text-gray-700">
                  <strong>District:</strong> {camp.district}
                </p>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold mt-4 mb-2 text-red-600">
                    Registered Members
                  </h3>
                  <h3 className="text-lg font-semibold mt-4 mb-2 text-red-600">
                    Total Registered:{camp.donorsRegistered.length}
                  </h3>
                </div>
                <div className="bg-gray-100 rounded-md p-4 w-auto">
                  {camp.donorsRegistered.length > 0 ? (
                    <ul className="space-y-2">
                      {camp.donorsRegistered.map((member) => (
                        <li
                          key={member.donorId}
                          className="flex justify-between items-center"
                        >
                          <span>{member.donorName}</span>
                          <span className="px-2 flex  py-1 bg-green-500 items-center lg:gap-2 text-white rounded-full text-sm text-center">
                            <IoIosCall />
                            {member.contact}
                          </span>
                          {member.status === "Rejected" ||
                          member.status === "Completed" ? (
                            <span
                              className={`px-2 flex  py-1 ${
                                member.status === "Completed"
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              } items-center gap-2 text-white rounded-full text-sm text-center`}
                            >
                              {member.status}
                            </span>
                          ) : (
                            <select
                              value={member.status}
                              className="px-2 py-1 border-none focus:border-none appearance-none rounded-full text-sm text-center"
                              title="click"
                              onChange={handleStatusChange(
                                camp._id,
                                member.donorId
                              )}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Accepted">Accepted</option>
                              <option value="Rejected">Rejected</option>
                              <option value="Completed">Completed</option>
                            </select>
                          )}
                          <span className="px-2 py-1 bg-red-500 text-white rounded-full text-sm">
                            {member.bloodType}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">
                      No members registered yet.
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-red-500 text-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-4">No Camp Found</h1>
            <p className="text-lg">You have not created any Camp yet</p>
          </div>
        )}
      </div>
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Delete Camp</h3>
            <p className="mb-6">Are you sure you want to delete Camp</p>
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setShowDeleteDialog(false)}
                className="w-full sm:w-auto px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
              >
                No
              </button>
              <button
                onClick={handledeletecamp}
                className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Yes, Delete Camp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllCamp;
