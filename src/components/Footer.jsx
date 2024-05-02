import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <div className=" border-t-2 py-2 text-center text-slate-300 text-xs">
        <div className="grid grid-rows-2">
          {/* <div className="flex flex-row justify-evenly my-2">
            <Link to="/home" className="hover:text-[#FF5BAE]">
              YA ALLAH
            </Link>
            <Link to="/search-movies" className="hover:text-[#FF5BAE]">
              AKU
            </Link>
            <Link to="/now-playing" className="hover:text-[#FF5BAE]">
              CAPEK
            </Link>
            <Link to="/popular-movies" className="hover:text-[#FF5BAE]">
              KENA
            </Link>
            <Link to="/top-rated" className="hover:text-[#FF5BAE]">
              BUG
            </Link>
            <Link to="/upcoming" className="hover:text-[#FF5BAE]">
              MULU
            </Link>
          </div> */}
          <div>Copyrigth&copy; MovieLix 2024 </div>
        </div>
      </div>
    </>
  );
}
