import axios from "axios";
import {
  setPopular,
  setSearch,
  setDetailMovie,
  setPlaying,
  setTopRated,
  setUpcoming,
  setCredits,
  setRecommendation,
  setIsLoading,
  setCarousel,
  setCounts,
  setVideo,
  setPerson,
  setImages,
  setPersonCredits,
  setReviews,
  setWatch,
} from "../reducers/moviesReducers";

// FOR HOMEPAGE
export const getCarousel = () => async (dispatch) => {
  const API_KEY = process.env.API_KEY;
  dispatch(setIsLoading(true));
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=5&api_key=${API_KEY}`,
      { header: { accept: "application/json" } }
    );
    console.log("Response carousel: ", response.data);
    const carousel = response?.data?.results;
    dispatch(setCarousel(carousel));
    dispatch(setIsLoading(false));
  } catch (error) {
    // console.log("Error: ", error);
  }
};

export const getPopularMovies = () => async (dispatch) => {
  const API_KEY = process.env.API_KEY;
  dispatch(setIsLoading(true));
  try {
    const response = await axios.get(
      ` https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=1&api_key=${API_KEY}`,
      { header: { accept: "application/json" } }
    );
    // console.log("response movie: ", response.data);
    const popular = response.data.results.slice(0, 10);
    dispatch(setPopular(popular));
    dispatch(setIsLoading(false));
  } catch (error) {
    // console.log("Error: ", error);
  }
};

export const getTopRatedMovies = () => async (dispatch) => {
  const API_KEY = process.env.API_KEY;
  dispatch(setIsLoading(true));
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${API_KEY}`,
      { header: { accept: "application/json" } }
    );
    const topRated = response.data.results;
    dispatch(setTopRated(topRated));
    dispatch(setIsLoading(false));
  } catch (error) {
    // console.log("Error: ", error);
  }
};

export const getUpcomingMovies = () => async (dispatch) => {
  const API_KEY = process.env.API_KEY;
  dispatch(setIsLoading(true));
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&&with_release_type=1|2|3&release_date.gte=2026-01-01&release_date.lte=2070-01-01&api_key=${API_KEY}&page=1`,
      { header: { accept: "application/json" } }
    );
    const upcoming = response.data.results.slice(0, 10);
    dispatch(setUpcoming(upcoming));
    dispatch(setIsLoading(false));
  } catch (error) {
    // console.log("Error: ", error);
  }
};

export const getNowPlayingMovies = () => async (dispatch) => {
  const API_KEY = process.env.API_KEY;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=1|2|3|4&release_date.gte=2024-01-01&release_date.lte=2025-01-01&api_key=${API_KEY}`,
      { header: { accept: "application/json" } }
    );
    const nowPlaying = response.data.results;
    dispatch(setPlaying(nowPlaying));
    dispatch(setIsLoading(false));
  } catch (error) {
    // console.log("Error ", error);
  }
};

// FOR HOMEPAGE ENDS HERE

// MOVIES PER PAGE
export const searchMovie = (query, currentPage) => async (dispatch) => {
  const API_KEY = process.env.API_KEY;

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&include_adult=false&page=${currentPage}`,
      { header: { accept: "application/json" } }
    );
    // console.log("Response search: ", response.data);
    if (response.data.total_results === 0) {
      dispatch(setSearch([]));
      dispatch(setIsLoading(false));
    } else {
      const search = response?.data?.results;
      const total_pages = response?.data?.total_pages;
      const total_results = response?.data?.total_results;
      // console.log("search actions", search);
      // console.log("response?.data?.total_pages", response?.data?.total_pages);
      dispatch(setSearch(search));
      dispatch(setCounts({ total_pages, total_results }));
      dispatch(setIsLoading(false));
    }
  } catch (error) {
    // console.log("Error search: ", error.response.data.status_message);
  }
};

export const getDetailMovie = (id) => async (dispatch) => {
  const API_KEY = process.env.API_KEY;
  dispatch(setIsLoading(true));
  dispatch(setDetailMovie());
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${API_KEY}`,
      { headers: { accept: "application/json" } }
    );
    // console.log("response detail: ", response?.data);
    const detailMovie = response?.data;
    dispatch(setDetailMovie(detailMovie));
    dispatch(setIsLoading(false));
  } catch (error) {
    // console.log("Error: ", error?.response?.data?.status_message);
  }
};

export const getCreditsMovie = (id) => async (dispatch) => {
  const API_KEY = process.env.API_KEY;
  dispatch(setIsLoading(true));
  dispatch(setCredits([]));
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US&api_key=${API_KEY}`
    );
    // console.log("Response credits: ", response.data);
    const credits = response?.data?.cast;
    // console.log("credits", credits);
    dispatch(setCredits(credits));
    dispatch(setIsLoading(false));
  } catch (error) {
    // console.log("Error: ", error);
  }
};

export const getRecommendationMovies = (id) => async (dispatch) => {
  const API_KEY = process.env.API_KEY;
  dispatch(setIsLoading(true));
  dispatch(setRecommendation([]));
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1&api_key=${API_KEY}`
    );
    // console.log("Response recommendations: ", response.data);
    const recc = response?.data?.results.slice(0, 10);
    // console.log("recc", recc);
    dispatch(setRecommendation(recc));
    dispatch(setIsLoading(false));
  } catch (error) {
    // console.log("Error: ", error);
  }
};

export const getTrailerMovies = (id) => async (dispatch) => {
  const API_KEY = process.env.API_KEY;
  dispatch(setIsLoading(true));
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&page=1&api_key=${API_KEY}`
    );
    const video = response?.data?.results.find(
      (video) => video.type === "Trailer"
    );
    dispatch(setVideo(video));
    dispatch(setIsLoading(false));
  } catch (error) {
    // console.log("Error: ", error);
  }
};

export const getUserReviews = (id) => async (dispatch) => {
  const API_KEY = process.env.API_KEY;
  dispatch(setIsLoading(true));
  dispatch(setReviews([]));
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1&api_key=${API_KEY}`
    );
    const reviews = response?.data?.results;
    dispatch(setReviews(reviews));
    dispatch(setIsLoading(false));
  } catch (error) {
    // console.log("Error: ", error);
  }
};

export const getWatchProviders = (id) => async (dispatch) => {
  const API_KEY = process.env.API_KEY;
  dispatch(setIsLoading(true));
  dispatch(setWatch([]));
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/watch/providers?language=en-US&page=1&api_key=${API_KEY}`
    );
    const providers = response?.data?.results?.ID?.flatrate;
    dispatch(setWatch(providers));
    dispatch(setIsLoading(false));
  } catch (error) {
    // console.log("Error: ", error);
  }
};

export const getDetailPerson = (id) => async (dispatch) => {
  const API_KEY = process.env.API_KEY;
  dispatch(setIsLoading(true));
  dispatch(setPerson([]));
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/person/${id}?language=en-US&page=1&api_key=${API_KEY}`
    );
    // console.log("Response person: ", response.data);
    const person = response?.data;
    dispatch(setPerson(person));
    dispatch(setIsLoading(false));
  } catch (error) {
    // console.log("Error: ", error);
  }
};

export const getPersonImages = (id) => async (dispatch) => {
  const API_KEY = process.env.API_KEY;
  dispatch(setIsLoading(true));
  dispatch(setImages([]));
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/person/${id}/images?language=en-US&page=1&api_key=${API_KEY}`
    );
    // console.log("Response person images: ", response.data);
    const images = response?.data?.profiles;
    dispatch(setImages(images));
    dispatch(setIsLoading(false));
  } catch (error) {
    // console.log("Error: ", error);
  }
};

export const getPersonCredits = (id) => async (dispatch) => {
  const API_KEY = process.env.API_KEY;
  dispatch(setIsLoading(true));
  dispatch(setPersonCredits([]));
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/person/${id}/movie_credits?language=en-US&page=1&api_key=${API_KEY}`
    );
    // console.log("Response person credits: ", response.data);
    const credits = response?.data?.cast;
    dispatch(setPersonCredits(credits));
    dispatch(setIsLoading(false));
  } catch (error) {
    // console.log("Error: ", error);
  }
};

export const nowPlaying = (query, currentPage) => async (dispatch) => {
  const API_KEY = process.env.API_KEY;
  dispatch(setIsLoading(true));
  try {
    const response = await axios.get(
      query === ""
        ? `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${currentPage}&sort_by=popularity.desc&with_release_type=1|2|3|4&release_date.gte=2024-01-01&release_date.lte=2025-01-01&api_key=${API_KEY}`
        : `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&include_adult=false&page=${currentPage}`,
      { header: { accept: "application/json" } }
    );
    // console.log("Response Now Playing: ", response.data);
    const playing = response?.data?.results;
    const total_pages = response?.data?.total_pages;
    const total_results = response?.data?.total_results;
    dispatch(setPlaying(playing));
    dispatch(setCounts({ total_pages, total_results }));
    dispatch(setIsLoading(false));
  } catch (error) {
    // console.log("Error ", error);
  }
};

export const popularMovies =
  (query, currentPage, sorted) => async (dispatch) => {
    const API_KEY = process.env.API_KEY;
    try {
      const response = await axios.get(
        query === ""
          ? `https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=${currentPage}&api_key=${API_KEY}&sort_by=${sorted}`
          : `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&include_adult=false&page=${currentPage}`,
        { header: { accept: "application/json" } }
      );
      // console.log("Response popular: ", response.data);
      const popular = response?.data?.results;
      const total_pages = response?.data?.total_pages;
      const total_results = response?.data?.total_results;
      dispatch(setPopular(popular));
      dispatch(setCounts({ total_pages, total_results }));
      dispatch(setIsLoading(false));
    } catch (error) {
      // console.log("Error: ", error);
    }
  };

export const topRatedMovies =
  (query, currentPage, sorted) => async (dispatch) => {
    const API_KEY = process.env.API_KEY;
    try {
      const response = await axios.get(
        query === ""
          ? `https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=${currentPage}&sort_by=${sorted}&without_genres=99,10755&vote_count.gte=200&api_key=${API_KEY}`
          : `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&include_adult=false&page=${currentPage}`,
        { header: { accept: "application/json" } }
      );
      // console.log("Response topRated: ", response.data);
      const topRated = response?.data?.results;
      const total_pages = response?.data?.total_pages;
      const total_results = response?.data?.total_results;
      dispatch(setTopRated(topRated));
      dispatch(setCounts({ total_pages, total_results }));
      dispatch(setIsLoading(false));
    } catch (error) {
      // console.log("Error: ", error);
    }
  };

export const upcomingMovies = (currentPage, sorted) => async (dispatch) => {
  const API_KEY = process.env.API_KEY;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${currentPage}&sort_by=${sorted}&with_release_type=1|2|3&release_date.gte=2024-12-01&release_date.lte=2070-12-01&api_key=${API_KEY}`,
      { header: { accept: "application/json" } }
    );
    // console.log("Response upcomingMovie: ", response.data);
    const upcoming = response?.data?.results;
    const total_pages = response?.data?.total_pages;
    const total_results = response?.data?.total_results;
    // console.log("upcmomig action", upcoming);
    dispatch(setUpcoming(upcoming));
    dispatch(setCounts({ total_pages, total_results }));
    dispatch(setIsLoading(false));
  } catch (error) {
    // console.log("Error: ", error);
  }
};
