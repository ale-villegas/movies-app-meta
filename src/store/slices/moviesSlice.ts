import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MoviesState, MovieWithDetails } from "../../types/Movies";

const initialState: MoviesState = {
  movies: [],
  loading: false,
  error: null,
  query: "",
  favorites: [],
  totalResults: ""
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<{ movies: MovieWithDetails[]; totalResults: string }>) => {
      state.movies = action.payload.movies;
      state.totalResults = action.payload.totalResults

    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload
    },

    setMoreMovies: (state, action: PayloadAction<MovieWithDetails[]>) => {
      state.movies = [...state.movies, ...action.payload];
     
    },
  },
});

export const { setMovies, setLoading, setError, setQuery, setMoreMovies } = moviesSlice.actions;

export default moviesSlice.reducer;
