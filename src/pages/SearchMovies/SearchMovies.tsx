import "./SearchMovies.scss";
import { CardMovie } from "../../components/CardMovie/CardMovie";
import { CardMovieSkeleton } from "../../components/CardMovie/CardMovieSkeleton";
import { Button, Typography, Box } from "@mui/material";
import { useSearchMovies } from "../../hooks/useSearchMovies";
import { motion } from "framer-motion";
import {
  movieItemAnimation,
  movieListAnimation,
  movieSkeletonAnimation,
} from "../../utils/utils";
import { ArrowForward } from "@mui/icons-material";
import { MovieWithDetails } from "../../types/Movies";
import { useState } from "react";
import { ButtonIMDB } from "../../components/ButtonIMDB/ButtonIMDB";

export const SearchMovies = () => {
  const { loading, page, movies, error, totalResults, getMoreResults, query } =
    useSearchMovies();
  const hasMoreResults = page * 10 < parseInt(totalResults, 10);
  const isLoadingMore = loading && page > 1;
  const loadSkeleton = loading && page === 1;

  const [isSortedByRating, setIsSortedByRating] = useState(false);

  const sortMoviesByRating = (movies: MovieWithDetails[]) => {
    return [...movies].sort(
      (a, b) => parseFloat(b.imdbRating) - parseFloat(a.imdbRating)
    );
  };

  const sortedMovies = isSortedByRating ? sortMoviesByRating(movies) : movies;

  return (
    <div className="box-movies">
      {sortedMovies.length > 1 ? (
        <Box display="flex" alignItems={"center"} justifyContent={"space-between"}>
          <Typography>
            Total results for your search: {totalResults}
          </Typography>
          <ButtonIMDB
            isSortedByRating={isSortedByRating}
            setIsSortedByRating={setIsSortedByRating}
          />
        </Box>
      ) : null}
      <motion.div className="box-movies-list" {...movieListAnimation}>
        {!query && (
          <div className="find-movies-box">
            <Typography sx={{ marginTop: "2rem" }} variant="h4">
              Find & Save Your Movies
            </Typography>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 0.5,
                ease: "easeInOut",
              }}
            >
              <ArrowForward
                style={{ fontSize: 40, transform: "rotate(-45deg)" }}
              />
            </motion.div>
          </div>
        )}

        {error && movies.length === 0 ? (
          <Typography variant="h4">{error}</Typography>
        ) : (
          <>
            {sortedMovies.map((m) => {
              return (
                <motion.div key={m.imdbID} {...movieItemAnimation}>
                  {loadSkeleton ? (
                    <CardMovieSkeleton />
                  ) : (
                    <CardMovie movie={m} />
                  )}
                </motion.div>
              );
            })}

            {isLoadingMore &&
              Array.from({ length: 10 }).map((_, index) => (
                <motion.div
                  key={`skeleton-${index}`}
                  {...movieSkeletonAnimation}
                >
                  <CardMovieSkeleton />
                </motion.div>
              ))}
          </>
        )}
      </motion.div>

      {movies.length > 0 && (
        <Button
          disabled={!hasMoreResults}
          variant="outlined"
          color="secondary"
          className="load-more-btn"
          onClick={getMoreResults}
        >
          {hasMoreResults ? "Load more movies" : "No more results"}
        </Button>
      )}
    </div>
  );
};
