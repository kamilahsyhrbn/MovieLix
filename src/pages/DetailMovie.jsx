import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Recommendations from "../components/Recommendations";
import Credits from "../components/Credits";
import { IoChevronBack } from "react-icons/io5";
import NoImage from "../assets/default_poster.jpeg";
import NoBG from "../assets/default-bg.png";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetailMovie,
  getTrailerMovies,
} from "../redux/actions/moviesActions";
import { IoPlayCircle } from "react-icons/io5";

export default function DetailMovie() {
  const dispatch = useDispatch();

  const id = useSelector((state) => state.movie.movieId);
  // console.log("id", id);
  const detailMovie = useSelector((state) => state.movie.detailMovie);
  // console.log("detail", detailMovie);

  const { video } = useSelector((state) => state.movie);
  // console.log("video", video);

  useEffect(() => {
    dispatch(getDetailMovie(id));
    dispatch(getTrailerMovies(id));
  }, [dispatch, id]);

  const Trailer = () => {
    window.open(`https://www.youtube.com/watch?v=${video?.key}`, "_blank");
  };

  return (
    <div>
      {detailMovie?.isLoading && (
        <div className="h-screen flex justify-center items-center">
          <div className="flex flex-row gap-2">
            <div className="w-4 h-4 rounded-full bg-[#FF5BAE] animate-bounce"></div>
            <div className="w-4 h-4 rounded-full bg-[#FF5BAE] animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-[#FF5BAE] animate-bounce [animation-delay:-.5s]"></div>
          </div>
        </div>
      )}
      {!detailMovie?.isLoading && (
        <div key={detailMovie?.id}>
          <Link to={-1}>
            <div className="text-white flex items-center px-10 py-5">
              <IoChevronBack className="text-2xl" />
              Go Back
            </div>
          </Link>
          <div className="w-full relative flex flex-col items-center">
            <div className="w-[80%] brightness-50 ">
              <img
                src={
                  detailMovie?.backdrop_path
                    ? `https://image.tmdb.org/t/p/original${detailMovie?.backdrop_path}`
                    : detailMovie?.poster_path
                    ? `https://image.tmdb.org/t/p/original${detailMovie?.poster_path}`
                    : NoBG
                }
                className="w-full h-[500px] object-cover "
                style={{ objectPosition: "0 35%" }}
              />
            </div>

            <div className="items-center w-[75%] flex relative bottom-[280px]">
              <div className="mr-8">
                <div className="w-[300px]">
                  <img
                    src={
                      detailMovie?.poster_path
                        ? `https://image.tmdb.org/t/p/original${detailMovie?.poster_path}`
                        : NoImage
                    }
                    className="rounded-lg shadow-2xl "
                  />
                </div>
                {video?.key ? (
                  <div className="bg-[#FF5BAE] hover:bg-[#db4992] text-white my-4 flex items-center justify-center p-2 rounded-full text-xl w-52 mx-auto">
                    <button onClick={Trailer}>Watch Trailer</button>
                    <IoPlayCircle className="ml-2 text-3xl" />
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="text-white flex flex-col h-[480px]">
                <div className="mb-auto">
                  <div className="font-semibold text-5xl mb-2">
                    {detailMovie?.title}
                  </div>
                  <div className="mb-1">{detailMovie?.tagline}</div>
                  <div className="flex items-center mb-1">
                    <FaStar className="mr-1 flex items-center text-yellow-300" />
                    {detailMovie?.vote_average.toFixed(1)}
                    <span className="ml-3 ">
                      ({detailMovie?.vote_count}) votes
                    </span>
                  </div>
                  <div className="mb-1">{detailMovie?.runtime} mins</div>
                  <div className="mb-1">Status : {detailMovie?.status}</div>
                  <div className="mb-1">
                    Release date : {detailMovie?.release_date}
                  </div>
                  <div className="mt-5">
                    {detailMovie?.genres.length === 0 ? (
                      <span>Genre not found</span>
                    ) : (
                      <div>
                        {detailMovie?.genres.map((genre) => (
                          <span
                            key={genre?.id}
                            className="mr-3 p-2 border-2 rounded-3xl"
                          >
                            {genre?.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mb-auto">
                  <h1 className="mb-5 text-2xl font-semibold flex relative items-center">
                    Synopsis
                  </h1>
                  <div>
                    {detailMovie?.overview
                      ? detailMovie?.overview
                      : "No synopsis"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Credits />
          <Recommendations />
        </div>
      )}
    </div>
  );
}
