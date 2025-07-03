import { useQuery } from "@apollo/client";
import { useState, useMemo } from "react";
import { GET_CARS } from "../graphql/queries";

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface CarsData {
  cars: Car[];
}

export function useCars() {
  const { data, loading, error } = useQuery<CarsData>(GET_CARS);
  const [localCars, setLocalCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"make" | "model" | "year">("make");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Combine GraphQL data with local cars
  const allCars = useMemo(() => {
    const graphqlCars = data?.cars || [];
    return [...graphqlCars, ...localCars];
  }, [data?.cars, localCars]);

  // Filter and sort cars
  const filteredAndSortedCars = useMemo(() => {
    let filtered = allCars.filter((car) =>
      car.model.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

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
  }, [allCars, searchTerm, sortBy, sortOrder]);

  const addCar = (newCar: Omit<Car, "id">) => {
    const carWithId: Car = {
      ...newCar,
      id: Date.now().toString(), // Simple ID generation
    };
    setLocalCars((prev) => [...prev, carWithId]);
  };

  return {
    cars: filteredAndSortedCars,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    addCar,
  };
}
