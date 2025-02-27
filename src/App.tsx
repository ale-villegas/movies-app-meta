import { useEffect } from "react";
import { AppRouter } from "./routes/AppRouter";
import { useAppDispatch } from "./store/hooks";
import { setFavoritesFromLocalStorage } from "./store/slices/favoritesSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setFavoritesFromLocalStorage());
  }, []);

  return <AppRouter />;
}

export default App;
