import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function BloodInventory() {
  const { Role, isAuth } = useSelector((state) => state.Auth);
  const [bloodgroup, setBloodgroup] = useState("");
  const [bloodgroups, setBloodgroups] = useState();
  const [quantity, setQuantity] = useState("");
  const handleAdd = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/bloodBank/addBloood",

        {
          bloodgroup: bloodgroup,
          quantity: quantity,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success("Successfully Added");
        getAllBloodgroups();
      } else {
        toast.error("Failed to Add");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handlesub = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/bloodBank/subBlood",

        {
          bloodgroup: bloodgroup,
          quantity: quantity,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success("Successfully Update");
        getAllBloodgroups();
      } else {
        toast.error("Failed to Subtract");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const navigate = useNavigate();
  const getAllBloodgroups = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/bloodBank/getAllBloodData",
        {
          withCredentials: true,
        }
      );
      if (res.data.success === true) {
        // console.log(res.data.data);
        setBloodgroups(res.data.data);
      } else {
        toast.error("Failed to fetch bloodgroups. Please try again later.");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    if (!isAuth && !Role) {
      navigate("/");
    } else if (isAuth && Role === "bloodbank") {
      // console.log("object")
      getAllBloodgroups();
    }
  }, [isAuth, navigate]);
  return (
    <div className="border rounded-lg flex flex-col gap-4">
      <div className="flex py-7 flex-col gap-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg justify-center items-center">
        <h1 className="text-white text-3xl font-bold">Add Blood</h1>
        <p className="text-white text-lg">
          Keep track of your blood inventory{" "}
        </p>
      </div>
      <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 bg-red-200 rounded-md p-4 mx-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="bloodgroup" className="text-red-600 font-semibold">
            Blood Group
          </label>
          <select
            name=""
            id=""
            value={bloodgroup}
            onChange={(e) => setBloodgroup(e.target.value)}
            className="border-none p-2 rounded-md"
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
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="quantity" className="text-red-600 font-semibold">
            Quantity
          </label>
          <input
            type="Number"
            min={0}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border-none p-2 rounded-md"
          />
        </div>
        {/* <div className="gap-2 text-white text-center justify-center rounded-md flex flex-row p-3"> */}
        <button
          type="submit"
          className="text-white lg:text-2xl p-2 text-xl rounded-md bg-red-600 hover:bg-red-500"
          onClick={handleAdd}
        >
          +
        </button>
        <button
          type="submit"
          className="text-white lg:text-4xl p-2 text-xl rounded-md bg-red-600 hover:bg-red-500"
          onClick={handlesub}
        >
          -
        </button>
      </div>
      {/* </div> */}
      <div className="overflow-x-auto m-5 rounded-lg">
        <table className="table-auto border-collapse border border-slate-200 bg-red-600 w-full">
          <thead>
            <th className="text-white p-3">Blood Group</th>
            <th className="text-white p-3">Available Stock (units)</th>
          </thead>
          <tbody className="bg-red-200 text-center">
            {bloodgroups &&
              Object.entries(bloodgroups).map(([group, quantity], index) => (
                <tr
                  key={group}
                  className={index % 2 === 0 ? "bg-red-200" : "bg-red-100"}
                >
                  <td className="py-3">{group}</td>
                  <td className="py-3">{quantity}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BloodInventory;
