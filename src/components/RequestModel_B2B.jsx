import axios from "axios";
import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";
function RequestModelB2B({ close, id }) {
  const [value, setValue] = useState({
    bloodGroup: "",
    Quantity: "",
    reason: "",
    id: id,
  });
  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const sendRequest = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/bloodrequest/bloodRequestB2Bhandler",
        value,
        { withCredentials: true }
      );
      const response = res.data;
      if (response.success === true) {
        toast.success("Request Sent");
      }
    } catch (error) {
      // console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
    close();
  };
  // console.log(object)
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-red-100 p-6 rounded-lg shadow-lg lg:w-[30rem] md:w-[30rem] w-80">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl">Request For Blood</h2>
          <button
            onClick={close}
            className="text-red-600 hover:text-red-700 font-bold rounded"
          >
            <MdCancel size={29} />
          </button>
        </div>
        <hr />
        <form
          className="flex flex-col items-center mt-4"
          onSubmit={sendRequest}
        >
          <select
            id="bloodgroup"
            className="h-9 rounded-md placeholder:p-1 placeholder:text-gray-700  border-2 mb-5 border-gray-600 md:w-80"
            value={value.bloodGroup}
            onChange={onChange}
            name="bloodGroup"
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
          <input
            type="number"
            name="Quantity"
            className="h-9 rounded-md placeholder:p-1 placeholder:text-gray-700  border-2 mb-5 border-gray-600 lg:w-80 md:w-80"
            placeholder="Quantity"
            min={1}
            max={100}
            required
            value={value.Quantity}
            onChange={onChange}
          />
          {/* <textarea
            name="Reason"
            className="rounded-md placeholder:p-1 placeholder:text-gray-700 border-2 mb-5 border-gray-600 lg:w-80 md:w-80"
            id=""
            cols="22"
            rows="10"
            placeholder="Reason"
            required
            value={value.description}
            onChange={onChange}
          ></textarea> */}
          <textarea
            name="reason"
            className="rounded-md placeholder:p-1 placeholder:text-gray-700 border-2 mb-5 border-gray-600 lg:w-80 md:w-80"
            id=""
            cols="22"
            rows="10"
            placeholder="Reason"
            required
            value={value.reason}
            onChange={onChange}
          ></textarea>
          <button className="border-2 py-3 px-5 font-bold  border-gray-700 rounded-md bg-red-500 hover:bg-red-700 hover:scale-105">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default RequestModelB2B;
