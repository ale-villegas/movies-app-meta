import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieWithDetails } from "../../types/Movies";
import { loadFavoritesFromLocalStorage } from "../../utils/utils";

interface InitialStateFavorites {
  favorites: MovieWithDetails[];
}

const initialState: InitialStateFavorites = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavoritesFromLocalStorage: (state) => {
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

export const { setFavorite, deleteFavorite, setFavoritesFromLocalStorage } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
