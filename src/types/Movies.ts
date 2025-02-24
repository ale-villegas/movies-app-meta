
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
  }
  export interface MoviesState {
    movies: MovieWithDetails[];
    loading: boolean;
    error: string | null;
    query: string,
    favorites: MovieWithDetails[]
    totalResults: string
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