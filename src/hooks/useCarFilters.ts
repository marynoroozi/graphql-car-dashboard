import { useMemo } from "react";
import type { Car } from "../types/car.types";

export function useCarFilters(
  cars: Car[],
  filters: {
    searchTerm: string;
    yearFilter: number | null;
    colorFilter: string;
    makeFilter: string;
    sortBy: "make" | "model" | "year" | "price";
    sortOrder: "asc" | "desc";
  }
) {
  return useMemo(() => {
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
      let aValue: any = a[filters.sortBy];
      let bValue: any = b[filters.sortBy];
      if (filters.sortBy === "price") {
        aValue = aValue ?? 0;
        bValue = bValue ?? 0;
      }
      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }
      if (aValue < bValue) return filters.sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return filters.sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [cars, filters]);
}
