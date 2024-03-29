import React from "react";
import { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function MovieList() {
  const [MovieList, setMovieList] = useState([]);
  const [rated, setRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [playing, setPlaying] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const API_KEY = process.env.API_KEY;

  //POPULAR MOVIES
  const getMovies = async () => {
    try {
      const response = await axios.get(
        ` https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=1&api_key=${API_KEY}`,
        { header: { accept: "application/json" } }
      );
      // console.log("response movie: ", response.data);
      setMovieList(response.data.results.slice(0, 10));
      setIsLoading(false);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  //TOP RATED MOVIES
  const topRated = async () => {
    try {
      const response = await axios.get(
        // `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${selectPage}&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200&api_key=${API_KEY}}`,
        `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${API_KEY}`,
        { header: { accept: "application/json" } }
      );
      // console.log("Response topRated: ", response.data);
      setRated(response.data.results);
      setIsLoading(false);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    topRated();
  }, []);

  //UPCOMING MOVIES
  const upcomingMovie = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&&with_release_type=1|2|3&release_date.gte=2026-01-01&release_date.lte=2070-01-01&api_key=${API_KEY}&page=1`,
        { header: { accept: "application/json" } }
      );
      // console.log("Response upcomingMovie: ", response.data);
      setUpcoming(response.data.results.slice(0, 10));
      setIsLoading(false);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    upcomingMovie();
  }, []);

  //NOW PLAYING MOVIES
  const nowPlaying = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=1|2|3|4&release_date.gte=2024-01-01&release_date.lte=2025-01-01&api_key=${API_KEY}`,
        { header: { accept: "application/json" } }
      );
      console.log("Response Now Playing: ", response.data);
      setPlaying(response.data.results);
      setIsLoading(false);
    } catch (error) {
      console.log("Error ", error);
    }
  };

  useEffect(() => {
    nowPlaying();
  }, []);

  const settings = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const settings2 = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    centerMode: true,
    centerPadding: "0",
    arrows: false,
    fade: true,
  };

  return (
    <>
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
          <div className="slider-container">
            <div className="m-7 mb-5 ml-3 text-white flex justify-between items-center">
              <h2 className="text-2xl font-black tracking-widest">
                POPULAR MOVIES
              </h2>
              <Link to="/popular-movies">
                <span className="text-yellow-300 flex items-center">
                  View all <FaArrowRightLong className="text-yellow-300 ml-1" />
                </span>
              </Link>
            </div>
            <div className=" ">
              <Slider {...settings}>
                {MovieList?.map((movie) => (
                  <div key={movie.id}>
                    <Card movie={movie} />
                  </div>
                ))}
              </Slider>
            </div>

            <div className="grid grid-cols-2 my-7">
              <div className="text-white">
                <h1 className="text-3xl font-black tracking-widest mb-3">
                  NOW PLAYING
                </h1>
                <div className="flex flex-col items-start">
                  <span className="mb-3">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Excepturi itaque recusandae expedita assumenda nesciunt eum
                    quas, cupiditate nisi dignissimos deleniti consectetur!
                    Exercitationem, nisi? Ipsum illo est a deserunt fuga
                    molestias?
                  </span>
                  <Link to="/now-playing">
                    <button className="p-2 rounded-xl bg-[#FF5BAE] hover:bg-[#FFC94A]">
                      See More
                    </button>
                  </Link>
                </div>
              </div>
              <div>
                <Slider {...settings2}>
                  {playing?.map((movie) => (
                    <div key={movie.id}>
                      <Link to="/detail-movies" state={{ movie: movie.id }}>
                        <div className="inline-block transition-transform relative m-1 min-w-[200px] rounded-xl h-[300px] z-0 shadow-xl hover:z-[1000] ">
                          <img
                            src={
                              movie?.backdrop_path
                                ? `https://image.tmdb.org/t/p/original${movie?.backdrop_path}`
                                : NoImage
                            }
                            className="h-[300px] text-white rounded-xl"
                            alt={movie?.title}
                          />
                          <div className="text-white absolute bottom-0 h-[290px] min-w-[200px] flex flex-col pt-0 pb-4 px-4 justify-end bg-gradient-to-b from-transparent to-black transition-opacity duration-200 rounded-xl">
                            <div className="font-black text-base">
                              {movie?.title}
                            </div>
                            <div className="flex justify-between items-center text-xs mb-1">
                              {movie?.release_date}
                              <span className="mt-1 flex items-center">
                                <FaStar className="mr-1 text-yellow-300" />
                                {movie?.vote_average.toFixed(1)}
                              </span>
                            </div>
                            <div className="italic text-xs mb-1">
                              {movie?.overview.slice(0, 118) + "..."}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>

            <div className="mx-7 my-5 ml-3 text-white flex justify-between items-center">
              <h2 className="text-2xl font-black tracking-widest">
                UPCOMING MOVIES
              </h2>
              <Link to="/upcoming">
                <span className="text-yellow-300 flex items-center">
                  View all <FaArrowRightLong className="text-yellow-300 ml-1" />
                </span>
              </Link>
            </div>
            <div>
              <Slider {...settings}>
                {upcoming?.map((movie) => (
                  <div key={movie.id}>
                    <Card movie={movie} />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="grid grid-cols-2 my-7">
              <div>
                <Slider {...settings2}>
                  {rated?.map((movie) => (
                    <div key={movie.id}>
                      <Link to="/detail-movies" state={{ movie: movie.id }}>
                        <div className="inline-block transition-transform relative m-1 min-w-[200px] rounded-xl h-[300px] z-0 shadow-xl hover:z-[1000] ">
                          <img
                            src={
                              movie?.backdrop_path
                                ? `https://image.tmdb.org/t/p/original${movie?.backdrop_path}`
                                : NoImage
                            }
                            className="h-[300px] text-white rounded-xl"
                            alt={movie?.title}
                          />
                          <div className="text-white absolute bottom-0 h-[290px] min-w-[200px] flex flex-col pt-0 pb-4 px-4 justify-end bg-gradient-to-b from-transparent to-black transition-opacity duration-200 rounded-xl">
                            <div className="font-black text-base">
                              {movie?.title}
                            </div>
                            <div className="flex justify-between items-center text-xs mb-1">
                              {movie?.release_date}
                              <span className="mt-1 flex items-center">
                                <FaStar className="mr-1 text-yellow-300" />
                                {movie?.vote_average.toFixed(1)}
                              </span>
                            </div>
                            <div className="italic text-xs mb-1">
                              {movie?.overview.slice(0, 118) + "..."}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="text-white flex flex-col items-end">
                <h1 className="text-3xl font-black tracking-widest mb-3">
                  TOP RATED MOVIES
                </h1>

                <span className="mb-3 text-end">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Excepturi itaque recusandae expedita assumenda nesciunt eum
                  quas, cupiditate nisi dignissimos deleniti consectetur!
                  Exercitationem, nisi? Ipsum illo est a deserunt fuga
                  molestias?
                </span>
                <Link to="/top-rated">
                  <button className="p-2 rounded-xl bg-[#FF5BAE] hover:bg-[#FFC94A]">
                    See More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
