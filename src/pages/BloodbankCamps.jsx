import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { MdMarkEmailRead } from "react-icons/md";
import RegisterCampModel from "../components/RegisterCampModel";
function BloodcampCamps() {
  const { isAuth, Role } = useSelector((state) => state.Auth);
  const [states, setStates] = useState([]);
  const [id, setId] = useState("");
  const [BloodCamp, setBloodCamp] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const open = (id) => {
    if (isAuth === true && Role === "donor") {
      setIsModalOpen(true);
      setId(id);
    } else {
      toast.error("You need to login to request blood");
    }
  };
  const close = () => {
    setIsModalOpen(false);
  };
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
      // console.log("object")
      try {
        // console.log("object")
        const response = await axios.get(
          "https://cdn-api.co-vin.in/api/v2/admin/location/states"
        );
        setStates(response.data.states);
      } catch (error) {
        // console.error("Error fetching states", error);
        toast.error("Connect Internet. Please try again later.");
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
  const searchCamp = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/camp/searchCamp",
        data,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setBloodCamp(res.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
      // if (error.response && error.response.status === 500) {
      //   toast.error(error.response.data.message);
      // }
    }
  };
  return (
    <div className="mx-7 md:mx-40 lg:mx-64 sticky">
      <div className="my-7">
        <h1 className="text-2xl">Blood camp Camps(BBC)</h1>
      </div>
      <hr />
      {isModalOpen && <RegisterCampModel close={close} id={id} />}
      <div className="mt-3">
        <form onSubmit={handleSubmit(searchCamp)}>
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
                campName
              </th>
              <th class="p-3 text-md border border-gray-400 rounded">
                Address
              </th>
              <th class="p-3 text-md border border-gray-400 rounded">Start</th>
              <th class="p-3 text-md border border-gray-400 rounded">End</th>
              <th class="p-3 text-md border border-gray-400 rounded">
                Description
              </th>
              {isAuth === true && Role === "donor" && (
                <th class="p-3 text-md border border-gray-400 rounded">
                  Register
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {BloodCamp.length > 0 ? (
              BloodCamp.map((camp) => {
                return (
                  <tr key={camp._id}>
                    <td class="p-3 text-md border border-gray-400 rounded">
                      {camp.campName}
                    </td>
                    <td class="p-3 text-md border border-gray-400 rounded">
                      {camp.address}
                    </td>
                    <td class="p-3 text-md border border-gray-400 rounded">
                      {camp.startTime}
                    </td>
                    <td class="p-3 text-md border border-gray-400 rounded">
                      {camp.endTime}
                    </td>
                    <td class="p-3 text-md border border-gray-400 rounded">
                      {camp.description}
                    </td>
                    {isAuth === true && Role === "donor" && (
                      <td class="p-3 text-md flex justify-center items-center border border-gray-400 rounded">
                        <MdMarkEmailRead
                          onClick={() => open(camp._id)}
                          size={25}
                          className="hover:text-red-500 cursor-pointer"
                        />
                      </td>
                    )}
                  </tr>
                );
              })
            ) : (
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

export default BloodcampCamps;
