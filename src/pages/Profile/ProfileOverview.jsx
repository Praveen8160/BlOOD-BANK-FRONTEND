import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DonorProfile from "./DonorProfile";
import BBProfile from "./BBProfile";
function ProfileOverview() {
  const dispatch = useDispatch();
  const { Role } = useSelector((state) => state.Auth);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [districts, setDistricts] = useState([]);
  const navigate = useNavigate();
  const [Donor, setDonor] = useState([]);
  const [donorUpdateData, setdonorUpdateData] = useState({
    fullname: Donor?.fullname || "",
    age: Donor?.age || "",
    mobile: Donor?.mobile || "",
    email: Donor?.email || "",
    bloodGroup: Donor?.bloodGroup || "",
    state: Donor?.state || "",
    district: Donor?.district || "",
    address: Donor?.address || "",
    pincode: Donor?.pincode || "",
  });
  const [bloodBank, setbloodBank] = useState([]);

  const getDonorData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/Donor/getDonor", {
        withCredentials: true,
      });
      console.log(res.data);
      if (res.data.success === true) {
        setDonor(res.data.data);
        setSelectedState(res.data.data.state);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getBloodBankData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/bloodBank/getBloodBank",
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      if (res.data.success === true) {
        setbloodBank(res.data.data);
        setSelectedState(res.data.data.state);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
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
      }
    };
    fetchStates();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedState) {
        try {
          const response = await axios.get(
            `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${selectedState}`
          );
          setDistricts(response.data.districts);
        } catch (error) {
          console.error("Error fetching districts", error);
        }
      }
    };
    fetchDistricts();
  }, [selectedState]);

  useEffect(() => {
    if (Role === null) {
      navigate("/");
    } else {
      if (Role === "donor") {
        getDonorData();
      } else if (Role === "bloodbank") {
        getBloodBankData();
      }
    }
  }, [Role, navigate, dispatch]);
  return (
    <div className="border-2 sticky border-red-200 rounded-lg">
      <div className="bg-red-200 text-center text-2xl font-semibold p-4">
        <h1>Personal Detail</h1>
      </div>
      {/* {console.log(donorUpdateData)} */}
     
          {Role === "donor" && <DonorProfile />}
          {Role === "bloodbank" && <BBProfile />}
       
    </div>
  );
}

export default ProfileOverview;
