import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
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
    <div>
      <div className="h-screen brightness-50">
        <img
          src="https://user-images.githubusercontent.com/33485020/108069438-5ee79d80-7089-11eb-8264-08fdda7e0d11.jpg"
          className="m-auto w-[100%] block"
        />
      </div>
      <div className="absolute text-white left-[30%] top-[35%] text-center">
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
