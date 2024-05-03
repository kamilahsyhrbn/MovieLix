import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import axios from "axios";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaCircleArrowRight } from "react-icons/fa6";
import { nowPlaying } from "../redux/actions/moviesActions";
import { useDispatch, useSelector } from "react-redux";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function NowPlaying() {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const { playing, counts } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(nowPlaying(query, currentPage));
  }, [query, currentPage]);

  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage((page) => page - 1);
  };

  const onChangeSearch = (event) => {
    setQuery(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div>
      {playing?.isLoading && (
        <div className="h-screen flex justify-center items-center">
          <div className="flex flex-row gap-2">
            <div className="w-4 h-4 rounded-full bg-[#FF5BAE] animate-bounce"></div>
            <div className="w-4 h-4 rounded-full bg-[#FF5BAE] animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-[#FF5BAE] animate-bounce [animation-delay:-.5s]"></div>
          </div>
        </div>
      )}
      {!playing?.isLoading && (
        <div className="pt-0 px-12 pb-12">
          <div className="m-7 mb-3 text-white text-center">
            <h2 className="text-2xl font-black tracking-widest">NOW PLAYING</h2>
          </div>
          <div className="m-7 text-white justify-between flex items-center">
            <div className="flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search top rated movies"
                  value={query}
                  onChange={onChangeSearch}
                  className="p-1 border outline-none w-[300px] focus:border-[#FF5BAE] rounded-lg text-black"
                />
                <div className="absolute top-2  right-3 flex text-slate-500">
                  <FaMagnifyingGlass />
                </div>
              </div>
            </div>
            {playing.length === 0 ? (
              <p className="hidden"></p>
            ) : (
              <div className="text-white flex items-center">
                <button
                  className="text-2xl mr-2"
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                >
                  <FaCircleArrowLeft
                    className={`${
                      currentPage === 1
                        ? "text-[#564d4d] hover:text-[#564d4d]/50"
                        : "text-[#FF5BAE] hover:text-[#FF5BAE]/50"
                    }`}
                  />
                </button>
                {currentPage} of {counts?.total_pages}
                <button className="text-2xl ml-2" onClick={goToNextPage}>
                  <FaCircleArrowRight
                    className={`${
                      currentPage === counts?.total_pages
                        ? "text-[#564d4d] hover:text-[#564d4d]/50"
                        : "text-[#FF5BAE] hover:text-[#FF5BAE]/50"
                    }`}
                  />
                </button>
              </div>
            )}
          </div>
          {playing.length === 0 ? (
            <p className="text-white text-center">No movies found.</p>
          ) : (
            <div className="flex flex-wrap justify-center">
              {playing?.map((movie) => (
                <div key={movie.id}>
                  <Card movie={movie} />
                </div>
              ))}
            </div>
          )}
          {playing.length === 0 ? (
            <p className="hidden"></p>
          ) : (
            <div className="flex justify-center">
              <div className="text-white flex items-center mt-5">
                <button
                  className="text-2xl mr-2"
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                >
                  <FaCircleArrowLeft
                    className={`${
                      currentPage === 1
                        ? "text-[#564d4d] hover:text-[#564d4d]/50"
                        : "text-[#FF5BAE] hover:text-[#FF5BAE]/50"
                    }`}
                  />
                </button>
                {currentPage} of {counts?.total_pages}
                <button className="text-2xl ml-2" onClick={goToNextPage}>
                  <FaCircleArrowRight
                    className={`${
                      currentPage === counts?.total_pages
                        ? "text-[#564d4d] hover:text-[#564d4d]/50"
                        : "text-[#FF5BAE] hover:text-[#FF5BAE]/50"
                    }`}
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
