import React, { useEffect, useState } from "react";
import axios from "axios";
function NearbyDonor() {
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
    <div className="mx-7 md:mx-40 lg:mx-64 sticky">
      <div className="my-7">
        <h1 className="text-2xl">Search Donor</h1>
      </div>
      <hr />
      <div className="mt-3">
        <div className="mb-2 sticky">
          <label
            htmlFor="state"
            className="block text-base font-medium text-gray-700"
          >
            State:<span className="text-red-500">*</span>
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
            className="block text-base font-medium text-gray-700"
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
            htmlFor="bloodgroup"
            className="block text-base font-medium text-gray-700"
          >
            Blood Group:<span className="text-red-500">*</span>
          </label>
          <select
            id="bloodgroup"
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          >
            <option value="" disabled selected>
              Select a Blood Group
            </option>
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
        <button
          type="submit"
          className="px-7 py-2 mt-4 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Search
        </button>
      </div>
      <div className="mt-7">
        <table class="lg:w-full w-96 text-center">
          <thead className="bg-red-500">
            <tr>
              <th class="p-3 text-md border border-gray-400 rounded">Name</th>
              <th class="p-3 text-md border border-gray-400 rounded">Age</th>
              <th class="p-3 text-md border border-gray-400 rounded">Email</th>
              <th class="p-3 text-md border border-gray-400 rounded">State</th>
              <th class="p-3 text-md border border-gray-400 rounded">
                District
              </th>
              <th class="p-3 text-md border border-gray-400 rounded">
                Blood Group
              </th>
              <th class="p-3 text-md border border-gray-400 rounded">
                Request
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="p-3 text-md border border-gray-400 rounded">
                Andhra Pradesh
              </td>
              <td class="p-3 text-md border border-gray-400 rounded">
                Anantapur
              </td>
              <td class="p-3 text-md border border-gray-400 rounded">
                123, XYZ Street
              </td>
              <td class="p-3 text-md border border-gray-400 rounded">
                9876543210
              </td>
              <td class="p-3 text-md border border-gray-400 rounded">
                www.aarogyabloodbank.com
              </td>
              <td class="p-3 text-md border border-gray-400 rounded">
                john.doe@example.com
              </td>
              <td class="p-3 text-md border border-gray-400 rounded">
                john.doe@example.com
              </td>
            </tr>
          
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NearbyDonor;
