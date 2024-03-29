import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <div className=" border-t-2  py-2 text-center text-slate-300 text-xs">
        <div className="grid grid-rows-2">
          <div className="flex flex-row justify-around my-2">
            <Link to="/home" className="hover:text-[#FF5BAE]">
              Home
            </Link>
            <Link to="/search-movies" className="hover:text-[#FF5BAE]">
              Search Movie
            </Link>
            <Link to="/now-playing" className="hover:text-[#FF5BAE]">
              Now Playing
            </Link>
            <Link to="/popular-movies" className="hover:text-[#FF5BAE]">
              Popular Movies
            </Link>
            <Link to="/top-rated" className="hover:text-[#FF5BAE]">
              Top Rated
            </Link>
            <Link to="/upcoming" className="hover:text-[#FF5BAE]">
              Upcoming
            </Link>
          </div>
          <div>&copy; Copyrigth 2024 </div>
        </div>
      </div>
    </>
  );
}
