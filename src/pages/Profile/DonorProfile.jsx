import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import BASE_URL from "../../config.js"
function DonorProfile() {
  const [Donor, setDonor] = useState(null);
  const [update, setUpdate] = useState(false);
  const [value, setValue] = useState();
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [Loading, setLoader] = useState(false);
  const [count, setCount] = useState(0);
  const getDonorData = async () => {
    setLoader(true);
    try {
      const res = await axios.get(`${BASE_URL}/Donor/getDonor`, {
        withCredentials: true,
      });
      if (res.data.success === true) {
        setDonor(res.data.data);
        setValue(res.data.data);
        setSelectedState(res.data.data.state);
        setSelectedDistrict(res.data.data.district);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error fetching donor data");
    } finally {
      setLoader(false);
    }
  };
  const onchangeHandler = (e) => {
    setCount(count + 1);
    setDonor({
      ...Donor,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "state") {
      setDonor({
        ...Donor,
        district: null,
        state: e.target.value,
      });
      setSelectedState(e.target.value);
    }
    if (e.target.name === "district") {
      setDonor({
        ...Donor,
        district: e.target.value,
      });
      setSelectedDistrict(e.target.value);
    }
  };
  const updatehandler = async () => {
    if (update === true && count > 0) {
      if (
        !Donor.fullname ||
        !Donor.age ||
        !Donor.mobile ||
        !Donor.email ||
        !Donor.bloodGroup ||
        !Donor.state ||
        !Donor.district ||
        !Donor.address ||
        !Donor.pincode
      ) {
        toast.error("Please fill out all fields.");
        return;
      }
      try {
        setLoader(true);
        const res = await axios.put(
          `${BASE_URL}/Donor/updateDonor`,
          Donor,
          {
            withCredentials: true,
          }
        );
        if (res.data.success === true) {
          toast.success("Donor updated successfully");
          setValue(Donor);
          console.log(Donor);
          setUpdate(false);
          setCount(0);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
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
  const cancelhandler = () => {
    setUpdate(false);
    setDonor(value);
    setSelectedState(value.state);
  };
  useEffect(() => {
    setLoader(true);
    getDonorData();
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
      setLoader(true);
      const response = await axios.get(
        `${BASE_URL}/api/states`
      );
      setStates(response.data.states);
    } catch (error) {
      console.error("Error fetching states", error);
      toast.error("connect Internet");
    } finally {
      setLoader(false);
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
            `${BASE_URL}/api/districts/${selectedStateObj.state_id}`
          );
          console.log("if response:",response.data.districts)
          setDistricts(response.data.districts);
        } else {
          console.log("selectedState:",selectedState)
          const response = await axios.get(
            `${BASE_URL}/api/districts/${selectedState}`
          );
          console.log("else response:",response.data.districts)
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
          {Donor && (
            <form className="h-auto grid grid-cols-1 md:grid-cols-2 rounded-3xl gap-4 mt-5 px-4">
              <div className="mb-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name:<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="fullname"
                  onChange={onchangeHandler}
                  disabled={!update}
                  value={Donor.fullname}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="Age"
                  className="block text-sm font-medium text-gray-700"
                >
                  Age:<span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="Age"
                  name="age"
                  value={Donor?.age}
                  onChange={onchangeHandler}
                  disabled={!update}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required
                />
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
                  value={Donor?.mobile}
                  onChange={onchangeHandler}
                  disabled={!update}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required
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
                  value={Donor?.email}
                  onChange={onchangeHandler}
                  disabled={!update}
                  name="email"
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="Blood Group"
                  className="block text-sm font-medium text-gray-700"
                >
                  Blood Group:<span className="text-red-500">*</span>
                </label>
                <select
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  value={Donor?.bloodGroup}
                  disabled={!update}
                  name="bloodGroup"
                  onChange={onchangeHandler}
                  required
                >
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
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  name="state"
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
                  name="address"
                  onChange={onchangeHandler}
                  value={Donor?.address}
                  disabled={!update}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required
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
                  name="pincode"
                  onChange={onchangeHandler}
                  value={Donor?.pincode}
                  disabled={!update}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required
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

export default DonorProfile;
