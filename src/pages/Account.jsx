import React, { useEffect } from "react";
import NoImage from "../assets/Default_pfp.png";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, logout } from "../redux/actions/authActions";

export default function Account() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  // console.log("user", user);
  const photo = user?.picture?.data?.url;

  useEffect(() => {
    const account = async () => {
      dispatch(getProfile());
    };
    account();
  }, []);

  const keluar = () => {
    confirmAlert({
      message: "Are you sure you want to log out?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(logout(navigate));
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
        {!photo ? (
          <img src={NoImage} className="rounded-full w-[200px]" />
        ) : (
          <img src={photo} className="rounded-full w-[200px]" />
        )}
        <table className="my-5">
          <tbody className="text-xl">
            {user?.name ? (
              <>
                <tr>
                  <td>Name </td>
                  <td>:</td>
                  <td>{user?.name} </td>
                </tr>
                <tr>
                  <td>Email </td>
                  <td>:</td>
                  <td>{user?.email} </td>
                </tr>
              </>
            ) : (
              <>
                <tr>
                  <td>Sorry, we didn't get your account details 🙇‍♀️</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
        <div className="flex justify-end"></div>
      </div>
      <div className="text-white flex justify-center">
        <button
          onClick={keluar}
          className="p-2 bg-[#FF5BAE] w-[80px] rounded-lg mt-3 hover:bg-[#db4992]"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
