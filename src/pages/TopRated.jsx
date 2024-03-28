import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import axios from "axios";
import { LuArrowUpDown } from "react-icons/lu";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaCircleArrowRight } from "react-icons/fa6";

export default function TopMovies() {
  const API_KEY = process.env.API_KEY;
  const [rated, setRated] = useState([]);
  const [sorted, setSorted] = useState("vote_average.desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [counts, setCounts] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const moviesPerPage = 20;

  const topRated = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=${currentPage}&sort_by=${sorted}&without_genres=99,10755&vote_count.gte=200&api_key=${API_KEY}`,
        // `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${currentPage}&api_key=${API_KEY}`,
        { header: { accept: "application/json" } }
      );
      console.log("Response topRated: ", response.data);
      setRated((previous) =>
        currentPage === 1
          ? response.data.results
          : [...previous, ...response.data.results]
      );
      setCounts({
        total_pages: response.data.total_pages,
        total_results: response.data.total_results,
      });
      setIsLoading(false);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    topRated();
  }, [currentPage, sorted]);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = rated.slice(indexOfFirstMovie, indexOfLastMovie);

  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage((page) => page - 1);
  };

  const handleSort = (event) => {
    setSorted(event.target.value);
    setCurrentPage(1);
  };

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
        <div className="pt-0 px-12 pb-12">
          <div className="m-7 mb-3 text-white text-center">
            <h2 className="text-2xl font-black tracking-widest">
              TOP RATED MOVIES
            </h2>
          </div>
          <div className="m-7 text-white justify-between flex items-center">
            <div className="flex items-center flex-row">
              <LuArrowUpDown />
              <span className="mx-1">Sort by: </span>
              <select
                value={sorted}
                onChange={handleSort}
                className="p-1 text-black rounded-lg"
              >
                <option value="vote_average.asc">Lowest Rated Movies</option>
                <option value="vote_average.desc">Top Rated Movies</option>
              </select>
            </div>
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
          </div>

          <div className="flex flex-wrap justify-center">
            {currentMovies?.map((movie) => (
              <div key={movie.id}>
                <Card movie={movie} />
              </div>
            ))}
          </div>
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
        </div>
      )}
    </div>
  );
}
