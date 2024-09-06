import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
function BloodDirectory() {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [bloodbank, setbloodbank] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      state: "",
      district: "",
    },
  });
  const selectedState = watch("state"); // Watch for changes in state selection
  const selectedDistrict = watch("district"); // Watch for changes in district selection

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get(
          "https://cdn-api.co-vin.in/api/v2/admin/location/states"
        );
        setStates(response.data.states);
      } catch (error) {
        console.error("Error fetching states", error);
        toast.error("Failed to fetch states. Please try again later.");
      }
    };
    fetchStates();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedState) {
        try {
          const selectedStateObj = states.find(
            (state) => state.state_name === selectedState
          );
          if (selectedStateObj) {
            const response = await axios.get(
              `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${selectedStateObj.state_id}`
            );
            setDistricts(response.data.districts);
            setValue("district", ""); // Reset district selection when state changes
          }
        } catch (error) {
          // console.error("Error fetching districts", error);
          toast.error("Failed to fetch districts. Please try again later.");
        }
      } else {
        setDistricts([]); // Clear districts if no state is selected
        setValue("district", "");
      }
    };
    fetchDistricts();
  }, [selectedState, setValue, states]);
  const searchBloodbank = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/Search/getBloodBank",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response = res.data;
      // console.log(response.bloobank);
      setbloodbank(response.bloobank);
    } catch (error) {
      // console.log("error",error.response)
      if (error.response && error.response.status === 500) {
        toast.error(error.response.data.message);
      }
    }
  };
  return (
    <div className="mx-7 md:mx-40 lg:mx-64 sticky">
      <div className="my-7">
        <h1 className="text-2xl">
          Nearest Blood Bank(BB)/ Blood Storage Unit(BSU)
        </h1>
      </div>
      <hr />
      <div className="mt-3">
        <form onSubmit={handleSubmit(searchBloodbank)}>
          <div className="mb-2 sticky">
            <label
              htmlFor="state"
              className="block text-base font-medium text-gray-700"
            >
              State:<span className="text-red-500">*</span>
            </label>
            <select
              id="state"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              {...register("state", { required: "Select your state" })}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.state_id} value={state.state_name}>
                  {state.state_name}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="text-red-600 text-sm mt-1">
                {errors.state.message}
              </p>
            )}
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
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              {...register("district", { required: "Select your district" })}
              disabled={!selectedState}
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option
                  key={district.district_id}
                  value={district.district_name}
                >
                  {district.district_name}
                </option>
              ))}
            </select>
            {errors.district && (
              <p className="text-red-600 text-sm mt-1">
                {errors.district.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="px-7 py-2 mt-4 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Search
          </button>
        </form>
      </div>
      <div className="mt-7 overflow-x-auto">
        <table className="min-w-full text-center border-collapse">
          <thead className="bg-red-500 text-white">
            <tr>
              <th class="p-3 text-md border border-gray-400 rounded">
                Blood Bank Name
              </th>
              <th class="p-3 text-md border border-gray-400 rounded">
                Parent Hospital
              </th>
              <th class="p-3 text-md border border-gray-400 rounded">
                Category
              </th>
              <th class="p-3 text-md border border-gray-400 rounded">State</th>
              <th class="p-3 text-md border border-gray-400 rounded">
                District
              </th>
              <th class="p-3 text-md border border-gray-400 rounded">
                Address
              </th>
              <th class="p-3 text-md border border-gray-400 rounded">
                Contact
              </th>
              <th class="p-3 text-md border border-gray-400 rounded">
                Pincode
              </th>
              <th class="p-3 text-md border border-gray-400 rounded">
                Availble Blood
              </th>
            </tr>
          </thead>
          <tbody>
            {bloodbank.length > 0
              ? bloodbank.map((bank) => {
                  return (
                    <tr>
                      <td class="p-3 text-md border border-gray-400 rounded">
                        {bank.bloodBankName}
                      </td>
                      <td class="p-3 text-md border border-gray-400 rounded">
                        {bank.parentHospital}
                      </td>
                      <td class="p-3 text-md border border-gray-400 rounded">
                        {bank.category}
                      </td>
                      <td class="p-3 text-md border border-gray-400 rounded">
                        {bank.state}
                      </td>
                      <td class="p-3 text-md border border-gray-400 rounded">
                        {bank.district}
                      </td>
                      <td class="p-3 text-md border border-gray-400 rounded">
                        {bank.address}
                      </td>
                      <td class="p-3 text-md border border-gray-400 rounded">
                        {bank.mobile}
                      </td>
                      <td class="p-3 text-md border border-gray-400 rounded">
                        {bank.pincode}
                      </td>
                    </tr>
                  );
                })
              :  <center className="text-center bg-red-50 text-red-500 text-lg">
                
              No Blood Bank Found
            </center>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BloodDirectory;
