import { Movie, MovieCompleteDetails, MovieWithDetails } from "../types/Movies";

const apiUrl = "https://www.omdbapi.com/";
const apiKey = "85657700";

interface ApiResponse {
  Search: Movie[];
  Error?: string;
  Response: "False" | "True"
  totalResults: string

}

export async function searchMovies(
  query: string,
  page: number = 1
): Promise<{ movies: MovieWithDetails[]; totalResults: string }> {
  const url = `${apiUrl}?s="${query}"&apikey=${apiKey}&page=${page}`;

  try {
    const response: Response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data: ApiResponse = await response.json();

    if (data.Search) {
      const moviesWithExtraDetails: MovieWithDetails[] = await Promise.all(
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
    } else {
      console.error("Search error:", data.Error);
      throw new Error(data.Error ? data.Error : "Unknown error");
    }
  } catch (error) {
    console.error("Request failed:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
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
