import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FaBook } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { MdMarkEmailRead } from "react-icons/md";
import RequestModelB2B from "../components/RequestModel_B2B";
import { useSelector } from "react-redux";
import MapView from "../components/MapView";
function BloodDirectory() {
  const { isAuth, Role } = useSelector((state) => state.Auth);
  const [states, setStates] = useState([]);
  const [id, setId] = useState("");
  const [districts, setDistricts] = useState([]);
  const [bloodbank, setbloodbank] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Loader, setLoader] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const open = (id) => {
    if (isAuth === true && Role === "bloodbank") {
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
  const selectedState = watch("state");
  useEffect(() => {
    const fetchStates = async () => {
      setLoader(true);
      try {
        const response = await axios.get(
          "https://cdn-api.co-vin.in/api/v2/admin/location/states"
        );
        setStates(response.data.states);
      } catch (error) {
        // console.error("Error fetching states", error);
        toast.error("Connection Error. Please Connect Network");
      } finally {
        setLoader(false);
      }
    };
    fetchStates();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      setLoader(true);
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
            setValue("district", "");
          }
        } catch (error) {
          toast.error("Connection Error. Please Connect Network");
        }
      } else {
        setDistricts([]);
        setValue("district", "");
      }
      setLoader(false);
    };
    fetchDistricts();
  }, [selectedState, setValue, states]);
  const getUserLocation = () => {
    setLoader(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.post(
              "http://localhost:4000/Search/getNearestBloodBank",
              { latitude, longitude },
              {
                headers: { "Content-Type": "application/json" },
              }
            );
            // console.log(response.data.bloobank);
            setbloodbank(response.data.bloobank);
            if(response.data.bloobank.length === 0){
              toast.error("No Blood Bank Found Nearby");
            }
          } catch (error) {
            // console.log(error);
            toast.error("Failed to fetch nearby donors. Please try again.");
          }
          finally {
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
  const searchBloodbank = async (data) => {
    try {
      setLoader(true);
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
      setbloodbank(response.bloobank);
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
  const currentItems = bloodbank.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(bloodbank.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mx-7 md:mx-40 lg:mx-64 sticky">
      <div className="my-7">
        <h1 className="text-2xl">
          Nearest Blood Bank(BB)/ Blood Storage Unit(BSU)
        </h1>
      </div>
      <hr />
      {isModalOpen && <RequestModelB2B close={close} id={id} />}
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
            type="button"
            onClick={getUserLocation}
            className={`${Loader ? "opacity-50 cursor-not-allowed" : ""} px-7 py-2 mt-4 mr-3 bg-red-500 text-white rounded hover:bg-red-600`}
          >
            Use My Location
          </button>
          <button
            type="submit"
            className={`${Loader ? "opacity-50 cursor-not-allowed" : ""} px-7 py-2 mt-4 mr-3 bg-red-500 text-white rounded hover:bg-red-600`}
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
                Blood Bank
              </th>
              <th className="p-3 text-md border border-gray-400 rounded">
                Parent Hospital
              </th>
              <th className="p-3 text-md border border-gray-400 rounded">
                Category
              </th>
              <th className="p-3 text-md border border-gray-400 rounded">
                State
              </th>
              <th className="p-3 text-md border border-gray-400 rounded">
                District
              </th>
              <th className="p-3 text-md border border-gray-400 rounded">
                Address
              </th>
              <th className="p-3 text-md border border-gray-400 rounded">
                Contact
              </th>
              <th className="p-3 text-md border border-gray-400 rounded">
                Pincode
              </th>
              <th className="p-3 text-md border border-gray-400 rounded">
                Availble Blood
              </th>
              {isAuth === true && Role === "bloodbank" && (
                <th className="p-3 text-md border border-gray-400 rounded">
                  Request
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((bank) => {
                return (
                  <tr key={bank._id}>
                    <td className="p-3 text-md border border-gray-400 rounded">
                      {bank.bloodBankName}
                    </td>
                    <td className="p-3 text-md border border-gray-400 rounded">
                      {bank.parentHospital}
                    </td>
                    <td className="p-3 text-md border border-gray-400 rounded">
                      {bank.category}
                    </td>
                    <td className="p-3 text-md border border-gray-400 rounded">
                      {bank.state}
                    </td>
                    <td className="p-3 text-md border border-gray-400 rounded">
                      {bank.district}
                    </td>
                    <td className="p-3 text-md border border-gray-400 rounded">
                      {bank.address}
                    </td>
                    <td className="p-3 text-md border border-gray-400 rounded">
                      {bank.mobile}
                    </td>
                    <td className="p-3 text-md border border-gray-400 rounded">
                      {bank.pincode}
                    </td>
                    <td className="p-3 text-md border border-gray-400 rounded">
                      <Link
                        to={`/Availableblood/${bank._id}`}
                      >
                        <FaBook className="ml-3 md:ml-5 lg:ml-10 hover:text-red-500 cursor-pointer" />
                      </Link>
                    </td>
                    {isAuth === true && Role === "bloodbank" && (
                      <td className="p-3 text-md border border-gray-400 rounded">
                        <MdMarkEmailRead
                          onClick={() => open(bank._id)}
                          size={25}
                          className="ml-3 md:ml-5 lg:ml-10 hover:text-red-500 cursor-pointer"
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
      {bloodbank.length > 0 && <MapView data={bloodbank} />}
    </div>
  );
}

export default BloodDirectory;
