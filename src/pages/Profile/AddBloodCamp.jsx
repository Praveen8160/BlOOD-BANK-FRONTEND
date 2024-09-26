import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
function AddBloodCamp() {
  const [campDate, setCampDate] = useState("");
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [image, setimage] = useState("");
  const [formData, setFormData] = useState({
    campName: "",
    address: "",
    startTime: "",
    endTime: "",
    description: "",
    district: "",
    state: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleDateChange = (e) => {
    setCampDate(e.target.value);
  };
  const handleFileChange = (e) => {
    setimage(e.target.files[0]);
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
        toast.error("connect Internet");
      }
    };
    fetchStates();
  }, []);
  useEffect(() => {
    const fetchDistricts = async () => {
      if (formData.state) {
        try {
          const selectedStateObj = states.find(
            (state) => state.state_name === formData.state
          );
          if (selectedStateObj) {
            const response = await axios.get(
              `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${selectedStateObj.state_id}`
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
    fetchDistricts();
  }, [formData.state]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.campName ||
      !formData.address ||
      !formData.startTime ||
      !formData.endTime ||
      !formData.description ||
      !formData.district ||
      !formData.state ||
      !image
    ) {
      toast.error("Please fill out all fields");
      return;
    }
    try {
      const Data = new FormData();
      Data.append("campName", formData.campName);
      Data.append("address", formData.address);
      Data.append("startTime", formData.startTime);
      Data.append("endTime", formData.endTime);
      Data.append("description", formData.description);
      Data.append("district", formData.district);
      Data.append("state", formData.state);
      Data.append("image", image);
      Data.append("campDate", campDate);
      const res = await axios.post(
        "http://localhost:4000/camp/AddCamp",
        Data,
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data.success === true) {
        toast.success("Camp Added Successfully");
      } else {
        toast.error("Camp Not Added");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
        <div className="px-4 py-5 sm:p-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">
              Add Blood Bank Camp
            </h2>
          </div>
          <form
            onSubmit={handleSubmit}
            className="gap-5 grid lg:grid-cols-2 grid-cols-1"
          >
            <div>
              <label
                htmlFor="campName"
                className="block text-red-600 font-semibold mb-2"
              >
                Camp Name
              </label>
              <input
                id="campName"
                name="campName"
                value={formData.campName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label
                htmlFor="campName"
                className="block text-red-600 font-semibold mb-2"
              >
                Camp Image
              </label>
              <input
                type="file"
                id="campImage"
                name="Image"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label
                htmlFor="state"
                className="block text-red-600 font-semibold mb-2"
              >
                State
              </label>
              <select
                id="state"
                name="state"
                className="w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                onChange={handleInputChange}
                value={formData.state}
                required
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.state_id} value={state.state_name}>
                    {state.state_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="district"
                className="block text-red-600 font-semibold mb-2"
              >
                District
              </label>
              <select
                id="district"
                name="district"
                className="w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                onChange={handleInputChange}
                value={formData.district}
                required
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
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-red-600 font-semibold mb-2"
              >
                Address
              </label>
              <input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label
                htmlFor="campDate"
                className="block text-red-600 font-semibold mb-2"
              >
                Camp Date
              </label>
              <input
                id="campDate"
                type="date"
                value={campDate}
                onChange={handleDateChange}
                required
                className="w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="startTime"
                  className="block text-red-600 font-semibold mb-2"
                >
                  Start Time
                </label>
                <input
                  id="startTime"
                  name="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label
                  htmlFor="endTime"
                  className="block text-red-600 font-semibold mb-2"
                >
                  End Time
                </label>
                <input
                  id="endTime"
                  name="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-red-600 font-semibold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white font-bold bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 grid-cols-2"
                // isloading={loading}
              >
                Add Blood Bank Camp
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AddBloodCamp;
