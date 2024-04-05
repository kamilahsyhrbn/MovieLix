import React, { useState, useEffect } from "react";
import axios from "axios";
import NoImage from "../assets/Default_pfp.png";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const [profile, setProfile] = useState("");
  const navigate = useNavigate();
  // console.log("location ", localStorage.getItem("token"));

  useEffect(() => {
    console.log("localStorage ", localStorage.getItem("token"));
    if (localStorage.getItem("token") === null) {
      alert("You have to login first!");
      navigate("/login");
    }
  }, []);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const account = async () => {
      try {
        const response = await axios.get(
          `https://shy-cloud-3319.fly.dev/api/v1/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Response data", response.data);
        setProfile(response.data.data);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    account();
  }, []);

  const submit = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            localStorage.removeItem("token");
            navigate("/");
          },
        },
        {
          label: "No",
          onClick: () => navigate("/account"),
        },
      ],
    });
  };

  return (
    <div className="pt-0 px-12 pb-12">
      <div className="m-7 text-white text-center">
        <h2 className="text-3xl font-black tracking-widest">My Account</h2>
      </div>
      <div className="flex flex-col justify-center items-center text-white ">
        <img src={NoImage} className="rounded-full w-[200px] object-cover" />
        <table className="my-5">
          <tbody className="text-xl">
            <tr>
              <td>Name </td>
              <td>:</td>
              <td>{profile?.name} </td>
            </tr>
            <tr>
              <td>Email </td>
              <td>:</td>
              <td>{profile?.email} </td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end"></div>
      </div>
      <div className="text-white flex justify-center">
        <button
          onClick={submit}
          className="p-2 bg-[#FF5BAE] w-[80px] rounded-lg mt-3 hover:bg-[#db4992]"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
