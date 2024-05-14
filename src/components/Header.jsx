import { Link } from "react-router-dom";
import NoImage from "../assets/Default_pfp.png";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const navigate = useNavigate();
  const data = useSelector((state) => state.auth);
  const photo = data?.user?.picture?.data?.url;

  useEffect(() => {
    if (data?.isLoggedIn === false) {
      navigate("/access");
    }
  }, []);

  return (
    <div className="mx-10 my-5 bg-transparent flex justify-between ">
      <div className="mx-3">
        <Link to="/home">
          <h2 className="text-3xl font-bold text-[#FF5BAE] flex items-center max-sm:text-xl">
            Movie<span className="text-white"> Lix</span>
          </h2>
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
        <div className="transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-[#FF5BAE] ">
          <Link to="/popular-movies">Popular Movies</Link>
        </div>
        <div className="transition ease-in-out mx-4 hover:-translate-y-1 hover:scale-110 hover:text-[#FF5BAE] ">
          <Link to="/top-rated">Top Rated</Link>
        </div>
        <div className="transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-[#FF5BAE] ">
          <Link to="/upcoming">Upcoming</Link>
        </div>
        <div className="rounded-full mx-4 border p-0.5">
          <Link to="/account">
            <img
              src={photo ? photo : NoImage}
              className="w-[20px] rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
