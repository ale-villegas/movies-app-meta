import { Link, Outlet } from "react-router-dom";
import { SearchInput } from "../SearchInput/SearchInput";
import "./Layout.scss";
import { useSearchMovies } from "../../hooks/useSearchMovies";
import { useAppSelector } from "../../store/hooks";

export const Layout = () => {
  const { handleSearchMovies } = useSearchMovies();
  const { query } = useAppSelector((state) => state.movies);
  
  return (
    <>
    <header>
      <div className="box-container">
      Movie App
        <nav className="nav-header">
        <Link to="/" className="nav-button">Search</Link>
        <Link to="/favorites" className="nav-button">Favorites</Link>
        </nav>

        <SearchInput value={query} onChange={handleSearchMovies} />
      </div>
    </header>
    <main>
      <Outlet />
    </main>
  </>
  );
};
