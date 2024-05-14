import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieId: null,
  personId: null,
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
  video: null,
  person: [],
  images: [],
  personCredits: [],
  reviews: [],
};

const movieSlicer = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovieId: (state, action) => {
      state.movieId = action.payload;
    },
    setPersonId: (state, action) => {
      state.personId = action.payload;
    },
    setPopular: (state, action) => {
      state.popular = action.payload;
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
    setVideo: (state, action) => {
      state.video = action.payload;
    },
    setPerson: (state, action) => {
      state.person = action.payload;
    },
    setImages: (state, action) => {
      state.images = action.payload;
    },
    setPersonCredits: (state, action) => {
      state.personCredits = action.payload;
    },
    setReviews: (state, action) => {
      state.reviews = action.payload;
    },
  },
});

export const {
  setMovieId,
  setPersonId,
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
  setVideo,
  setPerson,
  setImages,
  setPersonCredits,
  setReviews,
} = movieSlicer.actions;

export default movieSlicer.reducer;
