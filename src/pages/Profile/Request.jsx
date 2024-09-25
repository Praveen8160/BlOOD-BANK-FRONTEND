import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Request() {
  const { isAuth, Role } = useSelector((state) => state.Auth);
  const [AllBloodbankRequestforBlood, setAllBloodbankRequestforBlood] = useState([]);
  const [BloodRequest, setBloodRequest] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); 

  // Fetch Data based on user role
  const getAllRequestforBlood = async () => {
    if (isAuth && Role === "bloodbank") {
      try {
        const res = await axios.get(
          "http://localhost:4000/bloodrequest/getAllBloodbankRequestforBlood",
          { withCredentials: true }
        );
        setAllBloodbankRequestforBlood(res.data.data);
        setBloodRequest(res.data.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else if (isAuth && Role === "donor") {
      try {
        const res = await axios.get(
          "http://localhost:4000/bloodrequest/getAllDonorRequestforBlood",
          { withCredentials: true }
        );
        setAllBloodbankRequestforBlood(res.data.data);
        setBloodRequest(res.data.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  // Handle status filter
  const getStatusData = (e) => {
    if (e.target.value === "") {
      setAllBloodbankRequestforBlood(BloodRequest);
    } else {
      setAllBloodbankRequestforBlood(
        BloodRequest.filter((request) => request.status === e.target.value)
      );
    }
    setCurrentPage(1); // Reset to the first page after filtering
  };

  useEffect(() => {
    getAllRequestforBlood();
  }, [isAuth, Role]);

 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = AllBloodbankRequestforBlood.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(AllBloodbankRequestforBlood.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex w-full flex-col">
      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-8 rounded-t-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Your Blood Requests</h1>
        <p className="text-lg">Track and manage your sent blood requests</p>
      </div>
      <div className="flex justify-items-center my-3">
        <div>
          <span className="font-semibold text-lg mr-3 ml-3">Status:</span>
          <select onChange={getStatusData} className="p-3 focus:border-none border-none">
            <option value="" selected>All Request</option>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
      <div className="mt-7 overflow-x-auto">
        <table className="min-w-full text-center border-none">
          <thead className="bg-red-500 text-white">
            <tr>
              <th className="p-3 font-bold">Donor Name</th>
              <th className="p-3 font-bold">Reason</th>
              <th className="p-3 font-bold">Blood Group</th>
              <th className="p-3 font-bold">Contact</th>
              <th className="p-3 font-bold">Pincode</th>
              <th className="p-3 font-bold">Quantity(Unit)</th>
              <th className="p-3 font-bold">Date</th>
              <th className="p-3 font-bold">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((request) => (
                <tr key={request._id} className="hover:bg-gray-200">
                  <td className="p-3 text-md">
                    {request.recipientId?.fullname || request.recipientId?.bloodBankName}
                  </td>
                  <td className="p-3 text-md">{request.Reason}</td>
                  <td className="p-3 font-bold text-red-700">{request.bloodgroup}</td>
                  <td className="p-3 text-md">{request.recipientId.mobile}</td>
                  <td className="p-3 text-md">{request.recipientId.pincode}</td>
                  <td className="p-3 text-md">{request.quantity}</td>
                  <td className="p-3 text-md">{request.createdAt.split("T")[0]}</td>
                  <td className="p-3 text-md">{request.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-5 text-center bg-red-50 text-red-500 text-lg">
                  No Request Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 mx-1 bg-gray-200 hover:bg-gray-300 rounded"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-3 py-1 mx-1 ${currentPage === index + 1 ? "bg-red-500 text-white" : "bg-gray-200 hover:bg-gray-300"} rounded`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 mx-1 bg-gray-200 hover:bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Request;
