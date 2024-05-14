import FacebookLogin from "@greatsumini/react-facebook-login";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setToken,
  setIsLoggedIn,
  setUser,
} from "../redux/reducers/authReducers";

export default function FacebookBtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const FACEBOOK_APP_ID = import.meta.env.VITE_FACEBOOK_APP_ID;
  return (
    <div className="mt-4">
      <ToastContainer />
      <FacebookLogin
        appId={FACEBOOK_APP_ID}
        onSuccess={(response) => {
          // console.log("Login Success!", response);
          const token = response?.accessToken;
          // console.log("token facebook", token);
          dispatch(setToken(token));
          dispatch(setIsLoggedIn(true));
          setTimeout(() => {
            navigate("/home");
          }, 3000);
        }}
        onFail={(error) => {
          // console.log("Login Failed!", error);
          toast.error("Failed, please try again.");
        }}
        onProfileSuccess={(response) => {
          // console.log("Get Profile Success!", response);
          toast.success(`Welcome, ${response?.name}✨`);
          dispatch(setUser(response));
        }}
        children={
          <div className="flex items-center justify-center py-2 px-[102px] bg-white hover:bg-gray-200 text-gray-700 w-full text-center text-base font-semibold shadow-md rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30"
              height="30"
              viewBox="0 0 48 48"
            >
              <path
                fill="#3f51b5"
                d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"
              ></path>
              <path
                fill="#fff"
                d="M29.368,24H26v12h-5V24h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H30v4h-2.287 C26.104,16,26,16.6,26,17.723V20h4L29.368,24z"
              ></path>
            </svg>
            <span className="ml-2 text-sm">Continue with Facebook</span>
          </div>
        }
      />
    </div>
  );
}
