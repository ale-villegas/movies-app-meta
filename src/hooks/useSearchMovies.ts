import { ChangeEvent, useCallback, useState } from "react";
import debounce from "debounce";

import {
  setError,
  setLoading,
  setMoreMovies,
  setMovies,
  setQuery,
} from "../store/slices/moviesSlice";
import { searchMovies } from "../services/servicesMovies";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export const useSearchMovies = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const { query } = useAppSelector((state) => state.movies);

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (query) {
        try {
          dispatch(setLoading(true));
          const data = await searchMovies(query);
          dispatch(setMovies(data));
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Error fetching data";
          dispatch(setError(errorMessage));
        } finally {
          dispatch(setLoading(false));
        }
      }
    }, 1500),
    []
  );

  const handleSearchMovies = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value));
    debouncedSearch(event.target.value);
  };

  const getMoreResults = async () => {
    if (page) {
      try {
        dispatch(setLoading(true));
        const data = await searchMovies(query, page);
        dispatch(setMoreMovies(data.movies));
        setPage((prevPage) => prevPage + 1);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Error fetching data";
        dispatch(setError(errorMessage));
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  return { handleSearchMovies, getMoreResults };
};
