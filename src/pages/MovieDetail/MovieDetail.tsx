import { useLocation, useParams } from "react-router-dom";
import { MovieWithDetails } from "../../types/Movies";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import "./MovieDetail.scss";
import { useFavoritesMovies } from "../../hooks/useFavoritesMovies";
import { useEffect, useState } from "react";
import { getMovieById } from "../../services/servicesMovies";

export const MovieDetail = () => {
  const { state } = useLocation();
  const { id } = useParams<{ id: string }>();
  const movieFromStateRouter: MovieWithDetails  = state?.movie || null;
  const [movie, setMovie] = useState<MovieWithDetails>(
    movieFromStateRouter
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  
  const { isFavorite, toggleFavorite } = useFavoritesMovies(movie);
  const splitAndTrimValues = (value: string) =>
    value.split(",").map((item) => item.trim());

  const details = [
    { label: "Director", value: movie?.Director || "" },
    { label: "Writer", value: movie?.Writer || "" },
    { label: "Actors", value: movie?.Actors || "" },
    { label: "Language", value: movie?.Language || "" },
    { label: "Country", value: movie?.Country || "" },
    { label: "Runtime", value: movie?.Runtime || "" },
    { label: "IMDB Rating", value: movie?.imdbRating || "" },
  ];

  const getMovieIfDontComeFromRouter = async () => {
    if (!id) return;

    setIsLoading(true);

    try {
      const data = await getMovieById(id);
      if (data) {
        setMovie(data);
      } else {
        setError("Movie not found");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unexpected error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!movieFromStateRouter) {
      getMovieIfDontComeFromRouter();
    }
  }, []);

  if (isLoading) {
    return (
      <Box className="loading-container">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="error-container">
        <Typography variant="h3">{error}</Typography>
      </Box>
    );
  }

  if (!movie) {
    return null;
  }

  return (
    <Card className="movie-detail">
      <Box className="movie-container">
        <CardMedia
          component="img"
          image={movie.Poster}
          alt={movie.Title}
          className="movie-poster"
        />

        <CardContent className="movie-info">
          <Box className="movie-header">
            <Typography variant="h4" className="movie-title">
              {movie.Title} ({movie.Year})
            </Typography>
            <IconButton onClick={toggleFavorite} className="favorite-button">
              {isFavorite ? (
                <Favorite color="error" />
              ) : (
                <FavoriteBorder color="error" />
              )}
            </IconButton>
          </Box>

          <Typography className="movie-plot">{movie.Plot}</Typography>

          {details.map((detail, index) => (
            <Box key={index} className="detail">
              <Typography variant="subtitle2" className="detail-title">
                {detail.label}
              </Typography>
              <Box className="chips">
                {splitAndTrimValues(detail.value).map((item, idx) => (
                  <Chip key={idx} label={item} className="detail-chip" />
                ))}
              </Box>
            </Box>
          ))}
        </CardContent>
      </Box>
    </Card>
  );
};
