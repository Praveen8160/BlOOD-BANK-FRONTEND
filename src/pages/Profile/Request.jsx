import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
function Request() {
  const { isAuth, Role } = useSelector((state) => state.Auth);
  const [AllBloodbankRequestforBlood, setAllBloodbankRequestforBlood] =
    useState([]);
  const [BloodRequest, setBloodRequest] = useState([]);
  const getAllRequestforBlood = async () => {
    if (isAuth && Role === "bloodbank") {
      try {
        const res = await axios.get(
          "http://localhost:4000/bloodrequest/getAllBloodbankRequestforBlood",
          {
            withCredentials: true,
          }
        );
        console.log(res.data.data);
        setAllBloodbankRequestforBlood(res.data.data);
        setBloodRequest(res.data.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else if (isAuth && Role === "donor") {
      try {
        const res = await axios.get(
          "http://localhost:4000/bloodrequest/getAllDonorRequestforBlood",
          {
            withCredentials: true,
          }
        );
        console.log(res.data.data);
        setAllBloodbankRequestforBlood(res.data.data);
        setBloodRequest(res.data.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };
  const getStatusData = (e) => {
    if (e.target.value === "") {
      setAllBloodbankRequestforBlood(BloodRequest);
    } else if (e.target.value === "Pending") {
      setAllBloodbankRequestforBlood(
        BloodRequest.filter((request) => request.status === "Pending")
      );
    } else if (e.target.value === "Accepted") {
      setAllBloodbankRequestforBlood(
        BloodRequest.filter((request) => request.status === "Accepted")
      );
    } else if (e.target.value === "Rejected") {
      setAllBloodbankRequestforBlood(
        BloodRequest.filter((request) => request.status === "Rejected")
      );
    } else if (e.target.value === "Completed") {
      setAllBloodbankRequestforBlood(
        BloodRequest.filter((request) => request.status === "Completed")
      );
    }
  };
  useEffect(() => {
    getAllRequestforBlood();
  }, [isAuth, Role]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className=" bg-red-500 text-white p-8 rounded-t-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Your Blood Requests</h1>
        <p className="text-lg">Track and manage your sent blood requests</p>
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
        <table className="min-w-full text-center border-none">
          <thead className="bg-red-500 text-white">
            <tr className="">
              <th class="p-3 text-md border rounded">
                Donor Name
              </th>
              <th class="p-3 text-md border rounded">Reason</th>
              <th class="p-3 text-md border  rounded">
                Blood Group
              </th>
              <th class="p-3 text-md border rounded">
                address
              </th>
              <th class="p-3 text-md border rounded">
                contact
              </th>

              <th class="p-3 text-md border rounded">
                pincode
              </th>
              <th class="p-3 text-md border rounded">
                Quantity(Unit)
              </th>
              <th class="p-3 text-md border rounded">Date</th>
              <th class="p-3 text-md border rounded">Status</th>
            </tr>
          </thead>
          <tbody>
            {AllBloodbankRequestforBlood.length > 0 ? (
              AllBloodbankRequestforBlood.map((request) => {
                return (
                  <tr className="hover:bg-gray-100">
                    <td class="p-3 text-md border rounded">
                      {request.recipientId?.fullname ||
                        request.recipientId?.bloodBankName}
                    </td>
                    <td class="p-3 text-md border rounded">
                      {request.Reason}
                    </td>
                    <td class="p-3 text-md border rounded">
                      {request.bloodgroup}
                    </td>
                    <td class="p-3 text-md border rounded">
                      {request.recipientId.address}
                    </td>
                    <td class="p-3 text-md border rounded">
                      {request.recipientId.mobile}
                    </td>
                    <td class="p-3 text-md border rounded">
                      {request.recipientId.pincode}
                    </td>
                    <td class="p-3 text-md border rounded">
                      {request.quantity}
                    </td>
                    <td class="p-3 text-md border rounded">
                      {request.createdAt.split("T")[0]}
                    </td>
                    <td class="p-3 text-md border rounded">
                      {request.status}
                    </td>
                  </tr>
                );
              })
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
        </table>
      </div>
    </div>
  );
}

export default Request;
