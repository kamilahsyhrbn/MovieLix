import React from "react";
import { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function Recommendations() {
  const API_KEY = process.env.API_KEY;
  const location = useLocation();
  const [recommendations, setRecommendations] = useState([]);

  const recommendationsMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${location.state.movie}/recommendations?language=en-US&page=1&api_key=${API_KEY}`
      );
      // console.log("Response recommendations: ", response.data);
      setRecommendations(response.data.results.slice(0, 10));
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    recommendationsMovies();
  }, []);

  const settings = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div>
      {recommendations?.length === 0 ? (
        <div className="mx-10 relative bottom-[100px] text-white mb-10">
          <h2 className="text-3xl font-black mb-4">RECOMMENDATIONS</h2>
          <h3>No recommendations available at the moment.</h3>
        </div>
      ) : (
        <div className="mx-10 relative bottom-[200px]">
          <div className="text-white mb-5">
            <h2 className="text-3xl font-black">RECOMMENDATIONS</h2>
          </div>

          <div className="">
            <Slider {...settings}>
              {recommendations?.map((movie) => (
                <div key={movie.id}>
                  <Card movie={movie} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
}
