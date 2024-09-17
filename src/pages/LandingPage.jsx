import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import background from "../assets/landing.jpg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCarousel } from "../redux/actions/moviesActions.js";

export default function LandingPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCarousel());
  }, [dispatch, navigate]);

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(33,33,33,0.522), rgba(33,33,33,0.522)), url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-full h-full"
    >
      <div className="flex flex-col justify-center items-center text-white text-center h-screen">
        <h1 className="font-black text-5xl">WELCOME TO MOVIELIX</h1>
        <h2 className="font-bold text-[#FF5BAE]">
          Discover a World of Unlimited Entertainment!
        </h2>
        <Link to="/login">
          <button className="bg-[#FF5BAE] p-3 text-xl mt-4 rounded-full text-black font-semibold hover:bg-[#db4992] hover:text-white">
            GET STARTED
          </button>
        </Link>
      </div>
    </div>
  );
}
