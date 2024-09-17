import React from "react";
import { FaStar } from "react-icons/fa";
import NoImage from "../assets/default_poster.jpeg";
import { useNavigate } from "react-router-dom";

export default function Card({ movie }) {
  const navigate = useNavigate();

  const handleMovieClick = (id) => {
    navigate(`/detail-movies/${id}`);
  };

  return (
    <>
      <div
        onClick={() => {
          handleMovieClick(movie.id);
        }}
      >
        <div className="inline-block transition-transform relative overflow-hidden m-1 min-w-[200px] h-[300px] z-0 shadow-xl rounded-md hover:scale-110 hover:z-[1000] ">
          <img
            src={
              movie?.poster_path
                ? `https://image.tmdb.org/t/p/original${movie?.poster_path}`
                : NoImage
            }
            className="h-[300px] text-white"
            alt={movie?.title}
          />
          <div className="text-white absolute bottom-0 h-[290px] min-w-[200px] flex flex-col pt-0 pb-4 px-4 justify-end bg-gradient-to-b from-transparent to-black transition-opacity duration-200 opacity-0 hover:opacity-100">
            <div className="font-black text-base">{movie?.title}</div>
            <div className="flex justify-between items-center text-xs mb-1">
              {new Date(movie?.release_date).toLocaleString("en-EN", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
              <span className="mt-1 flex items-center">
                <FaStar className="mr-1 text-yellow-300" />
                {parseFloat(movie?.vote_average).toFixed(1)}
              </span>
            </div>
            <div className="italic text-xs mb-1">
              {movie?.overview.slice(0, 118) + "..."}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
