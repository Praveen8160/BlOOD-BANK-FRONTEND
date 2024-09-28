import React from "react";

function Loader() {
  // min-h-[15rem] 
  return (
    <div className="w-full flex min-h-[30rem] flex-col justify-center items-center">
      <span class="loader"></span>
      <h1 className="text-xl font-semibold animate-ping">Loading</h1>
    </div>
  );
}

export default Loader;
