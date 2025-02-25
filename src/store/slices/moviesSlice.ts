import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  MoviesState,
  MovieWithDetails,
  SearchMoviesResult,
} from "../../types/Movies";
import { loadFavoritesFromLocalStorage } from "../../utils/utils";

const initialState: MoviesState = {
  movies: [],
  loading: false,
  error: null,
  query: "",
  favorites: [],
  totalResults: "",
  page: 1,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, { payload }: PayloadAction<SearchMoviesResult>) => {
      state.movies = payload.movies;
      if (payload.totalResults) {
        state.totalResults = payload.totalResults;
      }

      if (payload.error) {
        state.error = payload.error;
      }
    },
    setPage: (state, { payload }: PayloadAction<number>) => {
      state.page = payload;
    },

    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    setQuery: (state, { payload }: PayloadAction<string>) => {
      state.query = payload.trim();
    },

    setMoreMovies: (state, { payload }: PayloadAction<SearchMoviesResult>) => {
      state.movies = [...state.movies, ...payload.movies];
      state.page = state.page + 1;
      if (payload.error) {
        state.error = payload.error;
      }
    },

    setFavoritesFromLocalStorage: (
      state
    ) => {
      state.favorites = loadFavoritesFromLocalStorage();
    },

    setFavorite: (state, { payload }: PayloadAction<MovieWithDetails>) => {
      if (!state.favorites.find((f) => f.imdbID === payload.imdbID)) {
        state.favorites = [...state.favorites, payload];
      }
    },
    deleteFavorite: (state, action: PayloadAction<MovieWithDetails>) => {
      state.favorites = state.favorites.filter(
        (f) => f.imdbID !== action.payload.imdbID
      );
    },
  },
});

export const {
  setMovies,
  setLoading,
  setQuery,
  setMoreMovies,
  setFavorite,
  deleteFavorite,
  setPage,
  setFavoritesFromLocalStorage
} = moviesSlice.actions;

export default moviesSlice.reducer;
