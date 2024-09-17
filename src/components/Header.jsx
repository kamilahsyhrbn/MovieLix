import { Link } from "react-router-dom";
import NoImage from "../assets/Default_pfp.png";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CgMenuGridO } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";

export default function Header() {
  const navigate = useNavigate();
  const data = useSelector((state) => state.auth);
  const photo = data?.user?.picture?.data?.url;

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (data?.isLoggedIn === false) {
      navigate("/access");
    }
  }, []);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="mx-10 my-5 bg-transparent flex justify-between ">
      <div className="mx-3">
        <Link to="/home">
          <h2 className="text-3xl font-bold text-[#FF5BAE] flex items-center max-sm:text-xl">
            Movie<span className="text-white"> Lix</span>
          </h2>
        </Link>
      </div>

      <div>
        {/* MOBILE AND TABLET MENU */}
        <div
          onClick={handleMenuClick}
          className="lg:hidden transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
        >
          <CgMenuGridO className="text-3xl text-white hover:text-[#FF5BAE]" />
        </div>

        <div>
          <div
            className={`bg-[#1c1b06] w-64 h-screen fixed top-0 right-0 z-10 transition-all duration-300 ${
              menuOpen ? "" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col items-center h-full py-5">
              <div className="flex flex-col items-center">
                <img
                  src={photo ? photo : NoImage}
                  className="w-20 h-20 rounded-full my-4"
                  alt="profile"
                />
                <Link to="/home">
                  <h2 className="text-2xl font-bold text-white">Movie Lix</h2>
                </Link>
              </div>
              <div className="flex flex-col space-y-4 mt-10">
                <Link to="/home" className="text-white hover:text-[#FF5BAE]">
                  Home
                </Link>
                <Link
                  to="/search-movies"
                  className="text-white hover:text-[#FF5BAE]"
                >
                  Search Movies
                </Link>
                <Link
                  to="/now-playing"
                  className="text-white hover:text-[#FF5BAE]"
                >
                  Now Playing
                </Link>
                <Link
                  to="/popular-movies"
                  className="text-white hover:text-[#FF5BAE]"
                >
                  Popular Movies
                </Link>
                <Link
                  to="/top-rated"
                  className="text-white hover:text-[#FF5BAE]"
                >
                  Top Rated
                </Link>
                <Link
                  to="/upcoming"
                  className="text-white hover:text-[#FF5BAE]"
                >
                  Upcoming
                </Link>
                <Link to="/account" className="text-white hover:text-[#FF5BAE]">
                  Profile
                </Link>
              </div>
              <div className="absolute top-10 right-5">
                <button
                  onClick={handleMenuClick}
                  className="bg-transparent hover:bg-[#FF5BAE] rounded-full p-2 transition-all duration-300"
                >
                  <IoMdClose className="text-2xl text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP MENU */}
      <div className="items-center text-white hidden lg:flex">
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
