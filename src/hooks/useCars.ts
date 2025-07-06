import { useQuery } from "@apollo/client";
import { useState, useMemo } from "react";
import { GET_CARS } from "../graphql/queries";
import type { Car, CarsData } from "../types/car.types";
import { useCarFilters } from "./useCarFilters";

export function useCars() {
  const { data, loading, error } = useQuery<CarsData>(GET_CARS);
  const [localCars, setLocalCars] = useState<Car[]>([]);

  const allCars = useMemo(() => {
    const graphqlCars = data?.cars || [];
    return [...graphqlCars, ...localCars];
  }, [data?.cars, localCars]);

  const filterResults = useCarFilters({
    cars: allCars,
    initialSort: { sortBy: "make", sortOrder: "asc" },
  });

  const addCar = (newCar: Omit<Car, "id">) => {
    const carWithId: Car = {
      ...newCar,
      id: `local-${Date.now()}`,
    };
    setLocalCars((prev) => [...prev, carWithId]);
  };

  return {
    // Main data
    cars: filterResults.filteredCars,
    loading,
    error,

    // Filter controls
    searchTerm: filterResults.searchTerm,
    setSearchTerm: filterResults.setSearchTerm,
    yearFilter: filterResults.yearFilter,
    setYearFilter: filterResults.setYearFilter,
    colorFilter: filterResults.colorFilter,
    setColorFilter: filterResults.setColorFilter,
    makeFilter: filterResults.makeFilter,
    setMakeFilter: filterResults.setMakeFilter,

    // Sort controls
    sortBy: filterResults.sortBy,
    setSortBy: filterResults.setSortBy,
    sortOrder: filterResults.sortOrder,
    setSortOrder: filterResults.setSortOrder,

    // Filter options
    availableYears: filterResults.availableYears,
    availableColors: filterResults.availableColors,
    availableMakes: filterResults.availableMakes,

    // Actions
    addCar,

    // Advanced filter controls
    filterControls: {
      clearAllFilters: filterResults.clearAllFilters,
      clearFilter: filterResults.clearFilter,
      resetToDefaults: filterResults.resetToDefaults,
      hasActiveFilters: filterResults.hasActiveFilters,
      activeFilters: filterResults.activeFilters,
      toggleSortOrder: filterResults.toggleSortOrder,
    },
  };
}
