import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import Modal from "react-modal";
import { useSelector } from "react-redux";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
    if (!email) {
      setErrorMessage("Please enter your email!");
      return;
    }

    if (email.endsWith("@gmail.com") || email.endsWith("@yahoo.com")) {
      setErrorMessage("");
    } else {
      setErrorMessage("Email is not valid.");
      setModalIsOpen(false);
      return;
    }

    try {
      const response = await axios.post(
        `https://shy-cloud-3319.fly.dev/api/v1/auth/login`,
        {
          email: email,
          password: "password",
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // console.log("Response Login", response?.data);
    } catch (error) {
      console.log("Error: ", error);
      const message = error?.response?.data?.message;
      setErrorMessage(`${message}.`);
      setModalIsOpen(false);
      if (message === "Wrong password") {
        setErrorMessage("");
        setModalIsOpen(true);
      } else if (message === "User is not found") {
        setModalIsOpen(false);
      }
    }
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      maxWidth: "450px",
      width: "50%",
    },
  };

  Modal.setAppElement("#root");

  function openModal() {
    setModalIsOpen();
  }

  function closeModal() {
    navigate("/login");
  }

  return (
    <div>
      {showPopup && (
        <div className="bg-[#FF5BAE] text-white rounded-sm text-xl p-3 text-center">
          <p>You can't access this page, because your token is still active.</p>
        </div>
      )}
      <div className="flex items-center justify-center px-4 py-10 ">
        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
              {isUserLoggedIn ? (
                <div className="flex items-center">
                  <IoChevronBack className="text-2xl" />
                  Go Back
                </div>
              ) : (
                <Link to="/login">
                  <div className="flex items-center">
                    <IoChevronBack className="text-2xl" />
                    Go Back
                  </div>
                </Link>
              )}
              <div className="max-w-lg mx-auto">
                <div className="flex items-center space-x-5 justify-center">
                  <h2 className="text-center text-2xl mt-2 font-bold leading-tight text-black">
                    Trouble with logging in?
                  </h2>
                </div>
                <div className="text-center mt-2 text-sm leading-tight text-gray-600">
                  <p>
                    Enter your email address and we'll send you a link to get
                    back into your account.
                  </p>
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
                </div>
                {errorMessage && (
                  <p className="text-sm text-red-600 mb-2">{errorMessage}</p>
                )}
                <div className="mt-2">
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
                      onClick={openModal}
                    >
                      Send Login Link
                    </button>
                  )}
                  <Modal
                    isOpen={modalIsOpen}
                    style={customStyles}
                    onRequestClose={closeModal}
                  >
                    <div className="text-lg text-center leading-6 font-medium">
                      Email sent
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        We have sent an email to
                        <strong> {email}</strong> with a link to get back into
                        your account.
                      </p>
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={closeModal}
                        className="px-4 py-2 bg-[#FF5BAE] hover:bg-[#db4992] text-white rounded mt-4"
                      >
                        Close
                      </button>
                    </div>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
