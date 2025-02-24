import "./ListOfMovies.scss";
import { useAppSelector } from "../../store/hooks";
import { CardMovie } from "../../components/CardMovie/CardMovie";
import { CardMovieSkeleton } from "../../components/CardMovie/CardMovieSkeleton";
import { Button } from "@mui/material";
import { useSearchMovies } from "../../hooks/useSearchMovies";
import { motion } from "framer-motion";

export const ListOfMovies = () => {
  const { movies, loading } = useAppSelector((state) => state.movies);
  const { getMoreResults } = useSearchMovies();

  return (
    <div className="box-movies">
      <motion.div
        className="box-movies-list"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {(loading ? Array.from({ length: 10 }) : movies).map((m, i) => (
          <motion.div
            key={loading ? i : m.imdbID}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {loading ? <CardMovieSkeleton /> : <CardMovie movie={m} />}
          </motion.div>
        ))}
      </motion.div>

      <Button
        variant="outlined"
        color="primary"
        sx={{
          backgroundColor: "white",
          color: "black",
          border: "1px solid #ccc",
          borderRadius: "3rem",
          width: "40%",
          margin: "0 auto",
          "&:hover": {
            backgroundColor: "#f4f4f4",
          },
        }}
        onClick={getMoreResults}
      >
        Load more results
      </Button>
    </div>
  );
};
