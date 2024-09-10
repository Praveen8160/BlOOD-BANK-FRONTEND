import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { MdMarkEmailRead } from "react-icons/md";
import RequestModel from "../components/RequestModel_B2D";
import { useSelector } from "react-redux";
function NearbyDonor() {
  const { isAuth, Role } = useSelector((state) => state.Auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState("");
  const [bloodgroup, setbloodgroup] = useState("");
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [donor, setDonor] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      bloodGroup: "",
      state: "",
      district: "",
    },
  });
  const selectedState = watch("state"); 
  const selectedDistrict = watch("district"); 
  const open = (id, bloodgroup) => {
    if (!isAuth && !Role) {
      toast.error("You need to login to request blood");
    } else {
      setIsModalOpen(true);
      setId(id);
      setbloodgroup(bloodgroup);
    }
  };
  const close = () => {
    setIsModalOpen(false);
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

  const SearchDonor = async (data) => {
    // console.log("data", data);
    try {
      const res = await axios.post(
        "http://localhost:4000/Search/getDonor",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response = res.data;
      // console.log(response.Donors);
      setDonor(response.Donors);
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
        <h1 className="text-2xl">Search Donor</h1>
      </div>
      <hr />
      {isModalOpen && (
        <RequestModel close={close} id={id} bloodgroup={bloodgroup} />
      )}
      <div className="mt-3">
        <form onSubmit={handleSubmit(SearchDonor)}>
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
              {...register("bloodGroup", {
                required: "Select your blood group",
              })}
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
            {errors.bloodGroup && (
              <p className="text-red-600 text-sm mt-1">
                {errors.bloodGroup.message}
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
              <th class="p-3 text-md border border-gray-400 rounded">Name</th>
              <th class="p-3 text-md border border-gray-400 rounded">Age</th>
              <th class="p-3 text-md border border-gray-400 rounded">Email</th>
              <th class="p-3 text-md border border-gray-400 rounded">State</th>
              <th class="p-3 text-md border border-gray-400 rounded">
                District
              </th>
              <th class="p-3 text-md border border-gray-400 rounded">
                Pincode
              </th>
              <th class="p-3 text-md border border-gray-400 rounded">
                Blood Group
              </th>
              <th class="p-3 text-md border border-gray-400 rounded">
                Request
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {donor.length > 0 ? (
              donor.map((dnr) => {
                return (
                  <tr className="items-center">
                    <td class="p-3 text-md border border-gray-400 rounded">
                      {dnr.fullname}
                    </td>
                    <td class="p-3 text-md border border-gray-400 rounded">
                      {dnr.age}
                    </td>
                    <td class="p-3 text-md border border-gray-400 rounded">
                      {dnr.email}
                    </td>
                    <td class="p-3 text-md border border-gray-400 rounded">
                      {dnr.state}
                    </td>
                    <td class="p-3 text-md border border-gray-400 rounded">
                      {dnr.district}
                    </td>
                    <td class="p-3 text-md border border-gray-400 rounded">
                      {dnr.pincode}
                    </td>
                    <td class="p-3 text-md border border-gray-400 rounded">
                      {dnr.bloodGroup}
                    </td>
                    <td class="p-3 text-md border border-gray-400 rounded">
                      <MdMarkEmailRead
                        onClick={() => open(dnr._id, dnr.bloodGroup)}
                        size={25}
                        className="ml-3 md:ml-5 lg:ml-10 hover:text-red-500 cursor-pointer"
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <center className="text-center bg-red-50 text-red-500 text-lg">
                No Donor Found
              </center>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NearbyDonor;
