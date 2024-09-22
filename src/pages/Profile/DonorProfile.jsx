import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
function DonorProfile() {
  const [Donor, setDonor] = useState(null);
  const [update, setUpdate] = useState(false);
  const getDonorData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/Donor/getDonor", {
        withCredentials: true,
      });
      //   console.log(res.data);
      if (res.data.success === true) {
        setDonor(res.data.data);
        console.log(res.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error fetching donor data");
    }
  };
  useEffect(() => {
    getDonorData();
  }, []);

  return (
    <div className="flex flex-col md:mt-12 h-auto md:w-auto">
      <form className="h-auto grid grid-cols-1 md:grid-cols-2 rounded-3xl gap-4 mt-5 px-4">
        <div className="mb-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name:<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            disabled={!update}
            value={Donor?.fullname}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="Age"
            className="block text-sm font-medium text-gray-700"
          >
            Age:<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="Age"
            name="Age"
            value={Donor?.age}
            disabled={!update}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="Mobile"
            className="block text-sm font-medium text-gray-700"
          >
            Mobile:<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="Mobile"
            name="Mobile"
            value={Donor?.mobile}
            disabled={!update}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            style={{
              appearance: "none",
              MozAppearance: "textfield",
              WebkitAppearance: "none",
            }}
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email:<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={Donor?.email}
            disabled={!update}
            name="email"
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        {/* <div className="mb-2 hidden">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password:<span className="text-red-500">*</span>
                </label>
                <input
                  type="Password"
                  id="Password"
                  name="Password"
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div> */}
        <div className="mb-2">
          <label
            htmlFor="Blood Group"
            className="block text-sm font-medium text-gray-700"
          >
            Blood Group:<span className="text-red-500">*</span>
          </label>
          <select
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            value={Donor?.bloodGroup}
            disabled={!update}
          >
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
        <div className="mb-2">
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700"
          >
            State:<span className="text-red-500">*</span>
          </label>
          <select
            id="state"
            //   value={selectedState || ""}
            onChange={(e) => setSelectedState(e.target.value)}
            disabled={!update}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          >
            {/* {states.map((state) => (
                <>
                  {state.state_name == selectedState ? (
                    <option
                      key={state.state_id}
                      value={state.state_id}
                      selected
                    >
                      {state.state_name}
                    </option>
                  ) : (
                    <option key={state.state_id} value={state.state_id}>
                      {state.state_name}
                    </option>
                  )}
                </>
              ))} */}
          </select>
        </div>
        <div className="mb-2">
          <label
            htmlFor="district"
            className="block text-sm font-medium text-gray-700"
          >
            District:<span className="text-red-500">*</span>
          </label>
          <select
            id="district"
            //   disabled={!selectedState}
            disabled={!update}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          >
            {/* <option value="" disabled>
                    Select a district
                  </option> */}
            {/* {districts.map((district) => (
                <option key={district.district_id} value={district.district_id}>
                  {district.district_name}
                </option>
              ))} */}
          </select>
        </div>
        <div className="mb-2">
          <label
            htmlFor="Address"
            className="block text-sm font-medium text-gray-700"
          >
            Address:<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="Address"
            name="Address"
            value={Donor?.address}
            disabled={!update}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="Pincode"
            className="block text-sm font-medium text-gray-700"
          >
            Pincode:<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="Pincode"
            name="Pincode"
            value={Donor?.pincode}
            disabled={!update}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
      </form>
      <div className="flex gap-4 mt-5 ml-5">
        <button
          type="submit"
          className="px-7 py-3 mb-4 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => setUpdate(true)}
        >
          {update ? " Save" : "Update"}
        </button>
        {update && (
          <button
            type="button"
            className="px-7 py-3 mb-4 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => setUpdate(false)}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

export default DonorProfile;
