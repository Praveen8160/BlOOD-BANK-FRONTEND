import React, { useEffect, useState } from "react";
import axios from "axios";
function BloodBankRegister() {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [districts, setDistricts] = useState([]);
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
  return (
    <div className="flex flex-col justify-center md:mt-12 items-center">
      <form className="border min-h-[45rem] sticky w-auto flex flex-col items-center justify-center rounded-3xl bg-transparent mt-5 shadow-2xl">
        <fieldset className="md:mx-20 md:my-10 md:p-9 mx-5 p-5 border border-red-100 rounded-xl grid grid-cols-1 md:grid-cols-2 my-4 gap-4 sticky shadow-2xl">
          <legend className="text-2xl font-semibold text-red-600">
            Add Your Bloodbank
          </legend>

          <div className="mb-2 sticky">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Blood Bank Name:<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-2 sticky">
            <label
              htmlFor="Hospital"
              className="block text-sm font-medium text-gray-700"
            >
              Parent Hospital Name:<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="Hospital"
              name="Hospital"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-2 sticky">
            <label
              htmlFor="Hospital"
              className="block text-sm font-medium text-gray-700"
            >
              Website:
            </label>
            <input
              type="url"
              id="Website"
              name="Website"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-2 sticky">
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
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              style={{
                appearance: "none",
                MozAppearance: "textfield",
                WebkitAppearance: "none",
              }}
            />
          </div>

          <div className="mb-2 sticky">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-2 sticky">
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
          </div>
          <div className="mb-2 sticky">
            <label
              htmlFor="Blood Group"
              className="block text-sm font-medium text-gray-700"
            >
              Category:<span className="text-red-500">*</span>
            </label>
            <select
              name="Category"
              id="Category"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            >
              <option value="Private">Private</option>
              <option value="Govt.">Govt.</option>
              <option value="Red Cross">Red Cross</option>
            </select>
          </div>
          <div className="mb-2 sticky">
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700"
            >
              state:<span className="text-red-500">*</span>
            </label>
            <select
              id="state"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            >
              <option value="" disabled>
                Select a state
              </option>
              {states.map((state) => (
                <option key={state.state_id} value={state.state_id}>
                  {state.state_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2 sticky">
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
                <option key={district.district_id} value={district.district_id}>
                  {district.district_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2 sticky">
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
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-2 sticky">
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
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div>
            <h1></h1>
          </div>
        </fieldset>

        <button
          type="submit"
          className="px-7 py-2 mb-4 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default BloodBankRegister;
