import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import MovieList from "../components/MovieList.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const API_KEY = process.env.API_KEY;
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  console.log("location ", localStorage.getItem("token"));

  useEffect(() => {
    console.log("localStorage ", localStorage.getItem("token"));
    if (localStorage.getItem("token") === null) {
      alert("You have to login first!");
      navigate("/login");
    }
  }, []);

  const carousel = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=4&api_key=${API_KEY}`,
        { header: { accept: "application/json" } }
      );
      console.log("Response data: ", response.data);
      setPopularMovies(response.data.results);
      setIsLoading(false);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  // console.log("popular", popularMovies);

  useEffect(() => {
    carousel();
  }, []);

  return (
    <>
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
          <div>
            <ToastContainer />
            <Carousel
              autoPlay={true}
              infiniteLoop={true}
              showArrows={false}
              transitionTime={4}
              showStatus={false}
              showIndicators={false}
              showThumbs={false}
            >
              {popularMovies?.map((movie) => (
                <div key={movie.id}>
                  <Link to="/detail-movies" state={{ movie: movie.id }}>
                    <div className="h-[600px]">
                      <img
                        src={`https://image.tmdb.org/t/p/original${
                          movie && movie.backdrop_path
                        }`}
                        className="m-auto w-[100%] block"
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
                  </Link>
                </div>
              ))}
            </Carousel>
            <MovieList />
          </div>
        )}
      </div>
    </>
  );
}
