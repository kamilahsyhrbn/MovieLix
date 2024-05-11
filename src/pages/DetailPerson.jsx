import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetailPerson,
  getPersonCredits,
  getPersonImages,
} from "../redux/actions/moviesActions";
import { Link } from "react-router-dom";
import NoImage from "../assets/default_poster.jpeg";
import { IoChevronBack } from "react-icons/io5";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Card from "../components/Card";

export default function DetailPerson() {
  const dispatch = useDispatch();

  const id = useSelector((state) => state.movie.personId);
  const { person } = useSelector((state) => state.movie);
  const { isLoading } = useSelector((state) => state.movie);
  const { images } = useSelector((state) => state.movie);
  const { personCredits } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(getDetailPerson(id));
    dispatch(getPersonImages(id));
    dispatch(getPersonCredits(id));
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
        <div key={person?.id}>
          <Link to={-1}>
            <div className="text-white flex items-center px-10 py-5">
              <IoChevronBack className="text-2xl" />
              Go Back
            </div>
          </Link>
        </div>
      )}
      <div className="items-center flex relative ml-36 mb-10">
        <div className="mr-8">
          <img
            src={
              person?.profile_path
                ? `https://image.tmdb.org/t/p/original${person?.profile_path}`
                : NoImage
            }
            className="w-full h-[500px] object-cover rounded-xl"
          />
        </div>
        <div className="text-white flex flex-col h-[450px] w-[800px]">
          <div className="mb-auto">
            <div className="font-semibold text-5xl mb-2">{person?.name}</div>
            <div className="my-1">
              {person?.known_for_department
                ? person?.known_for_department
                : "Unknown"}
            </div>
            <div className="my-1">
              Popularity : {person?.popularity ? person?.popularity : "-"}{" "}
            </div>

            <div className="my-1">
              Born : {person?.birthday ? person?.birthday : "-"},{" "}
              {person?.place_of_birth ? person?.place_of_birth : "-"}
            </div>
            <div className="mt-6">
              {person?.biography
                ? person?.biography.slice(0, 1380)
                : "No biography available"}
            </div>
          </div>
        </div>
      </div>
      <div className="text-white mx-20 mb-10">
        {images?.length === 0 ? (
          <div>
            <h2 className="text-3xl font-bold mb-2">PHOTOS</h2>
            <h3>No photos available at the moment.</h3>
          </div>
        ) : (
          <div>
            <h2 className="text-3xl font-bold mb-2">PHOTOS</h2>
            <Slider {...settings}>
              {images?.map((img) => (
                <div key={img?.file_path}>
                  <div className="inline-block transition-transform relative overflow-hidden m-1 min-w-[200px] h-[300px] z-0 shadow-xl rounded-md hover:scale-110 hover:z-[1000] ">
                    <img
                      src={
                        img?.file_path
                          ? `https://image.tmdb.org/t/p/original${img?.file_path}`
                          : NoImage
                      }
                      alt={img?.name}
                      className="h-[300px] object-cover text-white m-auto"
                      style={{ objectPosition: "0 30%" }}
                    />

                    <div className="text-white flex flex-col items-center mt-8">
                      <div className="text-lg font-bold">{img?.name}</div>
                      <div className="text-sm ">{img?.character}</div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
      <div className="text-white mx-20 mb-10">
        {personCredits?.length === 0 ? (
          <div>
            <h2 className="text-3xl font-bold mb-2">CREDITS</h2>
            <h3>Credits not available at the moment.</h3>
          </div>
        ) : (
          <div>
            <h2 className="text-3xl font-bold mb-2">CREDITS</h2>
            <Slider {...settings}>
              {personCredits?.map((credits) => (
                <div key={credits?.id}>
                  <Card movie={credits} />
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
}
