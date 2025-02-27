import { MovieWithDetails } from "../types/Movies";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { deleteFavorite, setFavorite } from "../store/slices/favoritesSlice";

export const useFavoritesMovies = (movie: MovieWithDetails) => {
  const { favorites } = useAppSelector((state) => state.favorites);
  const dispatch = useAppDispatch();
  const isFavorite = favorites.find((f) => f.imdbID === movie?.imdbID);

  const setFavoriteMoviesOnLocal = (updatedFavorites: MovieWithDetails[]) => {
    try {
      localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Error saving favorite movies to localStorage:", error);
    }
  };

  const toggleFavorite = () => {
    if (!isFavorite) {
      const updatedFavorites = [...favorites, movie];
      dispatch(setFavorite(movie));
      setFavoriteMoviesOnLocal(updatedFavorites);
    } else {
      const updatedFavorites = favorites.filter(
        (f) => f.imdbID !== movie.imdbID
      );
      dispatch(deleteFavorite(movie));
      setFavoriteMoviesOnLocal(updatedFavorites);
    }
  };

  return { isFavorite, toggleFavorite };
};
