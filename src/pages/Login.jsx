import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    console.log("localStorage ", localStorage.getItem("token"));
    if (localStorage.getItem("token") !== null) {
      alert("No need to login again, because your token is still active.");
      navigate("/home");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      const response = await axios.post(
        `https://shy-cloud-3319.fly.dev/api/v1/auth/login`,
        {
          email: email,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Response Login", response?.data);
      if (response?.status === 200) {
        toast.success("Login Successfully!");
        // console.log("token", response?.data?.data?.token);
        localStorage.setItem("token", response?.data?.data?.token);
        setTimeout(() => {
          navigate("/home", { state: { token: response?.data?.data?.token } });
        }, 2000);
      }
    } catch (error) {
      console.log("Error: ", error);
      const message = error?.response?.data?.message;
      setErrorMessage(`${message}. Please try again.`);
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex items-center justify-center px-4 py-10 ">
        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
              <div className="max-w-lg mx-auto">
                <div className="flex items-center space-x-5 justify-center">
                  <h2 className="text-center text-2xl mt-2 font-bold leading-tight text-black">
                    Log in to your account
                  </h2>
                </div>
                <div className="mt-5">
                  <label className="font-semibold text-sm text-gray-600 pb-1 block">
                    Email
                  </label>
                  <input
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="font-semibold text-sm text-gray-600 pb-1 block">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      className="border rounded-lg px-3 py-2 mt-1 mb-1 text-sm w-full"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      className="absolute inset-y-0 end-0 grid place-content-center px-4"
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? <LuEye /> : <LuEyeOff />}
                    </span>
                  </div>
                </div>
                <div className="text-right mb-4">
                  <Link
                    to=""
                    className="text-xs font-display font-semibold text-gray-500 hover:text-gray-600 cursor-pointer"
                  >
                    Forgot Password?
                  </Link>
                </div>
                {errorMessage && (
                  <p className="text-sm text-red-600 mb-2">{errorMessage}</p>
                )}
                <div className="flex justify-center w-full items-center">
                  <div>
                    <button className="flex items-center justify-center py-2 px-20 bg-white hover:bg-gray-200 text-gray-700 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                      <svg
                        height="30px"
                        width="30px"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            d="M30.0014 16.3109C30.0014 15.1598 29.9061 14.3198 29.6998 13.4487H16.2871V18.6442H24.1601C24.0014 19.9354 23.1442 21.8798 21.2394 23.1864L21.2127 23.3604L25.4536 26.58L25.7474 26.6087C28.4458 24.1665 30.0014 20.5731 30.0014 16.3109Z"
                            fill="#4285F4"
                          ></path>
                          <path
                            d="M16.2863 29.9998C20.1434 29.9998 23.3814 28.7553 25.7466 26.6086L21.2386 23.1863C20.0323 24.0108 18.4132 24.5863 16.2863 24.5863C12.5086 24.5863 9.30225 22.1441 8.15929 18.7686L7.99176 18.7825L3.58208 22.127L3.52441 22.2841C5.87359 26.8574 10.699 29.9998 16.2863 29.9998Z"
                            fill="#34A853"
                          ></path>
                          <path
                            d="M8.15964 18.769C7.85806 17.8979 7.68352 16.9645 7.68352 16.0001C7.68352 15.0356 7.85806 14.1023 8.14377 13.2312L8.13578 13.0456L3.67083 9.64746L3.52475 9.71556C2.55654 11.6134 2.00098 13.7445 2.00098 16.0001C2.00098 18.2556 2.55654 20.3867 3.52475 22.2845L8.15964 18.769Z"
                            fill="#FBBC05"
                          ></path>
                          <path
                            d="M16.2864 7.4133C18.9689 7.4133 20.7784 8.54885 21.8102 9.4978L25.8419 5.64C23.3658 3.38445 20.1435 2 16.2864 2C10.699 2 5.8736 5.1422 3.52441 9.71549L8.14345 13.2311C9.30229 9.85555 12.5086 7.4133 16.2864 7.4133Z"
                            fill="#EB4335"
                          ></path>
                        </g>
                      </svg>
                      <span className="ml-2">Log in with Google</span>
                    </button>
                  </div>
                </div>
                <div className="mt-5">
                  <button
                    className="py-2 px-4 bg-[#FF5BAE] hover:bg-[#db4992] text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                    type="submit"
                  >
                    Log in
                  </button>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                  <Link
                    to="/register"
                    className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
                  >
                    or sign up
                  </Link>
                  <span className="w-1/5 border-b dark:border-gray-400 md:w-1/4"></span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
