import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
function Request() {
  const { isAuth, Role } = useSelector((state) => state.Auth);
  const [AllBloodbankRequestforBlood, setAllBloodbankRequestforBlood] =
    useState([]);
  const getAllRequestforBlood = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/bloodrequest/getAllBloodbankRequestforBlood",
        {
          withCredentials: true,
        }
      );
      console.log(res.data.data);
      setAllBloodbankRequestforBlood(res.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    getAllRequestforBlood();
  }, [isAuth, Role]);
  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-items-center">
        <div>
          <span className="font-semibold text-lg mr-3">Status:</span>
          <select>
            <option value="" selected>
              All
            </option>
            <option value="">Pending</option>
            <option value="">Approved</option>
            <option value="">Denied</option>
          </select>
        </div>
      </div>
      <div className="mt-7 overflow-x-auto">
        <table className="min-w-full text-center border-collapse">
          <thead className="bg-red-500 text-white">
            <tr>
              <th class="p-3 text-md border border-gray-400 rounded">
                Donor Name
              </th>
              <th class="p-3 text-md border border-gray-400 rounded">Reason</th>
              <th class="p-3 text-md border border-gray-400 rounded">
                Blood Group
              </th>
              <th class="p-3 text-md border border-gray-400 rounded">
                address
              </th>
              <th class="p-3 text-md border border-gray-400 rounded">
                contact
              </th>
             
              <th class="p-3 text-md border border-gray-400 rounded">
                pincode
              </th>
              <th class="p-3 text-md border border-gray-400 rounded">
                Quantity(Unit)
              </th>
              <th class="p-3 text-md border border-gray-400 rounded">Status</th>
            </tr>
          </thead>
          <tbody>
            {AllBloodbankRequestforBlood.length > 0 ? (
              AllBloodbankRequestforBlood.map((request) => {
                return (
                  <tr>
                    <td class="p-3 text-md border border-gray-400 rounded">
                    {request.recipientId?.fullname||request.recipientId?.bloodBankName}
                    </td>
                    <td class="p-3 text-md border border-gray-400 rounded">
                      {request.Reason}
                    </td>
                    <td class="p-3 text-md border border-gray-400 rounded">
                      {request.bloodgroup}
                    </td>
                    <td class="p-3 text-md border border-gray-400 rounded">
                      {request.recipientId.address}
                    </td>
                    <td class="p-3 text-md border border-gray-400 rounded">
                      {request.recipientId.mobile}
                    </td>
                    <td class="p-3 text-md border border-gray-400 rounded">
                      {request.recipientId.pincode}
                    </td>
                    <td class="p-3 text-md border border-gray-400 rounded">
                    {request.quantity}
                  </td>
                    <td class="p-3 text-md border border-gray-400 rounded">
                      {request.status}
                    </td>
                  </tr>
                );
              })
            ) : (
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

export default Request;
