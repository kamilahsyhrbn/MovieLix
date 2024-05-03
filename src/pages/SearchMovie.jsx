import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { searchMovie } from "../redux/actions/moviesActions";
import { useDispatch, useSelector } from "react-redux";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaCircleArrowRight } from "react-icons/fa6";

export default function SearchMovie() {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const { search, isLoading, counts } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(searchMovie(query, currentPage));
  }, [currentPage, query]);

  const handleChange = (event) => {
    setQuery(event.target.value);
    setCurrentPage(1);
  };

  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage((page) => page - 1);
  };

  return (
    <div className="mb-6 text-center">
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
        <div>
          <ToastContainer />
          <h1 className="text-white font-bold text-4xl text-center mb-6">
            Search Movie
          </h1>
          <div>
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={handleChange}
              className="p-2 border outline-none focus:border-yellow-400 rounded-lg mb-4 w-72"
            />
            <div>
              <div>
                {search.length === 0 ? (
                  <p className="hidden"></p>
                ) : (
                  <div className="container m-auto flex justify-between mb-5 ">
                    <h4 className="text-white text-lg font-bold text-start ">
                      Total {query.toLocaleUpperCase()} :{" "}
                      {counts?.total_results} movies in {counts?.total_pages}{" "}
                      pages
                    </h4>
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
                            currentPage === counts
                              ? "text-[#564d4d] hover:text-[#564d4d]/50"
                              : "text-[#FF5BAE] hover:text-[#FF5BAE]/50"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="flex flex-wrap justify-center">
                {search?.length === 0 ? (
                  <p className="text-white text-xl">No movies.</p>
                ) : (
                  search?.map((movie) => (
                    <div key={movie.id}>
                      <Card movie={movie} />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
