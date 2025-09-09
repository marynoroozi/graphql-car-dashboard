import { Container, Typography, Box, Fade } from "@mui/material";
import CarList from "../components/car/CarList";
import CarFilters from "../components/car/CarFilters";
import { useCarData } from "../contexts/CarContext";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { pageStyles } from "../theme/componentStyles";

export default function HomePage() {
  const { loading, error } = useCarData();

  if (loading) {
    return <LoadingSpinner message="Loading cars..." />;
  }

  if (error) {
    return (
      <Container maxWidth="xl">
        <Box sx={pageStyles.errorContainer}>
          <Typography variant="h5" gutterBottom>
            Error loading cars
          </Typography>
          <Typography variant="body1">{error.message}</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Fade in timeout={500}>
        <Box>
          <Box sx={pageStyles.homePageHeader}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Discover Amazing Cars
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={pageStyles.homePageSubtitle}
            >
              Browse our collection of premium vehicles. Filter, search, and
              find your perfect car.
            </Typography>
          </Box>

          <CarFilters />

          <CarList />
        </Box>
      </Fade>
    </Container>
  );
}
