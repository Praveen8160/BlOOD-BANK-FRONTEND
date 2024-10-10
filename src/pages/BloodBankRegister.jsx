import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BASE_URL from "../config.js"
function BloodBankRegister() {
  const { isAuth } = useSelector((state) => state.Auth);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      bloodBankName: "",
      parentHospital: "",
      website: "",
      mobile: "",
      email: "",
      password: "",
      category: "",
      state: "",
      district: "",
      address: "",
      pincode: "",
      latitude: "",
      longitude: "",
    },
  });
  const selectedState = watch("state"); // Watch for changes in state selection
  const selectedDistrict = watch("district"); // Watch for changes in district selection

  useEffect(() => {
    const fetchStates = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://cdn-api.co-vin.in/api/v2/admin/location/states"
        );
        setStates(response.data.states);
      } catch (error) {
        console.error("Error fetching states", error);
        toast.error("connect Internet");
      }
      finally {
        setLoading(false);
      }
    };
    fetchStates();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedState) {
        setLoading(true);
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
          toast.error("connect Internet");
        }
        finally {
          setLoading(false);
        }
      } else {
        setDistricts([]); // Clear districts if no state is selected
        setValue("district", "");
      }
    };
    fetchDistricts();
  }, [selectedState, setValue, states]);
  const Register = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/bloodBank/register`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response = res.data;
      if (response.success === true) {
        toast.success("Registration successful Now Login to continue");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.response.data.message);
      }
    }
    finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);
  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setValue("latitude", position.coords.latitude);
          setValue("longitude", position.coords.longitude);
        },
        (error) => {
          console.error("Geolocation error: ", error);
          toast.error(
            "Unable to retrieve your location. Please fill in manually."
          );
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  };
  return (
    <div className="flex flex-col justify-center md:mt-12 items-center">
      <form
        className="border min-h-[45rem] sticky w-auto flex flex-col items-center justify-center rounded-3xl bg-transparent mt-5 shadow-2xl shadow-red-400"
        onSubmit={handleSubmit(Register)}
      >
        <fieldset className="md:mx-20 md:my-10 md:p-9 mx-5 p-5 border border-red-100 rounded-xl grid grid-cols-1 md:grid-cols-2 my-4 gap-4 sticky shadow-2xl drop-shadow-2xl shadow-red-300 ">
          <legend className="text-2xl font-semibold text-red-600">
            Add Your Bloodbank
          </legend>

          <div className="mb-2 sticky">
            <label
              htmlFor="bloodBankName"
              className="block text-sm font-medium text-gray-700"
            >
              Blood Bank Name:<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="bloodBankName"
              name="bloodBankName"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              {...register("bloodBankName", {
                required: "Blood Bank Name is required",
              })}
            />
            {errors.bloodBankName && (
              <p className="text-red-600 text-sm mt-1">
                {errors.bloodBankName.message}
              </p>
            )}
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
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              {...register("parentHospital")}
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
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              {...register("website")}
            />
          </div>
          <div className="mb-2 sticky">
            <label
              htmlFor="mobile"
              className="block text-sm font-medium text-gray-700"
            >
              Mobile:<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="mobile"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              {...register("mobile", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Enter a valid 10-digit mobile number",
                },
              })}
            />
            {errors.mobile && (
              <p className="text-red-600 text-sm mt-1">
                {errors.mobile.message}
              </p>
            )}
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
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
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
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mb-2 sticky">
            <label
              htmlFor="Category"
              className="block text-sm font-medium text-gray-700"
            >
              Category:<span className="text-red-500">*</span>
            </label>
            <select
              id="Category"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              {...register("category", {
                required: "Select your Bank category",
              })}
            >
              <option value="">Select Category</option>
              <option value="Private">Private</option>
              <option value="Govt.">Govt.</option>
              <option value="Red Cross">Red Cross</option>
            </select>
            {errors.category && (
              <p className="text-red-600 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
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
              {...register("state", { required: "Select your state" })}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
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
              className="block text-sm font-medium text-gray-700"
            >
              District:<span className="text-red-500">*</span>
            </label>
            <select
              id="district"
              {...register("district", { required: "Select your district" })}
              disabled={!selectedState}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
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
              htmlFor="Pincode"
              className="block text-sm font-medium text-gray-700"
            >
              Pincode:<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="Pincode"
              {...register("pincode", {
                required: "Pincode is required",
                pattern: {
                  value: /^[1-9][0-9]{5}$/,
                  message: "Enter a valid 6-digit pincode",
                },
              })}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            {errors.pincode && (
              <p className="text-red-600 text-sm mt-1">
                {errors.pincode.message}
              </p>
            )}
          </div>
          <div className="mb-2 sticky">
            <label
              htmlFor="Address"
              className="block text-sm font-medium text-gray-700"
            >
              Address:<span className="text-red-500">*</span>
            </label>
            <textarea
              id="address"
              rows={3}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              {...register("address", { required: "Address is required" })}
            />
            {errors.address && (
              <p className="text-red-600 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="latitude"
              className="text-sm font-medium text-gray-700"
            >
              Latitude
            </label>
            <input
              type="text"
              id="latitude"
              className="mt-1 p-2 border border-gray-300 rounded"
              {...register("latitude")}
              readOnly
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="longitude"
              className="text-sm font-medium text-gray-700"
            >
              Longitude
            </label>
            <input
              type="text"
              id="longitude"
              className="mt-1 p-2 border border-gray-300 rounded"
              {...register("longitude")}
              readOnly
            />
          </div>

          <button
            type="button"
            onClick={handleGeolocation}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Get Current Location
          </button>
        </fieldset>

        <button
          type="submit"
          className={`px-10 py-3 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300 my-3 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default BloodBankRegister;
