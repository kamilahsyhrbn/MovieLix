import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import NoImage from "../assets/Default_pfp.png";

export default function Credits() {
  const API_KEY = process.env.API_KEY;
  const location = useLocation();
  const [credits, setCredits] = useState([]);

  const credit = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${location.state.movie}/credits?language=en-US&api_key=${API_KEY}`
      );
      console.log("Response credits: ", response.data);
      setCredits(response.data.cast);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    credit();
  }, []);

  return (
    <div className="mx-10 relative bottom-[200px]">
      <div className="text-white">
        <h2 className="text-3xl font-black">Cast</h2>
      </div>

      <div className="flex w-full h-[385px] overflow-x-scroll scroll scroll-smooth items-center">
        {credits?.map((movie) => (
          <div key={movie.id}>
            <div className="inline-block relative overflow-hidden m-1 min-w-[200px] h-[300px] z-0 rounded-md  w-[80px]">
              <img
                src={
                  movie?.profile_path
                    ? `https://image.tmdb.org/t/p/original${movie?.profile_path}`
                    : NoImage
                }
                alt={movie?.name}
                className="rounded-full h-[150px] w-[150px] object-cover text-white m-auto"
                style={{ objectPosition: "0 30%" }}
              />

              <div className="text-white flex flex-col items-center mt-8">
                <div className="text-lg font-bold">{movie?.name}</div>
                <div className="text-sm ">{movie?.character}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
