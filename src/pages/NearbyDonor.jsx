import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { MdMarkEmailRead } from "react-icons/md";
import RequestModel from "../components/RequestModel_B2D";
import { useSelector } from "react-redux";
import MapView from "../components/MapView";
function NearbyDonor() {
  const { isAuth, Role } = useSelector((state) => state.Auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState("");
  const [bloodgroup, setbloodgroup] = useState("");
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [donor, setDonor] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [Loader, setLoader] = useState(false);
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
        setLoader(true);
        const response = await axios.get(
          "https://cdn-api.co-vin.in/api/v2/admin/location/states"
        );
        setStates(response.data.states);
      } catch (error) {
        console.error("Error fetching states", error);
        toast.error("Failed to fetch states. Please try again later.");
      } finally {
        setLoader(false);
      }
    };
    fetchStates();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedState) {
        try {
          setLoader(true);
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
          toast.error("Failed to fetch districts. Please try again later.");
        } finally {
          setLoader(false);
        }
      } else {
        setDistricts([]);
        setValue("district", "");
        setLoader(false);
      }
    };
    fetchDistricts();
  }, [selectedState, setValue, states]);

  const getUserLocation = () => {
    if (watch("bloodGroup") === "") {
      toast.error("Please select a blood group");
      return;
    }
    if (navigator.geolocation) {
      setLoader(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.post(
              "http://localhost:4000/Search/getNearestDonor",
              { latitude, longitude, bloodGroup: watch("bloodGroup") },
              {
                headers: { "Content-Type": "application/json" },
              }
            );
            console.log(response.data.Donors);
            setDonor(response.data.Donors);
          } catch (error) {
            console.log(error);
            toast.error("Failed to fetch nearby donors. Please try again.");
          } finally {
            setLoader(false);
          }
        },
        (error) => {
          toast.error(
            "Unable to retrieve your location. Please Allow Location Access."
          );
          setLoader(false);
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
      setLoader(false);
    }
  };
  const SearchDonor = async (data) => {
    try {
      setLoader(true);
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
      setDonor(response.Donors);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        toast.error(error.response.data.message);
      }
    } finally {
      setLoader(false);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = donor.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(donor.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mx-7 md:mx-40 lg:mx-64 sticky">
      <div className="my-7">
        <h1 className="text-2xl">Search Donor</h1>
      </div>
      <hr />
      {isModalOpen && (
        <RequestModel
          close={close}
          id={id}
          bloodgroup={bloodgroup}
          Role={Role}
        />
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
            type="button"
            onClick={getUserLocation}
            className={`${
              Loader ? "opacity-50 cursor-not-allowed" : ""
            } px-7 py-2 mt-4 mr-3 bg-red-500 text-white rounded hover:bg-red-600`}
          >
            Use My Location
          </button>
          <button
            type="submit"
            className={`${
              Loader ? "opacity-50 cursor-not-allowed" : ""
            } px-7 py-2 mt-4 mr-3 bg-red-500 text-white rounded hover:bg-red-600`}
          >
            Search
          </button>
        </form>
      </div>
      <div className="mt-7 overflow-x-auto">
        <table className="min-w-full text-center border-collapse">
          <thead className="bg-red-500 text-white">
            <tr>
              <th className="p-3 text-md border border-gray-400 rounded">
                Name
              </th>
              <th className="p-3 text-md border border-gray-400 rounded">
                Age
              </th>
              <th className="p-3 text-md border border-gray-400 rounded">
                Email
              </th>
              <th className="p-3 text-md border border-gray-400 rounded">
                State
              </th>
              <th className="p-3 text-md border border-gray-400 rounded">
                District
              </th>
              <th className="p-3 text-md border border-gray-400 rounded">
                Pincode
              </th>
              <th className="p-3 text-md border border-gray-400 rounded">
                Blood Group
              </th>
              <th className="p-3 text-md border border-gray-400 rounded">
                Request
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {currentItems.length > 0 ? (
              currentItems.map((dnr) => {
                return (
                  <tr className="items-center">
                    <td className="p-3 text-md border border-gray-400 rounded">
                      {dnr.fullname}
                    </td>
                    <td className="p-3 text-md border border-gray-400 rounded">
                      {dnr.age}
                    </td>
                    <td className="p-3 text-md border border-gray-400 rounded">
                      {dnr.email}
                    </td>
                    <td className="p-3 text-md border border-gray-400 rounded">
                      {dnr.state}
                    </td>
                    <td className="p-3 text-md border border-gray-400 rounded">
                      {dnr.district}
                    </td>
                    <td className="p-3 text-md border border-gray-400 rounded">
                      {dnr.pincode}
                    </td>
                    <td className="p-3 text-md border border-gray-400 rounded">
                      {dnr.bloodGroup}
                    </td>
                    <td className="p-3 text-md border border-gray-400 rounded">
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
              <tr>
                <td
                  colSpan="9"
                  className="p-5 text-center bg-red-50 text-red-500 text-lg"
                >
                  No Request Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 mx-1 bg-gray-200 hover:bg-gray-300 rounded"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-3 py-1 mx-1 ${
              currentPage === index + 1
                ? "bg-red-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            } rounded`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 mx-1 bg-gray-200 hover:bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
      {donor.length > 0 && <MapView data={donor} />}
    </div>
  );
}

export default NearbyDonor;
