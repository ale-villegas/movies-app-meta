import { ChangeEvent, useState, useCallback } from "react";
import { TextField, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import debounce from "debounce";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import "./SearchInput.scss";

export const SearchInput = () => {
  const [localQuery, setLocalQuery] = useState("");
  const [type, setType] = useState("all");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isSearchRoute = pathname === "/";

  const debouncedSetQuery = useCallback(
    debounce((newQuery: string, newType: string) => {
      const params: Record<string, string> = { query: newQuery, page: "1" };

      if (newType !== "all") {
        params.type = newType;
      }

      setSearchParams(params);
      window.scrollTo(0, 0);
    }, 1000),
    []
  );

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isSearchRoute) {
      navigate("/");
    }
    const newQuery = event.target.value;
    setLocalQuery(newQuery);
    debouncedSetQuery(newQuery, type);
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    const newType = event.target.value;
    setType(newType);
    debouncedSetQuery(localQuery, newType);
  };

  return (
    <div className="search-container">
      <TextField
        className="search-input"
        placeholder="Search movies..."
        value={localQuery}
        onChange={handleQueryChange}
        variant="outlined"
      />
      <Select
        className="search-select"
        value={type}
        onChange={handleTypeChange}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="movie">Movies</MenuItem>
        <MenuItem value="series">Series</MenuItem>
      </Select>
    </div>
  );
};
