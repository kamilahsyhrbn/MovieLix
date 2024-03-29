import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import axios from "axios";
import { LuArrowUpDown } from "react-icons/lu";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaCircleArrowRight } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpComing() {
  const API_KEY = process.env.API_KEY;
  const [upcoming, setUpcoming] = useState([]);
  const [sorted, setSorted] = useState("primary_release_date.desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [counts, setCounts] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const moviesPerPage = 20;

  const upcomingMovie = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${currentPage}&sort_by=${sorted}&with_release_type=1|2|3&release_date.gte=2024-12-01&release_date.lte=2070-12-01&api_key=${API_KEY}`,
        { header: { accept: "application/json" } }
      );
      console.log("Response upcomingMovie: ", response.data);
      setUpcoming((previous) =>
        currentPage === 1
          ? response.data.results
          : [...previous, ...response.data.results]
      );
      setCounts({
        total_pages: response.data.total_pages,
      });
      setIsLoading(false);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    upcomingMovie();
  }, [currentPage, sorted]);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = upcoming.slice(indexOfFirstMovie, indexOfLastMovie);

  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage((page) => page - 1);
  };

  const handleSort = (event) => {
    notifySuccess();
    setSorted(event.target.value);
    setCurrentPage(1);
  };

  const notifySuccess = () => {
    if (sorted === "title.asc") {
      toast.success(`Successfully sort by title descending!`);
    }
    if (sorted === "title.desc") {
      toast.success(`Successfully sort by title ascending!`);
    }
    if (sorted === "primary_release_date.asc") {
      toast.success(`Successfully sort by year descending!`);
    }
    if (sorted === "primary_release_date.desc") {
      toast.success(`Successfully sort by year ascending!`);
    }
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
          <ToastContainer />
          <div className="m-7 mb-3 text-white text-center">
            <h2 className="text-2xl font-black tracking-widest">
              UPCOMING MOVIES
            </h2>
          </div>
          <div className="m-7 text-white justify-between flex">
            <div className="flex items-center flex-row">
              <LuArrowUpDown />
              <span className="mx-1">Sort by: </span>
              <select
                value={sorted}
                onChange={handleSort}
                className="p-1 text-black rounded-lg"
              >
                <option value="primary_release_date.asc">Year Ascending</option>
                <option value="primary_release_date.desc">
                  Year Descending
                </option>
                <option value="title.asc">Title Ascending</option>
                <option value="title.desc">Title Descending</option>
              </select>
            </div>
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
