import "./SearchMovies.scss";
import { useAppSelector } from "../../store/hooks";
import { CardMovie } from "../../components/CardMovie/CardMovie";
import { CardMovieSkeleton } from "../../components/CardMovie/CardMovieSkeleton";
import { Button, Typography } from "@mui/material";
import { useSearchMovies } from "../../hooks/useSearchMovies";
import { motion } from "framer-motion";
import { movieItemAnimation, movieListAnimation, movieSkeletonAnimation } from "../../utils/utils";


export const SearchMovies = () => {
  const { movies, loading, error, page, totalResults } = useAppSelector(
    (state) => state.movies
  );

  const { getMoreResults } = useSearchMovies();
  const hasMoreResults = page * 10 < parseInt(totalResults, 10);
  const isLoadingMore = loading && page > 1;
  const loadSkeleton = loading && page === 1;


  return (
    <div className="box-movies">
      <motion.div className="box-movies-list" {...movieListAnimation}>
        {error && movies.length === 0 ? (
          <Typography variant="h3">{error}</Typography>
        ) : (
          <>
            {movies.map((m) => {
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

      <Button
        disabled={!hasMoreResults}
        variant="outlined"
        color="secondary"
        className="load-more-btn"
        onClick={getMoreResults}
      >
        {hasMoreResults ? "Load more movies" : "No more results"}
      </Button>
    </div>
  );
};
