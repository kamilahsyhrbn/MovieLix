import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [errorMsgEmail, setErrorMsgEmail] = useState("");
  const [errorMsgPassword, setErrorMsgPassword] = useState("");
  const [errorRegister, setErrorRegister] = useState("");
  const [askLogin, setAskLogin] = useState("");
  const [random, setRandom] = useState("");

  const generateRandomPassword = (length) => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]|;:,.<>?";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  const handleGeneratePassword = (e) => {
    e.preventDefault();
    const randomPassword = generateRandomPassword(12);
    setPassword(randomPassword);
    setConfirmPassword(randomPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !name || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (email.endsWith("@gmail.com") || email.endsWith("@yahoo.com")) {
    } else {
      setErrorMsgEmail("Email can only end with @gmail.com or @yahoo.com");
      setTimeout(() => {
        setErrorMsgEmail("");
      }, 7000);
    }

    if (confirmPassword !== password) {
      setErrorMsgPassword(
        "Your password and confirm password entries do not match!"
      );

      setTimeout(() => {
        setErrorMsgPassword("");
      }, 7000);
      return;
    }

    try {
      const response = await axios.post(
        `https://shy-cloud-3319.fly.dev/api/v1/auth/register`,
        {
          email: email,
          name: name,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Response data", response.data);
      if (response?.status === 201) {
        toast.success(`Successfuly registered!`);
        setAskLogin("");
        setRandom("");
        setErrorRegister("");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.log("Error: ", error);
      const message = error?.response?.data?.message;
      setErrorRegister(`Failed to register because ${message}.`);
      if (message === "User has already registered") {
        setAskLogin("Want to log in instead? Log In");
        setRandom("");
      } else if (message === "Password must be stronger") {
        setRandom("Do you want a random password?");
        setAskLogin("");
      }
    }
  };

  const toggleShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };

  const toggleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex items-center justify-center px-4">
        <form className="mt-3" onSubmit={handleSubmit}>
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
              <div className="max-w-lg mx-auto">
                <div className="flex items-center space-x-5 justify-center">
                  <h2 className="text-center text-2xl font-bold leading-tight text-black">
                    Create your account
                  </h2>
                </div>
                <div className="mt-5">
                  <div>
                    <label className="font-semibold text-sm text-gray-600 pb-1 block">
                      Full Name
                    </label>
                    <input
                      className="border rounded-lg px-3 py-2 mt-1 mb-1 text-sm w-full"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label className="font-semibold text-sm text-gray-600 pb-1 block">
                      Email
                    </label>
                    <input
                      className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <p className="text-sm text-red-600 mb-2">{errorMsgEmail}</p>
                  <div>
                    <label className="font-semibold text-sm text-gray-600 pb-1 block">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        className="border rounded-lg px-3 py-2 mt-1 mb-1 text-sm w-full"
                        type={showPassword1 ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span
                        className="absolute inset-y-0 end-0 grid place-content-center px-4"
                        onClick={toggleShowPassword1}
                      >
                        {showPassword1 ? <LuEye /> : <LuEyeOff />}
                      </span>
                    </div>
                  </div>
                  <div className="my-3">
                    <label className="font-semibold text-sm text-gray-600 pb-1 block">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        className="border rounded-lg px-3 py-2 mt-1 mb-1 text-sm w-full "
                        type={showPassword2 ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <span
                        className="absolute inset-y-0 end-0 grid place-content-center px-4"
                        onClick={toggleShowPassword2}
                      >
                        {showPassword2 ? <LuEye /> : <LuEyeOff />}
                      </span>
                    </div>
                    <p className="text-sm text-red-600">{errorMsgPassword}</p>
                  </div>
                </div>
                <p className="text-sm text-red-600 mb-1">{errorRegister}</p>
                <Link to="/login">
                  <p className="text-sm">{askLogin}</p>
                </Link>
                <button
                  onClick={handleGeneratePassword}
                  className="text-sm mb-2"
                >
                  {random}
                </button>
                <div className="flex justify-center items-center">
                  <div>
                    <button
                      className="flex items-center justify-center py-2 px-20 bg-white hover:bg-gray-200 text-gray-700 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                      type="button"
                    >
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
                      <span className="ml-2">Sign up with Google</span>
                    </button>
                  </div>
                </div>
                <div className="mt-5">
                  <button
                    className="py-2 px-4 bg-[#FF5BAE] hover:bg-[#db4992] text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                    type="submit"
                  >
                    Sign up
                  </button>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                  <Link
                    to="/login"
                    className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
                  >
                    have an account? Log in
                  </Link>
                  <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
