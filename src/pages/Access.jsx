import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

export default function Access() {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("localStorage ", localStorage.getItem("token"));
    if (localStorage.getItem("token") === null) {
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } else if (localStorage.getItem("token") !== null) {
      navigate("/home");
    }
  }, []);

  return (
    <div className="flex flex-col items-center py-24 my-24 text-white">
      <h1 className="text-5xl text-bold">Oops!</h1>
      <p className="text-3xl my-3">
        Sorry, you need to log in to access this page.
      </p>
      <p className="text-3xl">
        *You will be redirected to the login page within 3 seconds....
      </p>
      <div className="p-12 flex justify-center items-center">
        <div className="flex flex-row gap-2">
          <div className="w-6 h-6 rounded-full bg-[#FF5BAE] animate-bounce"></div>
          <div className="w-6 h-6 rounded-full bg-[#FF5BAE] animate-bounce [animation-delay:-.3s]"></div>
          <div className="w-6 h-6 rounded-full bg-[#FF5BAE] animate-bounce [animation-delay:-.5s]"></div>
        </div>
      </div>
    </div>
  );
}
