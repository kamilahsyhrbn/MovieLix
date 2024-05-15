import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NoBG from "../assets/default-bg.png";
import { Carousel } from "react-responsive-carousel";
import { FaStar } from "react-icons/fa";
import MovieList from "../components/MovieList.jsx";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCarousel } from "../redux/actions/moviesActions.js";
import { setMovieId } from "../redux/reducers/moviesReducers.js";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { carousel } = useSelector((state) => state.movie);

  const handleMovieClick = (id) => {
    navigate(`/detail-movies/${id}`);
  };

  useEffect(() => {
    dispatch(getCarousel());
  }, [dispatch, navigate]);

  return (
    <>
      <div>
        {carousel?.isLoading && (
          <div className="h-screen flex justify-center items-center">
            <div className="flex flex-row gap-2">
              <div className="w-4 h-4 rounded-full bg-[#FF5BAE] animate-bounce"></div>
              <div className="w-4 h-4 rounded-full bg-[#FF5BAE] animate-bounce [animation-delay:-.3s]"></div>
              <div className="w-4 h-4 rounded-full bg-[#FF5BAE] animate-bounce [animation-delay:-.5s]"></div>
            </div>
          </div>
        )}
        {!carousel?.isLoading && (
          <div>
            <div className="max-sm:hidden">
              <Carousel
                autoPlay={true}
                infiniteLoop={true}
                showArrows={false}
                transitionTime={4}
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                stopOnHover={false}
              >
                {carousel?.map((movie) => (
                  <div
                    key={movie.id}
                    onClick={() => {
                      handleMovieClick(movie.id);
                    }}
                  >
                    <div className="h-[600px]">
                      <img
                        src={
                          movie.backdrop_path
                            ? `https://image.tmdb.org/t/p/original${
                                movie && movie.backdrop_path
                              }`
                            : movie?.poster_path
                            ? `https://image.tmdb.org/t/p/original${
                                movie && movie.poster_path
                              }`
                            : NoBG
                        }
                        className="m-auto w-[100%] block max-md:h-[100%]"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-70 flex flex-col justify-end items-start p-20 bg-gradient-to-b from-transparent to-black transition-opacity text-white ">
                      <div className="font-black text-6xl">{movie?.title}</div>
                      <div className="text-xl my-1">{movie?.release_date}</div>
                      <div className="flex items-center">
                        <FaStar className="text-yellow-300 mr-1" />
                        {movie?.vote_average.toFixed(1)}
                      </div>
                      <div className="flex text-left italic text-sm mt-1">
                        {movie?.overview}
                      </div>
                    </div>
                    {/* </Link> */}
                  </div>
                ))}
              </Carousel>
            </div>
            <MovieList />
          </div>
        )}
      </div>
    </>
  );
}
