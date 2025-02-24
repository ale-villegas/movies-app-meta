import { Outlet } from "react-router-dom";
import { SearchInput } from "../SearchInput/SearchInput";
import "./Layout.scss";
import { useSearchMovies } from "../../hooks/useSearchMovies";
import { useAppSelector } from "../../store/hooks";

export const Layout = () => {

  const {handleSearchMovies} = useSearchMovies()
  const {query} = useAppSelector((state) => state.movies )
  return (
    <>
      <header>
        <div className="box-container">
          Movie App
          <SearchInput value={query} handleChange={handleSearchMovies}/>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};
