import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import GoogleBtn from "../components/GoogleBtn";
import BtnGoogle from "../components/BtnGoogle";
import FacebookBtn from "../components/FacebookBtn";

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
  const [errorName, setErrorName] = useState("");
  const [askLogin, setAskLogin] = useState("");
  const [random, setRandom] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    // console.log("localStorage ", localStorage.getItem("token"));
    if (localStorage.getItem("token") !== null) {
      setTimeout(() => {
        navigate("/home");
      }, 4000);
      setShowPopup(true);
      setIsUserLoggedIn(true);
    }
  }, []);

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
    const randomPassword = generateRandomPassword(24);
    setPassword(randomPassword);
    setConfirmPassword(randomPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !name || !password || !confirmPassword) {
      setErrorRegister("Please fill in all fields!");
      return;
    } else if (email || name || password || confirmPassword) {
      setErrorRegister("");
    }

    if (name.length < 3) {
      setErrorName("Name must be more than 3 letters");
      setErrorRegister("");
      setRandom("");
    } else if (name.length >= 3) {
      setErrorName("");
    }

    if (email.endsWith("@gmail.com") || email.endsWith("@yahoo.com")) {
      setErrorMsgEmail("");
    } else {
      setErrorMsgEmail("Email can only end with @gmail.com or @yahoo.com");
      setErrorRegister("");
      setRandom("");
    }

    if (confirmPassword !== password) {
      setErrorMsgPassword(
        "Your password and confirm password entries do not match!"
      );
      setErrorRegister("");
      setRandom("");
      return;
    } else if (confirmPassword === password) {
      setErrorMsgPassword("");
    }

    if (
      name.length >= 3 &&
      (email.endsWith("@gmail.com") || email.endsWith("@yahoo.com")) &&
      confirmPassword === password
    ) {
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
          setAskLogin("Want to log in instead?");
          setRandom("");
        } else if (message === "Password must be stronger") {
          setRandom("Do you want a random password?");
          setAskLogin("");
        }
      }
    }
  };

  const BtnShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };

  const BtnShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  return (
    <div>
      {showPopup && (
        <div className="bg-[#FF5BAE] text-white rounded-sm text-xl p-3 text-center">
          <p>You can't register, because your token is still active.</p>
        </div>
      )}
      <ToastContainer />
      <div className="flex items-center justify-center px-4 py-10">
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
                    {isUserLoggedIn ? (
                      <input
                        className="border rounded-lg px-3 py-2 mt-1 mb-1 text-sm w-full"
                        type="text"
                        value={name}
                        disabled
                      />
                    ) : (
                      <input
                        className="border rounded-lg px-3 py-2 mt-1 mb-1 text-sm w-full"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    )}
                  </div>
                  <p className="text-sm text-red-600 mb-2">{errorName}</p>
                  <div className="my-3">
                    <label className="font-semibold text-sm text-gray-600 pb-1 block">
                      Email
                    </label>
                    {isUserLoggedIn ? (
                      <input
                        className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                        type="email"
                        value={email}
                        disabled
                      />
                    ) : (
                      <input
                        className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    )}
                  </div>
                  <p className="text-sm text-red-600 mb-2">{errorMsgEmail}</p>
                  <div>
                    <label className="font-semibold text-sm text-gray-600 pb-1 block">
                      Password
                    </label>
                    {isUserLoggedIn ? (
                      <div className="relative">
                        <input
                          className="border rounded-lg px-3 py-2 mt-1 mb-1 text-sm w-full"
                          type={showPassword1 ? "text" : "password"}
                          value={password}
                          disabled
                        />
                        <span className="absolute inset-y-0 end-0 grid place-content-center px-4 text-gray-600 ">
                          {showPassword1 ? <LuEye /> : <LuEyeOff />}
                        </span>
                      </div>
                    ) : (
                      <div className="relative">
                        <input
                          className="border rounded-lg px-3 py-2 mt-1 mb-1 text-sm w-full"
                          type={showPassword1 ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <span
                          className="absolute inset-y-0 end-0 grid place-content-center px-4 text-gray-600 "
                          onClick={BtnShowPassword1}
                        >
                          {showPassword1 ? <LuEye /> : <LuEyeOff />}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="my-3">
                    <label className="font-semibold text-sm text-gray-600 pb-1 block">
                      Confirm Password
                    </label>
                    {isUserLoggedIn ? (
                      <div className="relative">
                        <input
                          className="border rounded-lg px-3 py-2 mt-1 mb-1 text-sm w-full"
                          type={showPassword2 ? "text" : "password"}
                          value={confirmPassword}
                          disabled
                        />
                        <span className="absolute inset-y-0 end-0 grid place-content-center px-4 text-gray-600 ">
                          {showPassword2 ? <LuEye /> : <LuEyeOff />}
                        </span>
                      </div>
                    ) : (
                      <div className="relative">
                        <input
                          className="border rounded-lg px-3 py-2 mt-1 mb-1 text-sm w-full"
                          type={showPassword2 ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <span
                          className="absolute inset-y-0 end-0 grid place-content-center px-4 text-gray-600 "
                          onClick={BtnShowPassword2}
                        >
                          {showPassword2 ? <LuEye /> : <LuEyeOff />}
                        </span>
                      </div>
                    )}
                    <p className="text-sm text-red-600">{errorMsgPassword}</p>
                  </div>
                </div>
                <p className="text-sm text-red-600 mb-1">{errorRegister}</p>
                {askLogin && (
                  <Link to="/login">
                    <p className="text-sm">
                      {askLogin}{" "}
                      <span className="text-[#FF5BAE] font-semibold">
                        Log In.
                      </span>
                    </p>
                  </Link>
                )}
                {random && (
                  <button
                    onClick={handleGeneratePassword}
                    className="text-sm mb-2"
                  >
                    {random}{" "}
                    <span className="text-[#FF5BAE] font-semibold">
                      Random Password.
                    </span>
                  </button>
                )}
                <div className="flex justify-center items-center">
                  {isUserLoggedIn ? (
                    <button disabled>
                      <GoogleBtn />
                      <FacebookBtn />
                    </button>
                  ) : (
                    <div>
                      {/* <GoogleBtn /> */}
                      <BtnGoogle />
                      <FacebookBtn />
                    </div>
                  )}
                </div>
                <div className="mt-5">
                  {isUserLoggedIn ? (
                    <button
                      className="py-2 px-4 bg-[#FF5BAE] text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg"
                      type="submit"
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
                      <span>Sign up</span>
                    </button>
                  )}
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                  {isUserLoggedIn ? (
                    <span className="text-xs text-gray-500 uppercase dark:text-gray-400">
                      have an account? Log in
                    </span>
                  ) : (
                    <Link
                      to="/login"
                      className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
                    >
                      have an account? Log in
                    </Link>
                  )}
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
