import React from "react";

function Loader() {
  return (
    <div className="w-full min-h-[13rem] flex flex-col justify-center items-center">
      <span class="loader"></span>
      <h1 className="text-xl font-semibold animate-ping">Loading</h1>
    </div>
  );
}

export default Loader;
