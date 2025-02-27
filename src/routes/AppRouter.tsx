import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "../components/Layout/Layout";
import { SearchMovies } from "../pages/SearchMovies/SearchMovies";
import { FavoritesMovies } from "../pages/FavoritesMovies/FavoritesMovies";
import { MovieDetail } from "../pages/MovieDetail/MovieDetail";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SearchMovies />} />
          <Route path="favorites" element={<FavoritesMovies />} />
          <Route path="movie/:id" element={<MovieDetail />} />
        </Route>
      </Routes>
    </Router>
  );
};