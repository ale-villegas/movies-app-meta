import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Chip,
} from "@mui/material";
import { Favorite, FavoriteBorder, Star } from "@mui/icons-material";
import { MovieWithDetails } from "../../types/Movies";
import imdbIcon from "../../assets/imdb.png";
import "./CardMovie.scss";
import { useFavoritesMovies } from "../../hooks/useFavoritesMovies";
import { Link } from "react-router-dom";

interface CardMovieProps {
  movie: MovieWithDetails;
}

export const CardMovie = ({ movie }: CardMovieProps) => {
  const { isFavorite, toggleFavorite } = useFavoritesMovies(movie);
  const genres = movie.Genre ? movie.Genre.split(",").slice(0, 3) : [];
  const capitalizedType =
    movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1);

  return (
    <Link
      to={`/movie/${movie.imdbID}`}
      state={{ movie }}
      style={{ textDecoration: "none" }}
    >
      <Card className="card-movie">
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            className="card-media"
            image={movie.Poster}
            alt={movie.Title}
          />

          <Box className="card-overlay">
            <Typography className="movie-title">{`${movie.Title} - ${movie.Year}`}</Typography>
            <Box className="rating-box">
              <img src={imdbIcon} alt="IMDb" className="imdb-icon" />
              <Typography className="rating">{movie.imdbRating}</Typography>
              <Star className="star-icon" />
            </Box>
          </Box>
          <Box className="chip-container" >
            <Chip
              label={capitalizedType}
              className={`chip ${movie.Type === "movie" ? "movie" : "series"}`}
            />
            <IconButton
              className="favorite-icon"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation();
                toggleFavorite()
              }}
            >
              {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
            </IconButton>
          </Box>
        </Box>
        <CardContent sx={{ padding: "1rem 0.5rem" }}>
          <Box className="genres">
            {genres.map((genre, index) => (
              <Chip key={index} label={genre.trim()} className="genre-chip" />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};
