import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
function BloodRequest() {
  const { isAuth, Role } = useSelector((state) => state.Auth);
  const [bloodbankRequest, setBloodbankRequest] = useState([]);
  const [donorRequest, setDonorRequest] = useState([]);
  const [bloodbankAllRequest, setBloodbankAllRequest] = useState([]);
  const [donorAllRequest, setDonorAllRequest] = useState([]);
  const getBloodbakAllRequest = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/bloodrequest/getBloodbakAllRequest",
        {
          withCredentials: true,
        }
      );
      // console.log(res.data.data);
      setBloodbankRequest(res.data.data);
      setBloodbankAllRequest(res.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const getDonorRequest = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/bloodrequest/getDonorRequest",
        {
          withCredentials: true,
        }
      );
      // console.log(res.data.data);
      setDonorRequest(res.data.data);
      setDonorAllRequest(res.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleChange = (id) => async (e) => {
    if (Role === "donor") {
      const res = await axios.put(
        "http://localhost:4000/bloodrequest/updateDonorRequestStatus",
        {
          id: id,
          status: e.target.value,
        },
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      getDonorRequest();
    } else if (Role === "bloodbank") {
      const res = await axios.put(
        "http://localhost:4000/bloodrequest/updateBloodbakRequestStatus",
        {
          id: id,
          status: e.target.value,
        },
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      getBloodbakAllRequest();
    }
  };
  const getStatusData = (e) => {
    if (e.target.value === "") {
      Role === "donor"
        ? setDonorRequest(donorAllRequest)
        : setBloodbankRequest(bloodbankAllRequest);
    } else if (e.target.value === "Pending") {
      Role === "donor"
        ? setDonorRequest(
            donorAllRequest.filter((request) => request.status === "Pending")
          )
        : setBloodbankRequest(
            bloodbankAllRequest.filter(
              (request) => request.status === "Pending"
            )
          );
    } else if (e.target.value === "Accepted") {
      Role === "donor"
        ? setDonorRequest(
            donorAllRequest.filter((request) => request.status === "Accepted")
          )
        : setBloodbankRequest(
            bloodbankAllRequest.filter(
              (request) => request.status === "Accepted"
            )
          );
    } else if (e.target.value === "Rejected") {
      Role === "donor"
        ? setDonorRequest(
            donorAllRequest.filter((request) => request.status === "Rejected")
          )
        : setBloodbankRequest(
            bloodbankAllRequest.filter(
              (request) => request.status === "Rejected"
            )
          );
    } else if (e.target.value === "Completed") {
      Role === "donor"
        ? setDonorRequest(
            donorAllRequest.filter((request) => request.status === "Completed")
          )
        : setBloodbankRequest(
            bloodbankAllRequest.filter(
              (request) => request.status === "Completed"
            )
          );
    } else {
      getBloodbakAllRequest();
      getDonorRequest();
    }
  };
  useEffect(() => {
    if (isAuth && Role === "bloodbank") {
      getBloodbakAllRequest();
    } else if (isAuth && Role === "donor") {
      getDonorRequest();
    }
  }, [isAuth, Role]);
  return (
    <div className="flex w-full flex-col">
      <div className=" bg-gradient-to-r from-red-500 to-pink-500 text-white p-8 rounded-t-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Incoming Blood Requests</h1>
      <p className="text-lg">Help save lives by responding to blood donation requests</p>
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
              <th class="p-3 font-bold">Name</th>
              <th class="p-3 font-bold">Reason</th>
              <th class="p-3 font-bold">
                Address
              </th>
              <th class="p-3 font-bold">
                Contact
              </th>
              <th class="p-3 font-bold">
                Blood Group
              </th>
              <th class="p-3 font-bold">
                Unit(ML)
              </th>
              <th class="p-3 font-bold">Date</th>
              <th class="p-3 font-bold">Status</th>
            </tr>
          </thead>
          <tbody>
            {Role === "donor" && donorRequest.length > 0
              ? donorRequest.map((request) => {
                  return (
                    <tr>
                      <td class="p-3 text-md ">
                        {request.requester.fullname}
                      </td>
                      <td class="p-3 text-md ">
                        {request.Reason}
                      </td>
                      <td class="p-3 text-md ">
                        {request.requester.address}
                      </td>

                      <td class="p-3 text-md ">
                        {request.requester.mobile}
                      </td>
                      <td class="p-3 text-md ">
                        {request.bloodgroup}
                      </td>
                      <td class="p-3 text-md ">
                        {request.quantity}
                      </td>
                      <td class="p-3 text-md ">
                        {request.createdAt.split("T")[0]}
                      </td>
                      <td class="p-3 text-md ">
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
                        {/* {request.status} */}
                      </td>
                    </tr>
                  );
                })
              : Role === "donor" && (
                  <tr>
                    <td
                      colSpan="10"
                      className="p-5 text-center bg-red-50 text-red-500 text-lg"
                    >
                      No Request Found
                    </td>
                  </tr>
                )}

            {Role === "bloodbank" && bloodbankRequest.length > 0
              ? bloodbankRequest.map((request) => {
                  return (
                    <tr>
                      <td class="p-3 text-md ">
                        {request.requester.bloodBankName}
                      </td>
                      <td class="p-3 text-md ">
                        {request.Reason}
                      </td>
                      <td class="p-3 text-md ">
                        {request.requester.address}
                      </td>
                      <td class="p-3 text-md ">
                        {request.requester.mobile}
                      </td>
                      <td class="p-3 text-md ">
                        {request.bloodgroup}
                      </td>
                      <td class="p-3 text-md ">
                        {request.quantity}
                      </td>
                      <td class="p-3 text-md ">
                        {request.createdAt.split("T")[0]}
                      </td>
                      <td class="p-3 text-md ">
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
                        {/* {request.status} */}
                      </td>
                    </tr>
                  );
                })
              : Role === "bloodbank" && (
                  <tr>
                    <td
                      colSpan="10"
                      className="p-5 text-center bg-red-50 text-red-500 text-lg"
                    >
                      No Request Found
                    </td>
                  </tr>
                )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BloodRequest;
