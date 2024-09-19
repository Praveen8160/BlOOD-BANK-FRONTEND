import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/Authaction";
import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:4000");
function DonorLogin() {
  const { isAuth, Role } = useSelector((state) => state.Auth);
  const [bloodBankId, setBloodBankId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });

  const Login = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/Donor/login",
        data,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response = res.data;
      if (response.success === true) {
        const bloodBankId = response.id;
        await dispatch(login());
        setBloodBankId(bloodBankId);
        localStorage.setItem("id", bloodBankId);
        socket.emit("register", bloodBankId);
        toast.success("Successfully Login");
        // console.log(Role);
        navigate("/");
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    if (isAuth) {
      console.log("check:", isAuth);
      navigate("/");
    }
  }, [isAuth]);
  return (
    <div className="flex flex-col justify-center md:mt-12 items-center">
      <form
        className="border sticky w-auto flex flex-col items-center justify-center rounded-3xl bg-transparent mt-20 shadow-2xl"
        onSubmit={handleSubmit(Login)}
      >
        <fieldset className="md:mx-20 md:my-10 md:p-9 mx-10 p-6 border border-red-100 rounded-xl grid grid-cols-1 my-10 gap-4 sticky shadow-2xl">
          <legend className="text-2xl font-semibold text-red-600">
            Donor Login
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
              {...register("email", { required: "Email is required" })}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
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
              {...register("password", {
                required: "password is required",
              })}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
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
export default DonorLogin;
