import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useGoogleOneTapLogin } from "@react-oauth/google";

export default function GoogleBtn() {
  const navigate = useNavigate();

  return (
    <div className="py-2">
      <ToastContainer />
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          localStorage.setItem("token", credentialResponse.credential);
          localStorage.setItem("login", "google component");
          const decoded = jwtDecode(localStorage.getItem("token"));
          toast.success(`Welcome, ${decoded?.name}✨`);
          setTimeout(() => {
            navigate("/home", {
              state: { token: credentialResponse.credential },
            });
          }, 2000);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        size={"large"}
        width={"500px"}
        text={"continue_with"}
        ux_mode={"popup"}
      />
    </div>
  );
}
