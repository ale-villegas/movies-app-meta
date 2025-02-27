import { MovieWithDetails } from "../types/Movies";

export const movieListAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { staggerChildren: 0.1 },
};

export const movieItemAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

export const movieSkeletonAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

export const loadFavoritesFromLocalStorage = (): MovieWithDetails[] => {
  const storedFavorites = localStorage.getItem("favoriteMovies");
  if (storedFavorites) {
    try {
      return JSON.parse(storedFavorites);
    } catch (error) {
      console.error("Error parsing favorites from localStorage:", error);
      return [];
    }
  }
  return [];
};
