import React, { useState, useEffect } from "react";
import axios from "axios";
import NoImage from "../assets/Default_pfp.png";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Account() {
  const [profile, setProfile] = useState("");
  const navigate = useNavigate();
  const [googleAcc, setGoogleAcc] = useState("");
  // console.log("location ", localStorage.getItem("token"));

  useEffect(() => {
    // console.log("localStorage ", localStorage.getItem("token"));
    if (localStorage.getItem("token") === null) {
      navigate("/access");
    }
  }, []);

  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const photo = localStorage.getItem("photo");

  useEffect(() => {
    const account = async () => {
      if (localStorage.getItem("login") === "google component") {
        const decoded = jwtDecode(localStorage.getItem("token"));
        console.log("decodedd", decoded);
        setGoogleAcc(decoded);
        if (decoded?.exp < new Date() / 1000) {
          navigate("/access");
          localStorage.removeItem("token");
        }
      } else if (localStorage.getItem("login") === null) {
        try {
          const response = await axios.get(
            `https://shy-cloud-3319.fly.dev/api/v1/auth/me`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // console.log("Response data", response.data);
          setProfile(response.data.data);
        } catch (error) {
          console.log("Error: ", error);
        }
      }
    };
    account();
  }, []);

  const logout = () => {
    confirmAlert({
      message: "Are you sure you want to log out?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            localStorage.removeItem("token");
            localStorage.removeItem("name");
            localStorage.removeItem("email");
            localStorage.removeItem("photo");
            localStorage.removeItem("login");
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
        <img
          src={
            photo ? photo : googleAcc?.picture ? googleAcc?.picture : NoImage
          }
          className="rounded-full w-[200px] object-cover"
        />
        <table className="my-5">
          <tbody className="text-xl">
            {profile?.name ? (
              <>
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
              </>
            ) : name ? (
              <>
                <tr>
                  {/* <td>Sorry, we didn't get your account details 🙇‍♀️</td> */}
                  <td>Name </td>
                  <td>:</td>
                  <td>{name} </td>
                </tr>
                <tr>
                  <td>Email </td>
                  <td>:</td>
                  <td>{email} </td>
                </tr>
              </>
            ) : (
              <>
                <tr>
                  {/* <td>Sorry, we didn't get your account details 🙇‍♀️</td> */}
                  <td>Name </td>
                  <td>:</td>
                  <td>{googleAcc?.name} </td>
                </tr>
                <tr>
                  <td>Email </td>
                  <td>:</td>
                  <td>{googleAcc?.email} </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
        <div className="flex justify-end"></div>
      </div>
      <div className="text-white flex justify-center">
        <button
          onClick={logout}
          className="p-2 bg-[#FF5BAE] w-[80px] rounded-lg mt-3 hover:bg-[#db4992]"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
