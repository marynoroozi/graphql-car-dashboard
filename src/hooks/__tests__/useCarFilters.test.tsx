import { renderHook } from "@testing-library/react";
import { useCarFilters } from "../useCarFilters";
import type { Car } from "../../types/car.types";

const cars: Car[] = [
  {
    id: "1",
    make: "Audi",
    model: "Q5",
    year: 2023,
    color: "Blue",
    mobile: "",
    tablet: "",
    desktop: "",
  },
  {
    id: "2",
    make: "BMW",
    model: "X5",
    year: 2022,
    color: "Red",
    mobile: "",
    tablet: "",
    desktop: "",
  },
  {
    id: "3",
    make: "Audi",
    model: "A4",
    year: 2023,
    color: "White",
    mobile: "",
    tablet: "",
    desktop: "",
  },
];

describe("useCarFilters", () => {
  it("filters by searchTerm, year, color, make and sorts", () => {
    const filters = {
      searchTerm: "Q5",
      yearFilter: 2023,
      colorFilter: "Blue",
      makeFilter: "Audi",
      sortBy: "model" as const,
      sortOrder: "asc" as const,
    };

    const { result } = renderHook(() => useCarFilters(cars, filters));
    expect(result.current).toHaveLength(1);
    expect(result.current[0].model).toBe("Q5");
  });

  it("returns all cars if no filters are set", () => {
    const filters = {
      searchTerm: "",
      yearFilter: null,
      colorFilter: "",
      makeFilter: "",
      sortBy: "make" as const,
      sortOrder: "asc" as const,
    };
    const { result } = renderHook(() => useCarFilters(cars, filters));
    expect(result.current).toHaveLength(3);
  });

  it("sorts cars by year descending", () => {
    const filters = {
      searchTerm: "",
      yearFilter: null,
      colorFilter: "",
      makeFilter: "",
      sortBy: "year" as const,
      sortOrder: "desc" as const,
    };
    const { result } = renderHook(() => useCarFilters(cars, filters));
    expect(result.current[0].year).toBe(2023);
    expect(result.current[1].year).toBe(2023);
    expect(result.current[2].year).toBe(2022);
  });
});
