import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { searchMovies } from "../services/servicesMovies";
import { MovieWithDetails } from "../types/Movies";

export const useSearchMovies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState<MovieWithDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState("");
  const [error, setError] = useState<string | null>(null);

  const query = searchParams.get("query") || "";
  const page = Number(searchParams.get("page")) || 1;
  const type = searchParams.get("type") || "all";
  const { pathname } = useLocation();

  const fetchMovies = async (
    searchQuery: string,
    pageNumber: number,
    movieType: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      const data = await searchMovies(
        searchQuery,
        pageNumber,
        movieType !== "all" ? movieType : undefined
      );

      if (data.error) {
        setMovies([]);
        setError(data.error);
      } else if (pageNumber === 1 && data.totalResults) {
        setMovies(data.movies);
        setTotalResults(data.totalResults);
        setError(null);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...data.movies]);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setMovies([]);
      setError("Unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getMoreResults = () => {
    const nextPage = page + 1;
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("page", nextPage.toString());
      return newParams;
    });
  };

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      setTotalResults("");
      setError(null);
      sessionStorage.removeItem("lastSearchQuery");
      sessionStorage.removeItem("lastSearchPage");
      sessionStorage.removeItem("lastSearchType");
      return;
    }

    sessionStorage.setItem("lastSearchQuery", query);
    sessionStorage.setItem("lastSearchPage", page.toString());
    sessionStorage.setItem("lastSearchType", type);

    fetchMovies(query, page, type);
  }, [query, page, type]);

  useEffect(() => {
    if (pathname.includes("favorites")) {
      const savedQuery = sessionStorage.getItem("lastSearchQuery");
      const savedPage = sessionStorage.getItem("lastSearchPage");
      const savedType = sessionStorage.getItem("lastSearchType");

      if (savedQuery && savedPage) {
        setSearchParams({
          query: savedQuery,
          page: savedPage,
          ...(savedType && savedType !== "all" ? { type: savedType } : {}),
        });
      }
    }
  }, [pathname]);

  return {
    query,
    page,
    type,
    movies,
    loading,
    error,
    totalResults,
    getMoreResults,
  };
};
