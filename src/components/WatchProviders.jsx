import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWatchProviders } from "../redux/actions/moviesActions";
import { useParams } from "react-router-dom";

export default function WatchProviders() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { watch } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(getWatchProviders(id));
  }, [dispatch, id]);
  return (
    <div>
      {watch?.length === undefined ? (
        <div className="mx-10 relative bottom-[200px] text-white mb-10">
          <h2 className="text-3xl font-black mb-4">WATCH PROVIDERS</h2>
          <h3>No watch providers found for this movie in your country.</h3>
        </div>
      ) : (
        <div className="mx-10 relative bottom-[230px] max-sm:my-12">
          <div className="text-white mb-5">
            <h2 className="text-3xl font-black">WATCH PROVIDERS</h2>
          </div>
          <div className="flex mx-4 max-sm:inline max-sm:mx-0">
            {watch?.map((movie) => (
              <div key={movie?.provider_id} className="text-white">
                <div className="flex items-center mb-3">
                  <img
                    className="w-10 h-10 me-4 rounded-full"
                    src={`https://image.tmdb.org/t/p/original${movie?.logo_path}`}
                    alt={movie?.provider_name}
                  />

                  <p className="text-xl mr-6">{movie?.provider_name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
