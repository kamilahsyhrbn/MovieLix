import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="mx-10 my-5 bg-transparent flex justify-between ">
      <div className="mx-3">
        <Link to="/">
          <h3 className="text-3xl font-bold text-[#FF5BAE] flex items-center">
            Movie<span className="text-white"> Lix</span>
          </h3>
        </Link>
      </div>
      <div className="flex items-center text-white">
        <div className="transition ease-in-out mx-4 hover:-translate-y-1 hover:scale-110 hover:text-[#FF5BAE] ">
          <Link to="/home">Home</Link>
        </div>
        <div className="transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-[#FF5BAE] ">
          <Link to="/search-movies">Search Movies</Link>
        </div>
        <div className="transition ease-in-out mx-4 hover:-translate-y-1 hover:scale-110 hover:text-[#FF5BAE] ">
          <Link to="/now-playing">Now Playing</Link>
        </div>
        <div className="transition ease-in-out mr-4 hover:-translate-y-1 hover:scale-110 hover:text-[#FF5BAE] ">
          <Link to="/popular-movies">Popular Movies</Link>
        </div>
        <div className="transition ease-in-out mr-4 hover:-translate-y-1 hover:scale-110 hover:text-[#FF5BAE] ">
          <Link to="/top-rated">Top Rated</Link>
        </div>
        <div className="transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-[#FF5BAE] ">
          <Link to="/upcoming">Upcoming</Link>
        </div>
      </div>
    </div>
  );
}
