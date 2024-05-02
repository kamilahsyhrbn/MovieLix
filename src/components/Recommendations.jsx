import React from "react";
import { useEffect } from "react";
import Card from "./Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { getRecommendationMovies } from "../redux/actions/moviesActions";

export default function Recommendations() {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.movie.movieId);
  const recommendation = useSelector((state) => state.movie.recommendation);
  // console.log("recommendation", recommendation);

  useEffect(() => {
    dispatch(getRecommendationMovies(id));
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
      {recommendation?.length === 0 ? (
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
              {recommendation?.map((movie) => (
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
