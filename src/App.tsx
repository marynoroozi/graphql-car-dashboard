// src/App.tsx
import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useCars } from "./hooks/useCars";
import { CarCard } from "./components/CarCard";
import { AddCarForm } from "./components/AddCarForm";
import { CarFilters } from "./components/CarFilters";

const client = new ApolloClient({
  uri: "/graphql", // MSW intercepts this
  cache: new InMemoryCache(),
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    h3: {
      fontWeight: 600,
    },
  },
});

function CarList() {
  const {
    cars,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    addCar,
  } = useCars();

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
        role="status"
        aria-label="Loading car information"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ my: 2 }} role="alert" aria-live="polite">
        Error loading cars: {error.message}
      </Alert>
    );
  }

  return (
    <>
      <AddCarForm onAddCar={addCar} />

      <CarFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        totalCars={cars.length}
      />

      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={2}
        sx={{ mt: 2 }}
        role="region"
        aria-label="Car listings"
        aria-live="polite"
      >
        {cars.map((car) => (
          <Box
            key={car.id}
            sx={{
              width: {
                xs: "100%",
                sm: "calc(50% - 8px)",
                md: "calc(33.33% - 11px)",
                lg: "calc(25% - 12px)",
              },
              minWidth: 300,
              maxWidth: 400,
            }}
          >
            <CarCard car={car} />
          </Box>
        ))}
      </Box>

      {cars.length === 0 && (
        <Box textAlign="center" py={4} role="status">
          <Typography variant="h6" color="text.secondary">
            No cars found matching your search criteria.
          </Typography>
        </Box>
      )}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApolloProvider client={client}>
        <Container maxWidth="xl" sx={{ py: 4 }} role="main">
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            textAlign="center"
            id="main-heading"
          >
            🚗 Car Assessment Dashboard
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            textAlign="center"
            color="text.secondary"
            mb={4}
            aria-describedby="main-heading"
          >
            Browse, add, and filter cars using GraphQL and Material-UI
          </Typography>

          <CarList />
        </Container>
      </ApolloProvider>
    </ThemeProvider>
  );
}
