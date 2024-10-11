import React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import axios from "axios";
import BASE_URL from "../../config.js"
function BBProfile() {
  const [bloodBank, setbloodBank] = useState(null);
  const [update, setUpdate] = useState(false);
  const [value, setValue] = useState();
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [Loading, setLoader] = useState(false);
  const [count, setCount] = useState(0);

  const getBloodBankData = async () => {
    setLoader(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/bloodBank/getBloodBank`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success === true) {
        setbloodBank(res.data.data);
        setValue(res.data.data);
        setSelectedState(res.data.data.state);
        setSelectedDistrict(res.data.data.district);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoader(false);
    }
  };
  const onchangeHandler = (e) => {
    setCount(count + 1);
    setbloodBank({
      ...bloodBank,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "state") {
      setbloodBank({
        ...bloodBank,
        district: null,
        state: e.target.value,
      });
      setSelectedState(e.target.value);
    }
    if (e.target.name === "district") {
      setbloodBank({
        ...bloodBank,
        district: e.target.value,
      });
      setSelectedDistrict(e.target.value);
    }
  };
  const cancelhandler = () => {
    setUpdate(false);
    setbloodBank(value);
    setSelectedState(value.state);
  };
  const updatehandler = async () => {
    if (update === true && count > 0) {
      if (
        !bloodBank.state ||
        !bloodBank.district ||
        !bloodBank.address ||
        !bloodBank.pincode ||
        !bloodBank.mobile ||
        !bloodBank.email ||
        !bloodBank.parentHospital ||
        !bloodBank.bloodBankName ||
        !bloodBank.category
      ) {
        toast.error("Please fill out all fields.");
        return;
      }
      try {
        setLoader(true);
        const res = await axios.put(
          `${BASE_URL}/bloodBank/updateBloodbankDatahandler`,
          bloodBank,
          {
            withCredentials: true,
          }
        );
        if (res.data.success === true) {
          toast.success("Donor updated successfully");
          setValue(bloodBank);
          console.log(bloodBank);
          setUpdate(false);
          setCount(0);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Error updating donor");
      } finally {
        setLoader(false);
      }
    } else if (update === false) {
      setUpdate(true);
    } else {
      setUpdate(false);
    }
  };
  useEffect(() => {
    setLoader(true);
    getBloodBankData();
    fetchStates();
    setLoader(false);
  }, []);
  useEffect(() => {
    if (selectedState && states) {
      fetchDistricts();
    }
  }, [selectedState, states]);
  const fetchStates = async () => {
    try {
      const response = await axios.get(
        "https://cdn-api.co-vin.in/api/v2/admin/location/states"
      );
      setStates(response.data.states);
    } catch (error) {
      console.error("Error fetching states", error);
      toast.error("connect Internet");
    }
  };
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
        } else {
          const response = await axios.get(
            `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${selectedState}`
          );
          setDistricts(response.data.districts);
        }
      } catch (error) {
        toast.error("connect Internet");
      }
    } else {
      setDistricts([]);
    }
  };

  return (
    <>
      {Loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col md:mt-12 h-auto md:w-auto">
          {bloodBank && (
            <form className="h-auto grid grid-cols-1 md:grid-cols-2 rounded-3xl gap-4 mt-5 px-4">
              <div className="mb-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Blood Bank Name::<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="bloodBankName"
                  onChange={onchangeHandler}
                  value={bloodBank.bloodBankName}
                  disabled={!update}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required
                />
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
                  name="parentHospital"
                  onChange={onchangeHandler}
                  value={bloodBank.parentHospital}
                  disabled={!update}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
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
                  name="website"
                  value={bloodBank.website}
                  onChange={onchangeHandler}
                  disabled={!update}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="Category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category:<span className="text-red-500">*</span>
                </label>
                <select
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  name="category"
                  value={bloodBank.category}
                  onChange={onchangeHandler}
                  disabled={!update}
                >
                  <option value="Private">Private</option>
                  <option value="Govt.">Govt.</option>
                  <option value="Red Cross">Red Cross</option>
                </select>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="Mobile"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mobile:<span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="Mobile"
                  name="mobile"
                  onChange={onchangeHandler}
                  disabled={!update}
                  value={bloodBank.mobile}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  style={{
                    appearance: "none",
                    MozAppearance: "textfield",
                    WebkitAppearance: "none",
                  }}
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email:<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  onChange={onchangeHandler}
                  value={bloodBank.email}
                  disabled={!update}
                  name="email"
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700"
                >
                  State:<span className="text-red-500">*</span>
                </label>
                <select
                  id="state"
                  onChange={onchangeHandler}
                  disabled={!update}
                  name="state"
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required
                >
                  {states.map((state) => (
                    <>
                      {state.state_name == selectedState ? (
                        <option
                          key={state.state_id}
                          value={state.state_name}
                          selected
                        >
                          {state.state_name}
                        </option>
                      ) : (
                        <option key={state.state_id} value={state.state_name}>
                          {state.state_name}
                        </option>
                      )}
                    </>
                  ))}
                </select>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="district"
                  className="block text-sm font-medium text-gray-700"
                >
                  District:<span className="text-red-500">*</span>
                </label>
                <select
                  id="district"
                  disabled={!update}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  name="district"
                  onChange={onchangeHandler}
                  required
                >
                  {districts.map((district) =>
                    district.district_name === selectedDistrict ? (
                      <option
                        key={district.district_id}
                        value={district.district_name}
                        selected
                      >
                        {district.district_name}
                      </option>
                    ) : (
                      <option
                        key={district.district_id}
                        value={district.district_name}
                      >
                        {district.district_name}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="Address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address:<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="Address"
                  value={bloodBank.address}
                  name="address"
                  onChange={onchangeHandler}
                  disabled={!update}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="Pincode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Pincode:<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="Pincode"
                  value={bloodBank.pincode}
                  name="pincode"
                  onChange={onchangeHandler}
                  disabled={!update}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
            </form>
          )}
          <div className="flex gap-4 mt-5 ml-5">
            <button
              type="submit"
              className={`${
                Loading ? "opacity-50 cursor-not-allowed" : ""
              } px-7 py-3 mb-4 bg-red-500 text-white rounded hover:bg-red-600`}
              onClick={updatehandler}
            >
              {update ? " Save" : "Update"}
            </button>
            {update && (
              <button
                type="button"
                className={`${
                  Loading ? "opacity-50 cursor-not-allowed" : ""
                } px-7 py-3 mb-4 bg-red-500 text-white rounded hover:bg-red-600`}
                onClick={cancelhandler}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default BBProfile;
