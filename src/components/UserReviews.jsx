import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserReviews } from "../redux/actions/moviesActions";
import { FaStar } from "react-icons/fa";
import NoImage from "../assets/Default_pfp.png";

export default function UserReviews() {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.movie.movieId);
  const { reviews } = useSelector((state) => state.movie);
  //   console.log("reviews", reviews);

  useEffect(() => {
    dispatch(getUserReviews(id));
  }, [dispatch, id]);

  return (
    <div>
      {reviews?.length === 0 ? (
        <div className="mx-10 relative bottom-[200px] text-white mb-10">
          <h2 className="text-3xl font-black mb-4">USER REVIEWS</h2>
          <h3>No user reviews for this movie.</h3>
        </div>
      ) : (
        <div className="mx-10 relative bottom-[150px]">
          <div className="text-white mb-5">
            <h2 className="text-3xl font-black">USER REVIEWS</h2>
          </div>
          {reviews?.map((movie) => (
            <div key={movie?.id} className="text-white">
              <div className="flex items-center mb-3">
                <img
                  className="w-10 h-10 me-4 rounded-full"
                  src={
                    movie?.author_details?.avatar_path
                      ? `https://image.tmdb.org/t/p/original${movie?.author_details?.avatar_path}`
                      : NoImage
                  }
                />
                <div className="text-xl">
                  <div>
                    {movie?.author}
                    <div className="flex items-center mb-1 text-sm">
                      <FaStar className="mr-1 flex items-center text-yellow-300" />
                      {movie?.author_details?.rating}
                      <span className="ml-1">out of 10</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-5 text-sm">
                <p>
                  Reviewed on{" "}
                  {new Date(movie?.created_at).toLocaleString("en-GB")}
                </p>
              </div>
              <p className="mb-2">{movie?.content.slice(0, 500) + "..."}</p>
              <a
                href={movie?.url}
                target="_blank"
                className="block mb-5 text-sm font-medium text-[#FF5BAE] hover:text-[#db4992] hover:underline"
              >
                Read more
              </a>
              <hr className="mb-5 border-gray-200" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
