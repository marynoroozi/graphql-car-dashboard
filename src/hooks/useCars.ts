import { useQuery } from "@apollo/client";
import { useState, useMemo } from "react";
import { GET_CARS } from "../graphql/queries";
import type { Car, CarsData } from "../types/car.types";

export function useCars() {
  const { data, loading, error } = useQuery<CarsData>(GET_CARS);
  const [localCars, setLocalCars] = useState<Car[]>([]);

  // Search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState<number | null>(null);
  const [colorFilter, setColorFilter] = useState("");
  const [makeFilter, setMakeFilter] = useState("");

  // Sorting
  const [sortBy, setSortBy] = useState<"make" | "model" | "year" | "price">(
    "make"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const allCars = useMemo(() => {
    const graphqlCars = data?.cars || [];
    return [...graphqlCars, ...localCars];
  }, [data?.cars, localCars]);

  // Filter and sort cars
  const filteredAndSortedCars = useMemo(() => {
    let filtered = allCars.filter((car) => {
      // Search by model
      const matchesSearch = car.model
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Filter by year
      const matchesYear = yearFilter ? car.year === yearFilter : true;

      // Filter by color
      const matchesColor = colorFilter
        ? car.color.toLowerCase().includes(colorFilter.toLowerCase())
        : true;

      // Filter by make
      const matchesMake = makeFilter
        ? car.make.toLowerCase().includes(makeFilter.toLowerCase())
        : true;

      return matchesSearch && matchesYear && matchesColor && matchesMake;
    });

    // Sort cars
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy];
      let bValue: any = b[sortBy];

      // Handle price sorting (might be undefined)
      if (sortBy === "price") {
        aValue = aValue || 0;
        bValue = bValue || 0;
      }

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [
    allCars,
    searchTerm,
    yearFilter,
    colorFilter,
    makeFilter,
    sortBy,
    sortOrder,
  ]);

  const addCar = (newCar: Omit<Car, "id">) => {
    const carWithId: Car = {
      ...newCar,
      id: `local-${Date.now()}`, // Local ID for new cars
    };
    setLocalCars((prev) => [...prev, carWithId]);
  };

  // Get unique values for filters
  const availableYears = useMemo(() => {
    const years = allCars.map((car) => car.year);
    return [...new Set(years)].sort((a, b) => b - a);
  }, [allCars]);

  const availableColors = useMemo(() => {
    const colors = allCars.map((car) => car.color);
    return [...new Set(colors)].sort();
  }, [allCars]);

  const availableMakes = useMemo(() => {
    const makes = allCars.map((car) => car.make);
    return [...new Set(makes)].sort();
  }, [allCars]);

  return {
    cars: filteredAndSortedCars,
    loading,
    error,

    // Search and filters
    searchTerm,
    setSearchTerm,
    yearFilter,
    setYearFilter,
    colorFilter,
    setColorFilter,
    makeFilter,
    setMakeFilter,

    // Sorting
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,

    // Actions
    addCar,

    // Filter options
    availableYears,
    availableColors,
    availableMakes,
  };
}
