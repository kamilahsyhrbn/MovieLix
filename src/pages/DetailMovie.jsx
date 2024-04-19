import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Recommendations from "../components/Recommendations";
import Credits from "../components/Credits";
import { IoChevronBack } from "react-icons/io5";
import NoImage from "../assets/default_poster.jpeg";
import NoBG from "../assets/default-bg.png";

export default function DetailMovie() {
  const API_KEY = process.env.API_KEY;
  const location = useLocation();
  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("localStorage ", localStorage.getItem("token"));
    if (localStorage.getItem("token") === null) {
      navigate("/access");
    }
  }, []);

  const movieDetail = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${location.state.movie}?language=en-US&api_key=${API_KEY}`,
        { headers: { accept: "application/json" } }
      );
      // console.log("response detail: ", response.data);
      setDetail(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    movieDetail();
  }, [detail]);

  return (
    <div>
      {isLoading && (
        <div className="h-screen flex justify-center items-center">
          <div className="flex flex-row gap-2">
            <div className="w-4 h-4 rounded-full bg-[#FF5BAE] animate-bounce"></div>
            <div className="w-4 h-4 rounded-full bg-[#FF5BAE] animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-[#FF5BAE] animate-bounce [animation-delay:-.5s]"></div>
          </div>
        </div>
      )}
      {!isLoading && (
        <div key={detail?.id}>
          <Link to={-1}>
            <div className="text-white flex items-center px-10 py-5">
              <IoChevronBack className="text-2xl" />
              Go Back
            </div>
          </Link>
          <div className="w-full relative flex flex-col items-center">
            <div className="w-[80%] brightness-50 ">
              <img
                src={
                  detail?.backdrop_path
                    ? `https://image.tmdb.org/t/p/original${detail?.backdrop_path}`
                    : detail?.poster_path
                    ? `https://image.tmdb.org/t/p/original${detail?.poster_path}`
                    : NoBG
                }
                className="w-full h-[500px] object-cover "
                style={{ objectPosition: "0 35%" }}
              />
            </div>

            <div className="items-center w-[75%] flex relative bottom-[280px]">
              <div className="mr-8">
                <div className="w-[300px]">
                  <img
                    src={
                      detail?.poster_path
                        ? `https://image.tmdb.org/t/p/original${detail?.poster_path}`
                        : NoImage
                    }
                    className="rounded-lg shadow-2xl "
                  />
                </div>
              </div>
              <div className="text-white flex flex-col h-[450px]">
                <div className="my-auto">
                  <div className="font-semibold text-5xl mb-2">
                    {detail?.title}
                  </div>
                  <div className="mb-1">{detail?.tagline}</div>
                  <div className="flex items-center mb-1">
                    <FaStar className="mr-1 flex items-center text-yellow-300" />
                    {detail?.vote_average.toFixed(1)}
                    <span className="ml-3 ">({detail?.vote_count}) votes</span>
                  </div>
                  <div className="mb-1">{detail?.runtime} mins</div>
                  <div className="mb-1">Status : {detail?.status}</div>
                  <div className="mb-1">
                    Release date : {detail?.release_date}
                  </div>
                  <div className="mt-5">
                    {detail?.genres.length === 0 ? (
                      <span>Genre not found</span>
                    ) : (
                      <div>
                        {detail?.genres.map((genre) => (
                          <span
                            key={genre?.id}
                            className="mr-3 p-2 border-2 rounded-3xl"
                          >
                            {genre?.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="my-auto">
                  <h1 className="mb-5 text-2xl font-semibold flex relative items-center">
                    Synopsis
                  </h1>
                  <div>
                    {detail?.overview ? detail?.overview : "No synopsis"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Credits />
          <Recommendations />
        </div>
      )}
    </div>
  );
}
