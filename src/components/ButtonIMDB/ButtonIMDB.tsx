import { Switch, FormControlLabel, Box } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import imdbIcon from "../../assets/imdb.png";

interface ButtonIMDBProps {
  isSortedByRating: boolean;
  setIsSortedByRating: Dispatch<SetStateAction<boolean>>;
}

export const ButtonIMDB = ({
  isSortedByRating,
  setIsSortedByRating,
}: ButtonIMDBProps) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="flex-end"  gap={1}>
     <img src={imdbIcon} alt="IMDB icon" style={{ width: 30, height: 30 }} />
      <FormControlLabel
        control={
          <Switch
            checked={isSortedByRating}
            onChange={() => setIsSortedByRating(!isSortedByRating)}
            color="secondary"
          />
        }
        label="Sort by IMDB Rating"
        labelPlacement="end"
        sx={{ margin: 0 }}
      />
       
    </Box>
  );
};