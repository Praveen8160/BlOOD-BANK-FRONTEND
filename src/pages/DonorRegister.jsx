import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../config.js";
function DonorRegister() {
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
      fullname: "",
      age: "",
      email: "",
      password: "",
      address: "",
      mobile: "",
      bloodGroup: "",
      state: "",
      district: "",
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
        const response = await axios.get(`${BASE_URL}/api/states`);
        setStates(response.data.states);
      } catch (error) {
        console.error("Error fetching states", error);
        toast.error("Failed to fetch states. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchStates();
  }, []);
  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);
  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedState) {
        setLoading(true);
        try {
          const selectedStateObj = states.find(
            (state) => state.state_name === selectedState
          );
          console.log(selectedStateObj);
          if (selectedStateObj) {
            const response = await axios.get(
              `${BASE_URL}/api/districts/${selectedStateObj.state_id}`
            );
            console.log(response.data.districts);
            setDistricts(response.data.districts);
            setValue("district", ""); // Reset district selection when state changes
          }
        } catch (error) {
          toast.error("Failed to fetch districts. Please try again later.");
        } finally {
          setLoading(false);
        }
      } else {
        setDistricts([]);
        setValue("district", "");
      }
    };
    fetchDistricts();
  }, [selectedState, setValue, states]);

  const Register = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/Donor/register`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = res.data;
      if (response.success === true) {
        toast.success("Registration successful Now Login to continue");
      }
    } catch (error) {
      // console.log(error);
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };
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
          <legend className="text-3xl font-semibold text-red-600 mb-4 md:col-span-2">
            Donor Registration
          </legend>
          <div className="flex flex-col">
            <label
              htmlFor="fullname"
              className="text-sm font-medium text-gray-700"
            >
              Full Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullname"
              className="mt-1 p-2 border border-gray-300 rounded"
              {...register("fullname", { required: "Full Name is required" })}
            />
            {errors.fullname && (
              <p className="text-red-600 text-sm mt-1">
                {errors.fullname.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="age" className="text-sm font-medium text-gray-700">
              Age<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="age"
              className="mt-1 p-2 border border-gray-300 rounded"
              {...register("age", {
                required: "Age is required",
                min: {
                  value: 18,
                  message: "Minimum age is 18",
                },
                max: {
                  value: 65,
                  message: "Maximum age is 65",
                },
              })}
            />
            {errors.age && (
              <p className="text-red-600 text-sm mt-1">{errors.age.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="mobile"
              className="text-sm font-medium text-gray-700"
            >
              Mobile Number<span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="mobile"
              className="mt-1 p-2 border border-gray-300 rounded"
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
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 border border-gray-300 rounded"
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

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 border border-gray-300 rounded"
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

          <div className="flex flex-col">
            <label
              htmlFor="bloodGroup"
              className="text-sm font-medium text-gray-700"
            >
              Blood Group<span className="text-red-500">*</span>
            </label>
            <select
              id="bloodGroup"
              className="mt-1 p-2 border border-gray-300 rounded bg-white"
              {...register("bloodGroup", {
                required: "Select your blood group",
              })}
            >
              <option value="">Select Blood Group</option>
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

          <div className="flex flex-col">
            <label
              htmlFor="state"
              className="text-sm font-medium text-gray-700"
            >
              State<span className="text-red-500">*</span>
            </label>
            <select
              id="state"
              className="mt-1 p-2 border border-gray-300 rounded bg-white"
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

          <div className="flex flex-col">
            <label
              htmlFor="district"
              className="text-sm font-medium text-gray-700"
            >
              District<span className="text-red-500">*</span>
            </label>
            <select
              id="district"
              className="mt-1 p-2 border border-gray-300 rounded bg-white"
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

          <div className="flex flex-col">
            <label
              htmlFor="address"
              className="text-sm font-medium text-gray-700"
            >
              Address<span className="text-red-500">*</span>
            </label>
            <textarea
              id="address"
              rows={3}
              className="mt-1 p-2 border border-gray-300 rounded"
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
              htmlFor="pincode"
              className="text-sm font-medium text-gray-700"
            >
              Pincode<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="pincode"
              className="mt-1 p-2 border border-gray-300 rounded"
              {...register("pincode", {
                required: "Pincode is required",
                pattern: {
                  value: /^[1-9][0-9]{5}$/,
                  message: "Enter a valid 6-digit pincode",
                },
              })}
            />
            {errors.pincode && (
              <p className="text-red-600 text-sm mt-1">
                {errors.pincode.message}
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
          <div></div>
          <div >
            <h1>
              Already have an account?{" "}
              <Link
                to="/DonorLogin"
                className="underline font-bold hover:text-red-500"
              >
                Sign in
              </Link>
            </h1>
          </div>
        </fieldset>

        <button
          type="submit"
          className={`px-10 py-3 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300 my-3  ${
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

export default DonorRegister;
