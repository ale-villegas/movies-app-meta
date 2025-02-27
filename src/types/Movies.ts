
export interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
  }
  export interface MovieWithDetails extends Movie {
    imdbRating: string;
    Genre: string;
    Plot: string;
    Director: string;
    Writer: string;
    Actors: string;
    Language: string;
    Country: string;
    Runtime: string;
  }
  export interface MoviesState {
    movies: MovieWithDetails[];
    loading: boolean;
    error: string | null;
    query: string,
    favorites: MovieWithDetails[]
    totalResults: string
    page: number
  }  

  export interface Rating {
    Source: string;
    Value: string;
  }

 export interface MovieCompleteDetails {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: Rating[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
  }

  export interface SearchMoviesResult {
    movies: MovieWithDetails[];
    totalResults?: string;
    error?: string;
  } 

  export interface ApiResponse {
    Search: Movie[];
    Error?: string;
    Response: "False" | "True";
    totalResults: string;
  }