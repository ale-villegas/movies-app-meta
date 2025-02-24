import { Card, CardContent, Skeleton, Box, IconButton } from "@mui/material";
import "./CardMovie.scss"

export const CardMovieSkeleton = () => {
  return (
    <Card className="card-movie">
    <Box sx={{ position: "relative" }}>
      <Skeleton className="color-skeleton" variant="rectangular" width="100%" height={300} />

      <Box className="chip-container">
        <Skeleton className="color-skeleton" width={60} height={30} />
        <IconButton disabled>
          <Skeleton className="color-skeleton"  variant="circular" width={30} height={30} />
        </IconButton>
      </Box>
    </Box>

    <CardContent>
      <Box display="flex" flexDirection="column" gap={1}>
        <Box className="genres">
          <Skeleton className="color-skeleton"  width={80} height={30} />
          <Skeleton className="color-skeleton" width={80} height={30} />
        </Box>
      </Box>
    </CardContent>
  </Card>
  );
};