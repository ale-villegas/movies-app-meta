import {
  ApiResponse,
  MovieCompleteDetails,
  MovieWithDetails,
  SearchMoviesResult,
} from "../types/Movies";

const apiUrl = "https://www.omdbapi.com/";
const apiKey = "85657700";



export async function searchMovies(
  query: string,
  page: number = 1
): Promise<SearchMoviesResult> {
  const url = `${apiUrl}?s="${query}"&apikey=${apiKey}&page=${page}`;

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
    };
  } catch (error) {
    console.error("Request failed:", error);
    return null;
  }
}

export async function getMovieById(
  id: string
): Promise<MovieCompleteDetails | null> {
  const url = `${apiUrl}?i=${id}&apikey=${apiKey}`;

  try {
    const response: Response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }
    const data: MovieCompleteDetails = await response.json();

    return data;
  } catch (error) {
    console.error("Request failed:", error);
    return null;
  }
}
