import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

function DonorRegister() {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

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
    },
  });

  const selectedState = watch("state"); // Watch for changes in state selection
  const selectedDistrict = watch("district"); // Watch for changes in district selection

  // Fetch all states on component mount
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

  // Fetch districts whenever selectedState changes
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
          console.error("Error fetching districts", error);
          toast.error("Failed to fetch districts. Please try again later.");
        }
      } else {
        setDistricts([]); // Clear districts if no state is selected
        setValue("district", "");
      }
    };
    fetchDistricts();
  }, [selectedState, setValue, states]);

  const onSubmit = (data) => {
    console.log("Form Data Submitted: ", data);
    // Add your form submission logic here (e.g., API call)
    toast.success("Registration successful!");
  };

  return (
    <div className="flex flex-col justify-center md:mt-12 items-center">
      <form
        className="border min-h-[45rem] w-full max-w-4xl flex flex-col items-center justify-center rounded-3xl bg-white mt-5 shadow-2xl p-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <legend className="text-3xl font-semibold text-red-600 mb-4 md:col-span-2 text-center">
            Donor Registration
          </legend>

          {/* Full Name */}
          <div className="flex flex-col">
            <label htmlFor="fullname" className="text-sm font-medium text-gray-700">
              Full Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullname"
              className="mt-1 p-2 border border-gray-300 rounded"
              {...register("fullname", { required: "Full Name is required" })}
            />
            {errors.fullname && (
              <p className="text-red-600 text-sm mt-1">{errors.fullname.message}</p>
            )}
          </div>

          {/* Age */}
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

          {/* Mobile */}
          <div className="flex flex-col">
            <label htmlFor="mobile" className="text-sm font-medium text-gray-700">
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
              <p className="text-red-600 text-sm mt-1">{errors.mobile.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 border border-gray-300 rounded"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
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
              <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Blood Group */}
          <div className="flex flex-col">
            <label htmlFor="bloodGroup" className="text-sm font-medium text-gray-700">
              Blood Group<span className="text-red-500">*</span>
            </label>
            <select
              id="bloodGroup"
              className="mt-1 p-2 border border-gray-300 rounded bg-white"
              {...register("bloodGroup", { required: "Select your blood group" })}
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
              <p className="text-red-600 text-sm mt-1">{errors.bloodGroup.message}</p>
            )}
          </div>

          {/* State */}
          <div className="flex flex-col">
            <label htmlFor="state" className="text-sm font-medium text-gray-700">
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
              <p className="text-red-600 text-sm mt-1">{errors.state.message}</p>
            )}
          </div>

          {/* District */}
          <div className="flex flex-col">
            <label htmlFor="district" className="text-sm font-medium text-gray-700">
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
                <option key={district.district_id} value={district.district_name}>
                  {district.district_name}
                </option>
              ))}
            </select>
            {errors.district && (
              <p className="text-red-600 text-sm mt-1">{errors.district.message}</p>
            )}
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label htmlFor="address" className="text-sm font-medium text-gray-700">
              Address<span className="text-red-500">*</span>
            </label>
            <textarea
              id="address"
              rows={3}
              className="mt-1 p-2 border border-gray-300 rounded"
              {...register("address", { required: "Address is required" })}
            />
            {errors.address && (
              <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>
            )}
          </div>

          {/* Pincode */}
          <div className="flex flex-col">
            <label htmlFor="pincode" className="text-sm font-medium text-gray-700">
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
              <p className="text-red-600 text-sm mt-1">{errors.pincode.message}</p>
            )}
          </div>
        </fieldset>

        <button
          type="submit"
          className="px-10 py-3 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300 mt-6"
        >
          Register
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default DonorRegister;
