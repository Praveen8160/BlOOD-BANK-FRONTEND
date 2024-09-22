import React from "react";

function BBProfile() {
  return (
      <div className="flex flex-col md:mt-12 h-auto md:w-auto">
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
              name="name"
            //   value={bloodBank.bloodBankName}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
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
              name="Hospital"
            //   value={bloodBank.parentHospital}
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
            //   value={bloodBank.website}
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
            //   value={bloodBank.category}
              // onChange={}
            >
              <option value="">Select Category</option>
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
              name="Mobile"
            //   value={bloodBank.mobile}
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
            //   value={bloodBank.email}
              name="email"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-2 hidden">
            <label
              htmlFor="Password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:<span className="text-red-500">*</span>
            </label>
            <input
              type="Password"
              id="Password"
              name="Password"
            //   value={bloodBank.password}
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
              // value={selectedState || ""}
              onChange={(e) => setSelectedState(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            >
              {/* <option value="" disabled>
                    Select a state
                  </option> */}
              {/* {states.map((state) => (
                <>
                  {state.state_name == selectedState ? (
                    <option
                      key={state.state_id}
                      value={state.state_id}
                      selected
                    >
                      {state.state_name}
                    </option>
                  ) : (
                    <option key={state.state_id} value={state.state_id}>
                      {state.state_name}
                    </option>
                  )}
                </>
              ))} */}
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
            //   disabled={!selectedState}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            >
              <option value="" disabled>
                Select a district
              </option>
              {/* {districts.map((district) => (
                <option key={district.district_id} value={district.district_id}>
                  {district.district_name}
                </option>
              ))} */}
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
              name="Address"
            //   value={bloodBank.address}
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
              name="Pincode"
            //   value={bloodBank.pincode}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="px-7 py-0 mb-4 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Update
            </button>
            <button
              type="button"
              className="px-7 py-2 mb-4 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
  );
}

export default BBProfile;
