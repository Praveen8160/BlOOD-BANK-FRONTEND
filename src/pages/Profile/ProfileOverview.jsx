import React, { useEffect, useState, lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
const BBProfile = lazy(() => import("./BBProfile"));
const DonorProfile = lazy(() => import("./DonorProfile"));
function ProfileOverview() {
  const dispatch = useDispatch();
  const { Role } = useSelector((state) => state.Auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (Role === null) {
      navigate("/");
    }
  }, [Role, navigate, dispatch]);
  return (
    <div className="sticky rounded-lg shadow-2xl">
      <div className=" bg-gradient-to-r from-red-500 to-pink-500 text-white p-8 rounded-t-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Personal Details</h1>
      </div>
      <Suspense fallback={<Loader></Loader>}>
        {Role === "donor" && <DonorProfile />}
        {Role === "bloodbank" && <BBProfile />}
      </Suspense>
    </div>
  );
}

export default ProfileOverview;
