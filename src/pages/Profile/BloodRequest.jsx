import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
function BloodRequest() {
  const { isAuth, Role } = useSelector((state) => state.Auth);
  const [bloodbankRequest, setBloodbankRequest] = useState([]);
  const [donorRequest, setDonorRequest] = useState([]);
  // const[]=us
  const getBloodbakAllRequest = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/bloodrequest/getBloodbakAllRequest",
        {
          withCredentials: true,
        }
      );
      console.log(res.data.data);
      setBloodbankRequest(res.data.data);
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
      console.log(res.data.data);
      setDonorRequest(res.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleChange = (id) => async (e) => {
    // console.log(e.target.value);
    // console.log(id);
    try {
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
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const getStatusData = (e) => {
    if (e.target.value === "") {
      getBloodbakAllRequest();
    } else if (e.target.value === "Pending") {
      const data = bloodbankRequest.filter(
        (request) => request.status === "Pending"
      );
      setBloodbankRequest(data);
    } else if (e.target.value === "Accepted") {
      const data = bloodbankRequest.filter(
        (request) => request.status === "Accepted"
      );
      setBloodbankRequest(data);
    } else if (e.target.value === "Rejected") {
      const data = bloodbankRequest.filter(
        (request) => request.status === "Rejected"
      );
      setBloodbankRequest(data);
    } else if (e.target.value === "Completed") {
      const data = bloodbankRequest.filter(
        (request) => request.status === "Completed"
      );
      setBloodbankRequest(data);
    } else {
      getBloodbakAllRequest();
    }
  };
  useEffect(() => {
    if (isAuth && Role === "bloodbank") {
      getBloodbakAllRequest();
    } else if (isAuth && Role === "donor") {
      console.log("donor");
      getDonorRequest();
    }
  }, [isAuth, Role]);
  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-items-center">
        <div>
          <span className="font-semibold text-lg mr-3">Status:</span>
          <select onChange={getStatusData}>
            <option value="" selected>
              All
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
              <th class="p-3 text-md border border-gray-400 rounded">Name</th>
              <th class="p-3 text-md border border-gray-400 rounded">Reason</th>
              <th class="p-3 text-md border border-gray-400 rounded">
                Address
              </th>
              <th class="p-3 text-md border border-gray-400 rounded">
                Contact
              </th>
              <th class="p-3 text-md border border-gray-400 rounded">
                Blood Group
              </th>
              <th class="p-3 text-md border border-gray-400 rounded">
                Pincode
              </th>
              <th class="p-3 text-md border border-gray-400 rounded">
                Unit(ML)
              </th>
              <th class="p-3 text-md border border-gray-400 rounded">Status</th>
            </tr>
          </thead>
          <tbody>
            {Role === "donor" && donorRequest.length > 0
              ? donorRequest.map((request) => {
                  return (
                    <tr>
                      <td class="p-3 text-md border border-gray-400 rounded">
                        {request.requester.fullname}
                      </td>
                      <td class="p-3 text-md border border-gray-400 rounded">
                        {request.Reason}
                      </td>
                      <td class="p-3 text-md border border-gray-400 rounded">
                        {request.requester.address}
                      </td>

                      <td class="p-3 text-md border border-gray-400 rounded">
                        {request.requester.mobile}
                      </td>
                      <td class="p-3 text-md border border-gray-400 rounded">
                        {request.bloodgroup}
                      </td>

                      <td class="p-3 text-md border border-gray-400 rounded">
                        {request.requester.pincode}
                      </td>
                      <td class="p-3 text-md border border-gray-400 rounded">
                        {request.quantity}
                      </td>
                      <td class="p-3 text-md border border-gray-400 rounded">
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
                  <center className="text-center bg-red-50 text-red-500 text-lg">
                    No Request Found
                  </center>
                )}

            {Role === "bloodbank" && bloodbankRequest.length > 0
              ? bloodbankRequest.map((request) => {
                  return (
                    <tr>
                      <td class="p-3 text-md border border-gray-400 rounded">
                        {request.requester.bloodBankName}
                      </td>
                      <td class="p-3 text-md border border-gray-400 rounded">
                        {request.Reason}
                      </td>
                      <td class="p-3 text-md border border-gray-400 rounded">
                        {request.requester.address}
                      </td>
                      <td class="p-3 text-md border border-gray-400 rounded">
                        {request.requester.mobile}
                      </td>
                      <td class="p-3 text-md border border-gray-400 rounded">
                        {request.bloodgroup}
                      </td>
                      <td class="p-3 text-md border border-gray-400 rounded">
                        {request.quantity}
                      </td>
                      <td class="p-3 text-md border border-gray-400 rounded">
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
                  <center className="text-center bg-red-50 text-red-500 text-lg">
                    No Request Found
                  </center>
                )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BloodRequest;
