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
  const { carousel } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(getCarousel());
  }, [dispatch, navigate]);

  return (
    <div>
      {carousel?.isLoading && (
        <div className="h-screen flex justify-center items-center">
          <div className="flex flex-row gap-2">
            <div className="w-4 h-4 rounded-full bg-[#FF5BAE] animate-bounce"></div>
            <div className="w-4 h-4 rounded-full bg-[#FF5BAE] animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-[#FF5BAE] animate-bounce [animation-delay:-.5s]"></div>
          </div>
        </div>
      )}
      {!carousel?.isLoading && (
        <div>
          <Carousel
            autoPlay={true}
            infiniteLoop={true}
            showArrows={false}
            transitionTime={5}
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            stopOnHover={false}
          >
            {carousel?.map((movie) => (
              <div key={movie.id}>
                <div className="h-screen brightness-50">
                  <img
                    src={`https://image.tmdb.org/t/p/original${
                      movie && movie.backdrop_path
                    }`}
                    className="m-auto w-[100%] block"
                  />
                </div>
                <div className="absolute text-white left-[30%] top-[40%] ">
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
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
}
