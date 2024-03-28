import React from "react";
import { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function MovieList() {
  const [MovieList, setMovieList] = useState([]);
  const [rated, setRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const API_KEY = process.env.API_KEY;

  const getMovies = async () => {
    try {
      const response = await axios.get(
        ` https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=1&api_key=${API_KEY}`,
        { header: { accept: "application/json" } }
      );
      // console.log("response movie: ", response.data);
      setMovieList(response.data.results.slice(0, 10));
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const topRated = async () => {
    try {
      const response = await axios.get(
        // `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${selectPage}&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200&api_key=${API_KEY}}`,
        `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${API_KEY}`,
        { header: { accept: "application/json" } }
      );
      // console.log("Response topRated: ", response.data);
      setRated(response.data.results.slice(0, 10));
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    topRated();
  }, []);

  const upcomingMovie = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&&with_release_type=1|2|3&release_date.gte=2026-01-01&release_date.lte=2070-01-01&api_key=${API_KEY}&page=1`,
        { header: { accept: "application/json" } }
      );
      // console.log("Response upcomingMovie: ", response.data);
      setUpcoming(response.data.results.slice(0, 10));
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    upcomingMovie();
  }, []);

  const settings = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <>
      <div className="pt-0 px-12 pb-12">
        <div className="slider-container">
          <div className="m-7 mb-5 ml-3 text-white flex justify-between items-center">
            <h2 className="text-2xl font-black tracking-widest">
              POPULAR MOVIES
            </h2>
            <Link to="/popular-movies">
              <span className="text-yellow-300">View all</span>
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
          <div className="mx-7 my-5 ml-3 text-white flex justify-between items-center">
            <h2 className="text-2xl font-black tracking-widest">
              TOP RATED MOVIES
            </h2>
            <Link to="/top-rated">
              <span className="text-yellow-300">View all</span>
            </Link>
          </div>
          <div>
            <Slider {...settings}>
              {rated?.map((movie) => (
                <div key={movie.id}>
                  <Card movie={movie} />
                </div>
              ))}
            </Slider>
          </div>
          <div className="mx-7 my-5 ml-3 text-white flex justify-between items-center">
            <h2 className="text-2xl font-black tracking-widest">
              UPCOMING MOVIES
            </h2>
            <Link to="/upcoming">
              <span className="text-yellow-300">View all</span>
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
        </div>
      </div>
    </>
  );
}
