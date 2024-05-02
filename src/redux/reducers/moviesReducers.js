import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieId: null,
  popular: [],
  search: [],
  detailMovie: null,
  playing: [],
  topRated: [],
  upcoming: [],
  credits: [],
  recommendation: [],
  carousel: [],
  isLoading: true,
  counts: {},
};

const movieSlicer = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovieId: (state, action) => {
      state.movieId = action.payload;
    },
    setPopular: (state, action) => {
      state.popular = action.payload;
      //   console.log("action", action);
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setDetailMovie: (state, action) => {
      state.detailMovie = action.payload;
    },
    setPlaying: (state, action) => {
      state.playing = action.payload;
    },
    setTopRated: (state, action) => {
      state.topRated = action.payload;
    },
    setUpcoming: (state, action) => {
      state.upcoming = action.payload;
    },
    setCredits: (state, action) => {
      state.credits = action.payload;
    },
    setRecommendation: (state, action) => {
      state.recommendation = action.payload;
    },
    setCarousel: (state, action) => {
      state.carousel = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCounts: (state, action) => {
      state.counts = action.payload;
    },
  },
});

export const {
  setMovieId,
  setPopular,
  setSearch,
  setDetailMovie,
  setPlaying,
  setTopRated,
  setUpcoming,
  setCredits,
  setRecommendation,
  setCarousel,
  setIsLoading,
  setCounts,
} = movieSlicer.actions;

export default movieSlicer.reducer;
