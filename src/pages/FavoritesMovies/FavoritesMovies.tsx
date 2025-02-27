import { Typography } from "@mui/material";
import { useAppSelector } from "../../store/hooks";
import "./FavoritesMovies.scss";
import { CardMovie } from "../../components/CardMovie/CardMovie";
import { motion } from "framer-motion";

export const FavoritesMovies = () => {
  const { favorites } = useAppSelector((state) => state.favorites);
  const hasFavorites = favorites.length > 0;
  return (
    <div className="box-favorites">
      <Typography variant="h4">
        {hasFavorites
          ? "Your favorites movies:"
          : " You haven't added movies to your favorites yet."}
      </Typography>
      <motion.div className="box-favorites-list">
        {hasFavorites
          ? favorites.map((f) => <CardMovie key={f.imdbID} movie={f} />)
          : null}
      </motion.div>
    </div>
  );
};
