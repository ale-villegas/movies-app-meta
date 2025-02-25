import { Typography } from "@mui/material"
import { useAppSelector } from "../../store/hooks"
import "./FavoritesMovies.scss"

export const FavoritesMovies = () => {
    const {favorites} = useAppSelector((state) => state.movies)
    const hasFavorites = favorites.length > 0
  return (
    <div className="box-favorites">

<Typography>{hasFavorites ? "Your favorites movies:" : " You haven't added movies to your favorites yet."}</Typography>

    </div>
  )
}
