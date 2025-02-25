import { ChangeEvent, useCallback } from "react";
import debounce from "debounce";

import {
  setLoading,
  setMoreMovies,
  setMovies,
  setPage,
  setQuery,
} from "../store/slices/moviesSlice";
import { searchMovies } from "../services/servicesMovies";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export const useSearchMovies = () => {
  const dispatch = useAppDispatch();
  const { query, page } = useAppSelector((state) => state.movies);

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (!query.trim()) return;

      dispatch(setLoading(true));

      dispatch(setPage(1));

      try {
        const data = await searchMovies(query, 1);

        if (data.error) {
          dispatch(
            setMovies({ movies: [], totalResults: "0", error: data.error })
          );
        } else {
          dispatch(
            setMovies({
              movies: data.movies,
              totalResults: data.totalResults,
            })
          );
        }
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Unexpected error:", error);
        setMovies({ movies: [], totalResults: "0", error: "Unexpected error" });
      } finally {
        dispatch(setLoading(false));
      }
    }, 1500),
    [dispatch]
  );

  const handleSearchMovies = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    dispatch(setQuery(newQuery));
    debouncedSearch(newQuery);
  };

  const getMoreResults = async () => {
    try {
      dispatch(setPage(page + 1));
      dispatch(setLoading(true));
      const data = await searchMovies(query, page + 1);
      if (data.error) {
        dispatch(setMoreMovies({ movies: [], error: data.error }));
      } else {
        dispatch(setMoreMovies({ movies: data.movies }));
      }
    } catch (error) {
      console.error(error);
      dispatch(setMoreMovies({ movies: [], error: "Unexpected error" }));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { handleSearchMovies, getMoreResults };
};
