import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import GoogleBtn from "../components/GoogleBtn";
import FacebookBtn from "../components/FacebookBtn";
import { login } from "../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [askRegister, setAskRegister] = useState("");

  const data = useSelector((state) => state.auth);
  const isUserLoggedIn = data?.isLoggedIn;

  useEffect(() => {
    if (data?.isLoggedIn === true) {
      setTimeout(() => {
        navigate("/home");
      }, 4000);
      setShowPopup(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please fill in all fields!");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }

    if (email.endsWith("@gmail.com") || email.endsWith("@yahoo.com")) {
      setErrorMessage("");
    } else {
      setErrorMessage("Email is not valid. Please try again.");
      return;
    }

    const error = await dispatch(login(email, password, navigate));
    setErrorMessage(`${error}. Please try again.`);
    if (error === "User is not found") {
      setAskRegister("Do you have an account?");
    } else if (error === "Email is not valid") {
      setAskRegister("");
    } else if (error === "Wrong password") {
      setAskRegister("");
    } else {
      setErrorMessage("");
      setAskRegister("");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <ToastContainer />
      {showPopup && (
        <div className="bg-[#FF5BAE] text-white rounded-sm p-3 text-center text-xl">
          <p>No need to login again, because your token is still active.</p>
        </div>
      )}
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
                  {isUserLoggedIn ? (
                    <input
                      className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                      type="email"
                      value={email}
                      disabled
                    />
                  ) : (
                    <input
                      className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  )}
                  <label className="font-semibold text-sm text-gray-600 pb-1 block">
                    Password
                  </label>
                  {isUserLoggedIn ? (
                    <div className="relative">
                      <input
                        className="border rounded-lg px-3 py-2 mt-1 mb-1 text-sm w-full"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        disabled
                      />
                      <span className="absolute inset-y-0 end-0 grid place-content-center px-4 text-gray-600 ">
                        {showPassword ? <LuEye /> : <LuEyeOff />}
                      </span>
                    </div>
                  ) : (
                    <div className="relative">
                      <input
                        className="border rounded-lg px-3 py-2 mt-1 mb-1 text-sm w-full"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span
                        className="absolute inset-y-0 end-0 grid place-content-center px-4 text-gray-600 "
                        onClick={toggleShowPassword}
                      >
                        {showPassword ? <LuEye /> : <LuEyeOff />}
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-right mb-4">
                  {isUserLoggedIn ? (
                    <span className="text-xs font-display font-semibold text-gray-500 hover:text-gray-600 cursor-pointer">
                      Forgot Password?
                    </span>
                  ) : (
                    <Link to="/forgot-password">
                      <span className="text-xs font-display font-semibold text-gray-500 hover:text-gray-600 cursor-pointer">
                        Forgot Password?
                      </span>
                    </Link>
                  )}
                </div>
                {errorMessage && (
                  <p className="text-sm text-red-600 mb-2">{errorMessage}</p>
                )}
                {askRegister && (
                  <p className="text-sm mb-2">
                    {askRegister}
                    <Link
                      to="/register"
                      className="text-[#FF5BAE] font-semibold"
                    >
                      {" "}
                      Sign up
                    </Link>{" "}
                    if not.
                  </p>
                )}
                {isUserLoggedIn ? (
                  <div className="flex justify-center w-full items-center">
                    <div>
                      <button disabled>
                        <GoogleBtn />
                        <FacebookBtn />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center w-full items-center">
                    <div>
                      <GoogleBtn />
                      <FacebookBtn />
                    </div>
                  </div>
                )}
                <div className="mt-5">
                  {isUserLoggedIn ? (
                    <button
                      className="py-2 px-4 bg-[#FF5BAE] text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg"
                      disabled
                    >
                      <div className="flex-col gap-4 w-full flex items-center justify-center">
                        <div className="w-10 h-10 border-4 text-[#db4992] text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-[#db4992] rounded-full"></div>
                      </div>
                    </button>
                  ) : (
                    <button
                      className="py-2 px-4 bg-[#FF5BAE] hover:bg-[#db4992] text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg"
                      type="submit"
                    >
                      <span>Log in</span>
                    </button>
                  )}
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                  {isUserLoggedIn ? (
                    <span className="text-xs text-gray-500 uppercase dark:text-gray-400 ">
                      or sign up
                    </span>
                  ) : (
                    <Link
                      to="/register"
                      className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
                    >
                      or sign up
                    </Link>
                  )}
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
