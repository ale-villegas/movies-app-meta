import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { SearchInput } from "../SearchInput/SearchInput";
import { IconButton } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import "./Navbar.scss";

export const Navbar = () => {
  const { pathname } = useLocation();
  const savedQuery = sessionStorage.getItem("lastSearchQuery");
  const savedPage = sessionStorage.getItem("lastSearchPage");
  const { favorites } = useAppSelector((state) => state.favorites);
  
  return (
    <nav className="nav-header">
      Movie App
      <Link
        to={{
          pathname: "/",
          search: savedQuery
            ? `?query=${savedQuery}&page=${savedPage || "1"}`
            : "",
        }}
        className="nav-button"
        style={{
          textDecoration: pathname === "/" ? "underline" : "none",
        }}
      >
        Search
      </Link>
      <Link
        to="/favorites"
        style={{
          textDecoration: pathname.includes("favorites") ? "underline" : "none",
        }}
        className="nav-button"
      >
        Favorites
      </Link>
      <SearchInput />
      <IconButton color={favorites.length > 0 ? "error" : "default"}>
        {favorites.length > 0 ? <Favorite /> : <FavoriteBorder />}
        <span className="favorite-count">{favorites.length || 0}</span>
      </IconButton>
    </nav>
  );
};
