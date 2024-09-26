import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

function BloodRequest() {
  const { isAuth, Role } = useSelector((state) => state.Auth);
  const [bloodbankRequest, setBloodbankRequest] = useState([]);
  const [donorRequest, setDonorRequest] = useState([]);
  const [bloodbankAllRequest, setBloodbankAllRequest] = useState([]);
  const [donorAllRequest, setDonorAllRequest] = useState([]);
  const [Loading, setLoader] = useState(false);
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Fetch blood bank and donor requests
  const getBloodbakAllRequest = async () => {
    try {
      setLoader(true);
      const res = await axios.get(
        "http://localhost:4000/bloodrequest/getBloodbakAllRequest",
        { withCredentials: true }
      );
      setBloodbankRequest(res.data.data);
      setBloodbankAllRequest(res.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoader(false);
    }
  };

  const getDonorRequest = async () => {
    try {
      setLoader(true);
      const res = await axios.get(
        "http://localhost:4000/bloodrequest/getDonorRequest",
        { withCredentials: true }
      );
      setDonorRequest(res.data.data);
      setDonorAllRequest(res.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoader(false);
    }
  };

  const handleChange = (id) => async (e) => {
    if (Role === "donor") {
      setLoader(true);
      const res = await axios.put(
        "http://localhost:4000/bloodrequest/updateDonorRequestStatus",
        { id: id, status: e.target.value },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setLoader(false);
      getDonorRequest();
    } else if (Role === "bloodbank") {
      setLoader(true);
      const res = await axios.put(
        "http://localhost:4000/bloodrequest/updateBloodbakRequestStatus",
        { id: id, status: e.target.value },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setLoader(false);
      getBloodbakAllRequest();
    }
  };

  const getStatusData = (e) => {
    if (e.target.value === "") {
      Role === "donor"
        ? setDonorRequest(donorAllRequest)
        : setBloodbankRequest(bloodbankAllRequest);
    } else {
      const filteredRequests =
        Role === "donor"
          ? donorAllRequest.filter(
              (request) => request.status === e.target.value
            )
          : bloodbankAllRequest.filter(
              (request) => request.status === e.target.value
            );

      Role === "donor"
        ? setDonorRequest(filteredRequests)
        : setBloodbankRequest(filteredRequests);
    }
    setCurrentPage(1); // Reset to the first page after filtering
  };

  useEffect(() => {
    if (isAuth && Role === "bloodbank") {
      getBloodbakAllRequest();
    } else if (isAuth && Role === "donor") {
      getDonorRequest();
    }
  }, [isAuth, Role]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRequests =
    Role === "donor"
      ? donorRequest.slice(indexOfFirstItem, indexOfLastItem)
      : bloodbankRequest.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(
    (Role === "donor" ? donorRequest.length : bloodbankRequest.length) /
      itemsPerPage
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex w-full flex-col">
      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-8 rounded-t-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Incoming Blood Requests</h1>
        <p className="text-lg">
          Help save lives by responding to blood donation requests
        </p>
      </div>
      <div className="flex justify-items-center my-3">
        <div>
          <span className="font-semibold text-lg mr-3 ml-3">Status:</span>
          <select
            onChange={getStatusData}
            className="p-3 focus:border-none border-none"
          >
            <option value="" selected>
              All Request
            </option>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
      <div className="mt-7 overflow-x-auto">
        <table className="min-w-full text-center border-collapse">
          <thead className="bg-red-500 text-white">
            <tr>
              <th className="p-3 font-bold">Name</th>
              <th className="p-3 font-bold">Reason</th>
              <th className="p-3 font-bold">Address</th>
              <th className="p-3 font-bold">Contact</th>
              <th className="p-3 font-bold">Blood Group</th>
              <th className="p-3 font-bold">Unit(ML)</th>
              <th className="p-3 font-bold">Date</th>
              <th className="p-3 font-bold">Status</th>
            </tr>
          </thead>
          {Loading ? (
            <tr>
              <td
                colSpan="8"
                className="p-5 text-center bg-red-50 text-red-500 text-lg"
              >
                <Loader />
              </td>
            </tr>
          ) : (
            <tbody>
              {currentRequests.length > 0 ? (
                currentRequests.map((request) => (
                  <tr key={request._id}>
                    <td className="p-3 text-md">
                      {request.requester?.fullname ||
                        request.requester?.bloodBankName}
                    </td>
                    <td className="p-3 text-md">{request.Reason}</td>
                    <td className="p-3 text-md">{request.requester.address}</td>
                    <td className="p-3 text-md">{request.requester.mobile}</td>
                    <td className="p-3 text-md">{request.bloodgroup}</td>
                    <td className="p-3 text-md">{request.quantity}</td>
                    <td className="p-3 text-md">
                      {request.createdAt.split("T")[0]}
                    </td>
                    <td className="p-3 text-md">
                      {request.status === "Completed" ? (
                        request.status
                      ) : (
                        <select
                          value={request.status}
                          onChange={handleChange(request._id)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Rejected">Rejected</option>
                          <option value="Completed">Completed</option>
                        </select>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="p-5 text-center bg-red-50 text-red-500 text-lg"
                  >
                    No Request Found
                  </td>
                </tr>
              )}
            </tbody>
          )}
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 mx-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-3 py-1 mx-1 ${
              currentPage === index + 1
                ? "bg-red-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            } rounded`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 mx-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default BloodRequest;
