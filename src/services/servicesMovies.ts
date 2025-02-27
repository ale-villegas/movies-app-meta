import {
  ApiResponse,
  MovieCompleteDetails,
  MovieWithDetails,
  SearchMoviesResult,
} from "../types/Movies";

const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

export async function searchMovies(
  query: string,
  page: number = 1,
  type?: string
): Promise<SearchMoviesResult> {
  const url = `${apiUrl}?s=${encodeURIComponent(
    query
  )}&apikey=${apiKey}&page=${page}${type ? `&type=${type}` : ""}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return { movies: [], totalResults: "0", error: "Failed to fetch movies" };
    }

    const data: ApiResponse = await response.json();

    if (data.Response === "False") {
      return { movies: [], totalResults: "0", error: data.Error };
    }

    const moviesWithExtraDetails = await Promise.all(
      data.Search.map(async (movie) => {
        const movieDetails = await getMovieWithExtraDetails(movie.imdbID);
        return {
          ...movie,
          imdbRating: movieDetails?.imdbRating || "N/A",
          Genre: movieDetails?.Genre || "N/A",
          Plot: movieDetails?.Plot || "N/A",
          Actors: movieDetails?.Actors || "N/A",
          Country: movieDetails?.Country || "N/A",
          Director: movieDetails?.Director || "N/A",
          Language: movieDetails?.Language || "N/A",
          Runtime: movieDetails?.Runtime || "N/A",
          Writer: movieDetails?.Writer || "N/A",
        };
      })
    );

    return {
      movies: moviesWithExtraDetails,
      totalResults: data.totalResults || "0",
    };
  } catch (error) {
    return {
      movies: [],
      totalResults: "0",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

async function getMovieWithExtraDetails(
  imdbID: string
): Promise<MovieWithDetails | null> {
  const url = `${apiUrl}?i=${imdbID}&apikey=${apiKey}`;

  try {
    const response: Response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }

    const data: MovieCompleteDetails = await response.json();

    return {
      Title: data.Title,
      Year: data.Year,
      imdbID: data.imdbID,
      Type: data.Type,
      Poster: data.Poster,
      imdbRating: data.imdbRating,
      Genre: data.Genre,
      Plot: data.Plot,
      Actors: data.Actors,
      Country: data.Country,
      Director: data.Director,
      Language: data.Language,
      Runtime: data.Runtime,
      Writer: data.Writer,
    };
  } catch (error) {
    console.error("Request failed:", error);
    return null;
  }
}

export async function getMovieById(
  id: string
): Promise<MovieWithDetails | null> {
  const url = `${apiUrl}?i=${id}&apikey=${apiKey}`;

  try {
    const response: Response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }
    const data: MovieCompleteDetails = await response.json();

    if (data.Response === "True") {
      return {
        Actors: data.Actors,
        Country: data.Country,
        Director: data.Director,
        Genre: data.Genre,
        imdbID: data.imdbID,
        imdbRating: data.imdbRating,
        Language: data.Language,
        Plot: data.Plot,
        Poster: data.Poster,
        Runtime: data.Runtime,
        Title: data.Title,
        Type: data.Type,
        Writer: data.Writer,
        Year: data.Year,
      };
    } else {
      throw new Error("Movie not found!");
    }
  } catch (error) {
    console.error("Request failed:", error);
    return null;
  }
}
