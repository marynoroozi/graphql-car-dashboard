import { useState, useMemo, useCallback } from "react";
import type {
  Car,
  CarFilters,
  SortBy,
  SortOptions,
  SortOrder,
} from "../types/car.types";

export interface UseCarFiltersProps {
  cars: Car[];
  initialFilters?: Partial<CarFilters>;
  initialSort?: Partial<SortOptions>;
}

export function useCarFilters({
  cars,
  initialFilters = {},
  initialSort = {},
}: UseCarFiltersProps) {
  // State
  const [filters, setFilters] = useState<CarFilters>({
    searchTerm: "",
    yearFilter: null,
    colorFilter: "",
    makeFilter: "",
    ...initialFilters,
  });

  const [sortOptions, setSortOptions] = useState<SortOptions>({
    sortBy: "make",
    sortOrder: "asc",
    ...initialSort,
  });

  // Memoized filter options
  const filterOptions = useMemo(() => {
    const years = Array.from(new Set(cars.map((car) => car.year))).sort(
      (a, b) => b - a
    );
    const colors = Array.from(new Set(cars.map((car) => car.color))).sort();
    const makes = Array.from(new Set(cars.map((car) => car.make))).sort();
    return {
      availableYears: years,
      availableColors: colors,
      availableMakes: makes,
    };
  }, [cars]);

  // Filtering and sorting
  const filteredCars = useMemo(() => {
    let result = cars.filter((car) => {
      const { searchTerm, yearFilter, colorFilter, makeFilter } = filters;
      return (
        (!searchTerm ||
          car.model.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!yearFilter || car.year === yearFilter) &&
        (!colorFilter ||
          car.color.toLowerCase().includes(colorFilter.toLowerCase())) &&
        (!makeFilter ||
          car.make.toLowerCase().includes(makeFilter.toLowerCase()))
      );
    });

    result.sort((a, b) => {
      let aValue: any = a[sortOptions.sortBy];
      let bValue: any = b[sortOptions.sortBy];
      if (sortOptions.sortBy === "price") {
        aValue = aValue ?? 0;
        bValue = bValue ?? 0;
      }
      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }
      return sortOptions.sortOrder === "asc"
        ? aValue < bValue
          ? -1
          : aValue > bValue
          ? 1
          : 0
        : aValue > bValue
        ? -1
        : aValue < bValue
        ? 1
        : 0;
    });

    return result;
  }, [cars, filters, sortOptions]);

  // Setters
  const setFilter = useCallback(
    <K extends keyof CarFilters>(key: K, value: CarFilters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const setSort = useCallback(
    <K extends keyof SortOptions>(key: K, value: SortOptions[K]) => {
      setSortOptions((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const toggleSortOrder = useCallback(() => {
    setSortOptions((prev) => ({
      ...prev,
      sortOrder: prev.sortOrder === "asc" ? "desc" : "asc",
    }));
  }, []);

  // Utilities
  const clearAllFilters = useCallback(() => {
    setFilters({
      searchTerm: "",
      yearFilter: null,
      colorFilter: "",
      makeFilter: "",
    });
  }, []);

  const clearFilter = useCallback((filterKey: keyof CarFilters) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: filterKey === "yearFilter" ? null : "",
    }));
  }, []);

  const resetToDefaults = useCallback(() => {
    setFilters({
      searchTerm: "",
      yearFilter: null,
      colorFilter: "",
      makeFilter: "",
      ...initialFilters,
    });
    setSortOptions({
      sortBy: "make",
      sortOrder: "asc",
      ...initialSort,
    });
  }, [initialFilters, initialSort]);

  // Status and active filters
  const hasActiveFilters = useMemo(
    () => Object.values(filters).some((v) => v),
    [filters]
  );

  const activeFilters = useMemo(() => {
    const map: Record<keyof CarFilters, string> = {
      searchTerm: "Model",
      yearFilter: "Year",
      colorFilter: "Color",
      makeFilter: "Make",
    };
    return (Object.entries(filters) as [keyof CarFilters, any][])
      .filter(([, value]) => value)
      .map(([key, value]) => ({
        key,
        label: map[key],
        value: value?.toString(),
      }));
  }, [filters]);

  return {
    filteredCars,
    filters,
    sortOptions,
    ...filterOptions,
    setFilter,
    setSort,
    toggleSortOrder,
    clearAllFilters,
    clearFilter,
    resetToDefaults,
    hasActiveFilters,
    activeFilters,
    totalResults: filteredCars.length,
    // For backward compatibility:
    searchTerm: filters.searchTerm,
    setSearchTerm: (v: string) => setFilter("searchTerm", v),
    yearFilter: filters.yearFilter,
    setYearFilter: (v: number | null) => setFilter("yearFilter", v),
    colorFilter: filters.colorFilter,
    setColorFilter: (v: string) => setFilter("colorFilter", v),
    makeFilter: filters.makeFilter,
    setMakeFilter: (v: string) => setFilter("makeFilter", v),
    sortBy: sortOptions.sortBy,
    setSortBy: (v: SortBy) => setSort("sortBy", v),
    sortOrder: sortOptions.sortOrder,
    setSortOrder: (v: SortOrder) => setSort("sortOrder", v),
    setFilters,
    setSortOptions,
  };
}
