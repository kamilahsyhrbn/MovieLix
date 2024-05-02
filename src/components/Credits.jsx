import React from "react";
import { useEffect } from "react";
import NoImage from "../assets/Default_pfp.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { getCreditsMovie } from "../redux/actions/moviesActions";

export default function Credits() {
  const dispatch = useDispatch();

  const id = useSelector((state) => state.movie.movieId);
  const credit = useSelector((state) => state.movie.credits);
  // console.log("credits", credit);
  useEffect(() => {
    dispatch(getCreditsMovie(id));
  }, [dispatch, id]);

  const settings = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div>
      {credit.length === 0 ? (
        <div className="mx-10 relative bottom-[200px] text-white mb-10">
          <h2 className="text-3xl font-black mb-3">Cast</h2>
          <h3>No cast information available for this movie.</h3>
        </div>
      ) : (
        <div className="mx-10 relative bottom-[200px]">
          <div className="text-white mb-5">
            <h2 className="text-3xl font-black">Cast</h2>
          </div>

          <div className="">
            <Slider {...settings}>
              {credit?.map((movie) => (
                <div key={movie.id}>
                  <div className="inline-block relative overflow-hidden m-1 min-w-[200px] h-[300px] z-0 rounded-md  w-[80px]">
                    <img
                      src={
                        movie?.profile_path
                          ? `https://image.tmdb.org/t/p/original${movie?.profile_path}`
                          : NoImage
                      }
                      alt={movie?.name}
                      className="rounded-full h-[150px] w-[150px] object-cover text-white m-auto"
                      style={{ objectPosition: "0 30%" }}
                    />

                    <div className="text-white flex flex-col items-center mt-8">
                      <div className="text-lg font-bold">{movie?.name}</div>
                      <div className="text-sm ">{movie?.character}</div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
}
