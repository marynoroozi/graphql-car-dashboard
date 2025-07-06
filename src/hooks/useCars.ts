import { useQuery, useApolloClient } from "@apollo/client";
import { useMemo, useCallback, useState } from "react";
import { ADD_CAR, GET_CARS } from "../graphql/queries";
import type { Car, CarsData } from "../types/car.types";
import { useCarFilters } from "./useCarFilters";

export function useCars() {
  const { data, loading, error, refetch } = useQuery<CarsData>(GET_CARS);
  const client = useApolloClient();

  // Filters and sorting state
  const [filters, setFilters] = useState({
    searchTerm: "",
    yearFilter: null as number | null,
    colorFilter: "",
    makeFilter: "",
    sortBy: "make" as "make" | "model" | "year" | "price",
    sortOrder: "asc" as "asc" | "desc",
  });

  // Data coming from the query
  const cars = data?.cars ?? [];

  // Apply filters and sorting to the cars data
  const filteredCars = useCarFilters(cars, filters);

  // Filtered and sorted data for UI
  const availableYears = useMemo(
    () => Array.from(new Set(cars.map((c) => c.year))).sort((a, b) => b - a),
    [cars]
  );
  const availableColors = useMemo(
    () => Array.from(new Set(cars.map((c) => c.color))).sort(),
    [cars]
  );
  const availableMakes = useMemo(
    () => Array.from(new Set(cars.map((c) => c.make))).sort(),
    [cars]
  );

  const addCar = useCallback(
    async (input: Omit<Car, "id">) => {
      await client.mutate({
        mutation: ADD_CAR,
        variables: { input },
      });
      await refetch();
    },
    [client, refetch]
  );

  // Function to set a specific filter
  // This allows us to update the filters state in a type-safe way
  const setFilter = useCallback(
    <K extends keyof typeof filters>(key: K, value: (typeof filters)[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const clearAllFilters = useCallback(() => {
    setFilters({
      searchTerm: "",
      yearFilter: null,
      colorFilter: "",
      makeFilter: "",
      sortBy: "make",
      sortOrder: "asc",
    });
  }, []);

  const toggleSortOrder = useCallback(() => {
    setFilters((prev) => ({
      ...prev,
      sortOrder: prev.sortOrder === "asc" ? "desc" : "asc",
    }));
  }, []);

  return {
    cars: filteredCars,
    loading,
    error,
    filters,
    setFilter,
    clearAllFilters,
    toggleSortOrder,
    availableYears,
    availableColors,
    availableMakes,
    addCar,
    totalResults: filteredCars.length,
  };
}
