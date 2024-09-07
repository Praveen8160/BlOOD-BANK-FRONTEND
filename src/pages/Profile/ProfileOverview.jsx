import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function ProfileOverview() {
  const { Role } = useSelector((state) => state.Auth);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [districts, setDistricts] = useState([]);
  const navigate = useNavigate();
  const [Donor, setDonor] = useState([]);
  const [donorUpdateData, setdonorUpdateData] = useState({
    fullname: Donor?.fullname || "",
    age: Donor?.age || "",
    mobile: Donor?.mobile || "",
    email: Donor?.email || "",
    bloodGroup: Donor?.bloodGroup || "",
    state: Donor?.state || "",
    district: Donor?.district || "",
    address: Donor?.address || "",
    pincode: Donor?.pincode || "",
  });
  const [bloodBank, setbloodBank] = useState([]);

  const getDonorData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/Donor/getDonor", {
        withCredentials: true,
      });
      console.log(res.data);
      if (res.data.success === true) {
        setDonor(res.data.data);
        setSelectedState(res.data.data.state);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getBloodBankData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/bloodBank/getBloodBank",
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      if (res.data.success === true) {
        setbloodBank(res.data.data);
        setSelectedState(res.data.data.state);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get(
          "https://cdn-api.co-vin.in/api/v2/admin/location/states"
        );
        setStates(response.data.states);
      } catch (error) {
        console.error("Error fetching states", error);
      }
    };
    fetchStates();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedState) {
        try {
          const response = await axios.get(
            `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${selectedState}`
          );
          setDistricts(response.data.districts);
        } catch (error) {
          console.error("Error fetching districts", error);
        }
      }
    };
    fetchDistricts();
  }, [selectedState]);

  useEffect(() => {
    if (Role === null) {
      navigate("/");
    } else {
      if (Role === "donor") {
        // console.log("fatching");
        getDonorData();
        setdonorUpdateData(Donor);
      } else if (Role === "bloodbank") {
        getBloodBankData();
      }
    }
  }, [Role, navigate,Donor]);
  return (
    <div className="border-2 sticky border-red-200 rounded-lg">
      <div className="bg-red-200 text-center text-2xl font-semibold p-4">
        <h1>Personal Detail</h1>
      </div>
      {console.log(donorUpdateData)}
      <div className="flex flex-col md:mt-12 h-auto md:w-auto">
        <form className="h-auto grid grid-cols-1 md:grid-cols-2 rounded-3xl gap-4 mt-5 px-4">
          {Role === "donor" && (
            <>
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
                  value={donorUpdateData.fullname}
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
                  value={donorUpdateData.age}
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
                  value={donorUpdateData.mobile}
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
                  value={donorUpdateData.email}
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
                  value={donorUpdateData.bloodGroup}
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
                  value={selectedState||""}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                >
                  {states.map((state) => (
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
                  ))}
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
                  disabled={!selectedState}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                >
                  {/* <option value="" disabled>
                    Select a district
                  </option> */}
                  {districts.map((district) => (
                    <option
                      key={district.district_id}
                      value={district.district_id}
                    >
                      {district.district_name}
                    </option>
                  ))}
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
                  value={donorUpdateData.address}
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
                  value={donorUpdateData.pincode}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
            </>
          )}
          {Role === "bloodbank" && (
            <>
              {" "}
              <div className="mb-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Blood Bank Name::<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={bloodBank.bloodBankName}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div className="mb-2 sticky">
                <label
                  htmlFor="parentHospital"
                  className="block text-sm font-medium text-gray-700"
                >
                  Parent Hospital Name:<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="parentHospital"
                  name="Hospital"
                  value={bloodBank.parentHospital}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div className="mb-2 sticky">
                <label
                  htmlFor="website"
                  className="block text-sm font-medium text-gray-700"
                >
                  Website:
                </label>
                <input
                  type="url"
                  id="website"
                  value={bloodBank.website}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="Category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category:<span className="text-red-500">*</span>
                </label>
                <select
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  value={bloodBank.category}
                  // onChange={}
                >
                  <option value="">Select Category</option>
                  <option value="Private">Private</option>
                  <option value="Govt.">Govt.</option>
                  <option value="Red Cross">Red Cross</option>
                </select>
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
                  value={bloodBank.mobile}
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
                  value={bloodBank.email}
                  name="email"
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div className="mb-2 hidden">
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
                  value={bloodBank.password}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
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
                  // value={selectedState || ""}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                >
                  {/* <option value="" disabled>
                    Select a state
                  </option> */}
                  {states.map((state) => (
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
                  ))}
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
                  disabled={!selectedState}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                >
                  <option value="" disabled>
                    Select a district
                  </option>
                  {districts.map((district) => (
                    <option
                      key={district.district_id}
                      value={district.district_id}
                    >
                      {district.district_name}
                    </option>
                  ))}
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
                  value={bloodBank.address}
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
                  value={bloodBank.pincode}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
            </>
          )}
          <div className="flex gap-4">
            <button
              type="submit"
              className="px-7 py-0 mb-4 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Update
            </button>
            <button
              type="button"
              className="px-7 py-2 mb-4 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileOverview;
