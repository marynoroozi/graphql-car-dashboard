import { Container, Typography, Box, Fade } from "@mui/material";
import CarList from "../components/car/CarList";
import CarFilters from "../components/car/CarFilters";
import { useCars } from "../hooks/useCars";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function HomePage() {
  const {
    cars,
    loading,
    error,
    filters,
    setFilter,
    clearAllFilters,
    toggleSortOrder,
    availableYears,
    availableColors,
    availableMakes,
    totalResults,
  } = useCars();

  if (loading) {
    return <LoadingSpinner message="Loading cars..." />;
  }

  if (error) {
    return (
      <Container maxWidth="xl">
        <Box
          sx={{
            py: 4,
            textAlign: "center",
            color: "error.main",
          }}
        >
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
          <Box sx={{ mb: 4, textAlign: "center" }}>
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
              sx={{ maxWidth: 600, mx: "auto" }}
            >
              Browse our collection of premium vehicles. Filter, search, and
              find your perfect car.
            </Typography>
          </Box>

          <CarFilters
            searchTerm={filters.searchTerm}
            onSearchChange={(value) => setFilter("searchTerm", value)}
            yearFilter={filters.yearFilter}
            onYearFilterChange={(value) => setFilter("yearFilter", value)}
            colorFilter={filters.colorFilter}
            onColorFilterChange={(value) => setFilter("colorFilter", value)}
            makeFilter={filters.makeFilter}
            onMakeFilterChange={(value) => setFilter("makeFilter", value)}
            sortBy={filters.sortBy}
            onSortByChange={(value) => setFilter("sortBy", value)}
            sortOrder={filters.sortOrder}
            onSortOrderChange={(value) => setFilter("sortOrder", value)}
            totalCars={totalResults}
            availableYears={availableYears}
            availableColors={availableColors}
            availableMakes={availableMakes}
            onClearAllFilters={clearAllFilters}
            onToggleSortOrder={toggleSortOrder}
          />

          <CarList cars={cars} />
        </Box>
      </Fade>
    </Container>
  );
}
