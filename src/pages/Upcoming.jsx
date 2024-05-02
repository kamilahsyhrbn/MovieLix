import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { LuArrowUpDown } from "react-icons/lu";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaCircleArrowRight } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { upcomingMovies } from "../redux/actions/moviesActions";

export default function UpComing() {
  const [sorted, setSorted] = useState("primary_release_date.desc");
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const { upcoming } = useSelector((state) => state.movie);
  // console.log("upcoming", upcoming);
  const { isLoading } = useSelector((state) => state.movie);
  const { counts } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(upcomingMovies(currentPage, sorted));
  }, [currentPage, sorted]);

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
            {upcoming?.map((movie) => (
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
