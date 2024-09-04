import React from "react";

function BloodBankLogin() {
  return (
    <div className="flex flex-col justify-center md:mt-12 items-center">
      <form className="border sticky w-auto flex flex-col items-center justify-center rounded-3xl bg-transparent mt-20 shadow-2xl">
        <fieldset className="md:mx-20 md:my-10 md:p-9 mx-10 p-6 border border-red-100 rounded-xl grid grid-cols-1 my-10 gap-4 sticky shadow-2xl">
          <legend className="text-2xl font-semibold text-red-600 shadow-2xl">
            Blood Bank Login
          </legend>
          <div className="mb-2 md:w-96 sticky">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
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
              name="Password"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div>
            <h1>I'm New User : <a className="underline" href="jb">Sign Up</a></h1>
          </div>
        </fieldset>

        <button
          type="submit"
          className="px-7 py-2 mb-4 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default BloodBankLogin;
