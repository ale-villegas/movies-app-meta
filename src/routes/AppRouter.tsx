import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "../components/Layout/Layout";
import { ListOfMovies } from "../pages/ListOfMovies/ListOfMovies";
export const AppRouter = () => {
  return (
    <Router>
      <Routes>
   
        <Route path="/" element={<Layout />}>
        <Route index element={<ListOfMovies />} />
        
        </Route>
      </Routes>
    </Router>
  );
};
