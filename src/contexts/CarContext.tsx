import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useCars } from "../hooks/useCars";
import { useCarFilters } from "../hooks/useCarFilters";
import type { Car, CarFilters } from "../types/car.types";

interface CarContextValue {
  // Data
  cars: Car[];
  allCars: Car[];
  loading: boolean;
  mutationLoading: boolean;
  error: any;

  // Filters & Sorting
  filters: CarFilters;
  setFilter: <K extends keyof CarFilters>(key: K, value: CarFilters[K]) => void;
  clearAllFilters: () => void;
  toggleSortOrder: () => void;

  // Filter Options
  availableYears: number[];
  availableColors: string[];
  availableMakes: string[];

  // Actions
  addCar: (input: Omit<Car, "id">) => Promise<void>;
  refetchCars: () => Promise<any>;

  // Status
  totalResults: number;
  hasActiveFilters: boolean;
  activeFilters: Array<{ key: keyof CarFilters; label: string; value: string }>;
}

// Create Context
const CarContext = createContext<CarContextValue | null>(null);

// Provider Component
export function CarProvider({ children }: { children: React.ReactNode }) {
  // ✅ استفاده از useCars برای GraphQL logic
  const {
    cars: allCars,
    loading,
    error,
    mutationLoading,
    refetch,
    addCar,
  } = useCars();

  // Filter State
  const [filters, setFilters] = useState<CarFilters>({
    searchTerm: "",
    yearFilter: null,
    colorFilter: "",
    makeFilter: "",
    sortBy: "make",
    sortOrder: "asc",
  });

  // Filtered cars using our reusable hook
  const filteredCars = useCarFilters(allCars, filters);

  // Filter options
  const availableYears = useMemo(
    () => Array.from(new Set(allCars.map((c) => c.year))).sort((a, b) => b - a),
    [allCars]
  );

  const availableColors = useMemo(
    () => Array.from(new Set(allCars.map((c) => c.color))).sort(),
    [allCars]
  );

  const availableMakes = useMemo(
    () => Array.from(new Set(allCars.map((c) => c.make))).sort(),
    [allCars]
  );

  // Actions
  const setFilter = useCallback(
    <K extends keyof CarFilters>(key: K, value: CarFilters[K]) => {
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

  const refetchCars = useCallback(() => {
    return refetch();
  }, [refetch]);

  // Active filters for display
  const activeFilters = useMemo(() => {
    const active: Array<{
      key: keyof CarFilters;
      label: string;
      value: string;
    }> = [];

    if (filters.searchTerm) {
      active.push({
        key: "searchTerm",
        label: "Model",
        value: filters.searchTerm,
      });
    }
    if (filters.yearFilter) {
      active.push({
        key: "yearFilter",
        label: "Year",
        value: filters.yearFilter.toString(),
      });
    }
    if (filters.colorFilter) {
      active.push({
        key: "colorFilter",
        label: "Color",
        value: filters.colorFilter,
      });
    }
    if (filters.makeFilter) {
      active.push({
        key: "makeFilter",
        label: "Make",
        value: filters.makeFilter,
      });
    }

    return active;
  }, [filters]);

  const hasActiveFilters = useMemo(() => {
    return !!(
      filters.searchTerm ||
      filters.yearFilter ||
      filters.colorFilter ||
      filters.makeFilter
    );
  }, [filters]);

  // Context Value
  const value: CarContextValue = {
    // Data
    cars: filteredCars,
    allCars,
    loading,
    mutationLoading,
    error,

    // Filters & Sorting
    filters,
    setFilter,
    clearAllFilters,
    toggleSortOrder,

    // Filter Options
    availableYears,
    availableColors,
    availableMakes,

    // Actions
    addCar,
    refetchCars,

    // Status
    totalResults: filteredCars.length,
    hasActiveFilters,
    activeFilters,
  };

  return <CarContext.Provider value={value}>{children}</CarContext.Provider>;
}

// Custom Hook
export function useCarContext() {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error("useCarContext must be used within CarProvider");
  }
  return context;
}

// Convenience hooks for specific parts
export function useCarData() {
  const { cars, allCars, loading, error } = useCarContext();
  return { cars, allCars, loading, error };
}

export function useCarFiltersContext() {
  const {
    filters,
    setFilter,
    clearAllFilters,
    toggleSortOrder,
    availableYears,
    availableColors,
    availableMakes,
    hasActiveFilters,
    activeFilters,
    totalResults,
  } = useCarContext();

  return {
    filters,
    setFilter,
    clearAllFilters,
    toggleSortOrder,
    availableYears,
    availableColors,
    availableMakes,
    hasActiveFilters,
    activeFilters,
    totalResults,
  };
}

export function useCarActions() {
  const { addCar, refetchCars, mutationLoading } = useCarContext();
  return { addCar, refetchCars, mutationLoading };
}
