import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "../components/Card";
// import { FaCircleArrowLeft } from "react-icons/fa6";
// import { FaCircleArrowRight } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SearchMovie() {
  const API_KEY = process.env.API_KEY;
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [counts, setCounts] = useState({
    total_pages: 500,
    total_results: 10000,
  });
  const [isLoading, setIsLoading] = useState(true);

  const movieSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&include_adult=false&page=${currentPage}`,
        { header: { accept: "application/json" } }
      );
      console.log("Response search: ", response.data);
      if (response.data.total_results === 0) {
        notifyError();
        setMovies([]);
        setIsLoading(false);
      } else {
        setMovies((previous) =>
          currentPage === 1
            ? response.data.results
            : [...previous, ...response.data.results]
        );
        setCounts({
          total_pages: response.data.total_pages,
          total_results: response.data.total_results,
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const notifyError = () => {
    toast.error("Movies not found. Please input another title!");
  };

  useEffect(() => {
    movieSearch();
  }, [currentPage]);

  const handleChange = (event) => {
    setQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    movieSearch();
  };

  const hasNext = counts.total_pages > currentPage;

  const loadMoreItems = () => {
    if (hasNext) {
      setCurrentPage((page) => page + 1);
    }
  };

  const handleScroll = () => {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight - 1) {
      loadMoreItems();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // const indexOfLastMovie = currentPage * moviesPerPage;
  // const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  // const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  // const goToNextPage = () => {
  //   setCurrentPage((page) => page + 1);
  // };

  // const goToPrevPage = () => {
  //   setCurrentPage((page) => page - 1);
  // };

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
            <form onSubmit={handleSubmit} className="mb-4">
              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={handleChange}
                className="p-2 border outline-none focus:border-yellow-400 rounded-lg"
              />

              <button
                type="submit"
                className="bg-[#FF5BAE] text-white ml-2 transition ease-in-out p-2 rounded-lg hover:bg-[#FFC94A] hover:-translate-y-1 hover:scale-110"
              >
                Search
              </button>
            </form>
            <div>
              <div>
                {movies.length === 0 ? (
                  <p className="hidden"></p>
                ) : (
                  <div className="container m-auto flex justify-between mb-5 ">
                    <h4 className="text-white text-lg font-bold text-start ">
                      Total {query.toLocaleUpperCase()} :{" "}
                      {counts?.total_results} movies in {counts?.total_pages}{" "}
                      pages
                    </h4>
                    {/* <div className="text-white flex items-center">
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
                    </div> */}
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="flex flex-wrap justify-center">
                {movies?.length === 0 ? (
                  <p className="text-white text-xl">No movies.</p>
                ) : (
                  movies?.map((movie) => (
                    <div key={movie.id}>
                      <Card movie={movie} />
                    </div>
                  ))
                )}
              </div>
              <div className="flex justify-center mt-3">
                {hasNext && movies?.length !== 0 ? (
                  <button
                    className="p-2 text-white bg-[#FF5BAE] rounded-full"
                    onClick={loadMoreItems}
                    disabled={isLoading}
                  >
                    Load More
                  </button>
                ) : (
                  <div className="hidden">
                    {/* Showing {counts.total_results} of {counts.total_results}{" "}
                      Movies */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
