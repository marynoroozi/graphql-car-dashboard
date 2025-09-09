import { renderHook } from "@testing-library/react";
import { useCarFilters } from "../../hooks/useCarFilters";
import { mockCars } from "../utils/mockData";
import { createMockCars } from "../utils/helpers";
import type { Car, SortBy, SortOrder, CarFilters } from "../../types/car.types";

const defaultFilters: CarFilters = {
  searchTerm: "",
  yearFilter: null as number | null,
  colorFilter: "",
  makeFilter: "",
  sortBy: "make" as SortBy,
  sortOrder: "asc" as SortOrder,
};

describe("useCarFilters", () => {
  describe("No Filters Applied", () => {
    it("should return all cars when no filters are applied", () => {
      const { result } = renderHook(() =>
        useCarFilters(mockCars, defaultFilters)
      );

      expect(result.current).toHaveLength(mockCars.length);
      expect(result.current).toEqual(mockCars);
    });

    it("should handle empty car list", () => {
      const { result } = renderHook(() => useCarFilters([], defaultFilters));

      expect(result.current).toHaveLength(0);
      expect(result.current).toEqual([]);
    });
  });

  describe("Search Term Filtering", () => {
    it("should filter cars by model name (case insensitive)", () => {
      const filters = { ...defaultFilters, searchTerm: "q5" };

      const { result } = renderHook(() => useCarFilters(mockCars, filters));

      expect(result.current).toHaveLength(1);
      expect(result.current[0].model).toBe("Q5");
    });

    it("should filter cars by partial model name", () => {
      const filters = { ...defaultFilters, searchTerm: "am" }; // Should match "Camry"

      const { result } = renderHook(() => useCarFilters(mockCars, filters));

      expect(result.current).toHaveLength(1);
      expect(result.current[0].model).toBe("Camry");
    });

    it("should return empty array when search term doesn't match", () => {
      const filters = { ...defaultFilters, searchTerm: "NonExistentModel" };

      const { result } = renderHook(() => useCarFilters(mockCars, filters));

      expect(result.current).toHaveLength(0);
    });

    it("should handle empty search term", () => {
      const filters = { ...defaultFilters, searchTerm: "" };

      const { result } = renderHook(() => useCarFilters(mockCars, filters));

      expect(result.current).toHaveLength(mockCars.length);
    });
  });

  describe("Year Filtering", () => {
    it("should filter cars by exact year", () => {
      const filters = { ...defaultFilters, yearFilter: 2022 };

      const { result } = renderHook(() => useCarFilters(mockCars, filters));

      expect(result.current).toHaveLength(1);
      expect(result.current[0].year).toBe(2022);
      expect(result.current[0].make).toBe("BMW");
    });

    it("should return all cars when yearFilter is null", () => {
      const filters = { ...defaultFilters, yearFilter: null };

      const { result } = renderHook(() => useCarFilters(mockCars, filters));

      expect(result.current).toHaveLength(mockCars.length);
    });

    it("should return empty array when year doesn't exist", () => {
      const filters = { ...defaultFilters, yearFilter: 2030 };

      const { result } = renderHook(() => useCarFilters(mockCars, filters));

      expect(result.current).toHaveLength(0);
    });
  });

  describe("Color Filtering", () => {
    it("should filter cars by color (case insensitive)", () => {
      const filters = { ...defaultFilters, colorFilter: "blue" };

      const { result } = renderHook(() => useCarFilters(mockCars, filters));

      expect(result.current).toHaveLength(1);
      expect(result.current[0].color).toBe("Blue");
    });

    it("should filter cars by partial color name", () => {
      const filters = { ...defaultFilters, colorFilter: "ed" }; // Should match "Red"

      const { result } = renderHook(() => useCarFilters(mockCars, filters));

      expect(result.current).toHaveLength(1);
      expect(result.current[0].color).toBe("Red");
    });

    it("should return all cars when colorFilter is empty", () => {
      const filters = { ...defaultFilters, colorFilter: "" };

      const { result } = renderHook(() => useCarFilters(mockCars, filters));

      expect(result.current).toHaveLength(mockCars.length);
    });
  });

  describe("Make Filtering", () => {
    it("should filter cars by make (case insensitive)", () => {
      const filters = { ...defaultFilters, makeFilter: "audi" };

      const { result } = renderHook(() => useCarFilters(mockCars, filters));

      expect(result.current).toHaveLength(1);
      expect(result.current[0].make).toBe("Audi");
    });

    it("should filter cars by partial make name", () => {
      const filters = { ...defaultFilters, makeFilter: "toy" }; // Should match "Toyota"

      const { result } = renderHook(() => useCarFilters(mockCars, filters));

      expect(result.current).toHaveLength(1);
      expect(result.current[0].make).toBe("Toyota");
    });

    it("should return all cars when makeFilter is empty", () => {
      const filters = { ...defaultFilters, makeFilter: "" };

      const { result } = renderHook(() => useCarFilters(mockCars, filters));

      expect(result.current).toHaveLength(mockCars.length);
    });
  });

  describe("Multiple Filters Combined", () => {
    it("should apply multiple filters together", () => {
      const filters = {
        ...defaultFilters,
        makeFilter: "Audi",
        colorFilter: "Blue",
        yearFilter: 2023,
      };

      const { result } = renderHook(() => useCarFilters(mockCars, filters));

      expect(result.current).toHaveLength(1);
      expect(result.current[0].make).toBe("Audi");
      expect(result.current[0].color).toBe("Blue");
      expect(result.current[0].year).toBe(2023);
    });

    it("should return empty when multiple filters don't match any car", () => {
      const filters = {
        ...defaultFilters,
        makeFilter: "Audi",
        colorFilter: "Green", // No Audi cars are green in our data
        yearFilter: 2023,
      };

      const { result } = renderHook(() => useCarFilters(mockCars, filters));

      expect(result.current).toHaveLength(0);
    });

    it("should combine search term with other filters", () => {
      const filters = {
        ...defaultFilters,
        searchTerm: "Q5",
        makeFilter: "Audi",
      };

      const { result } = renderHook(() => useCarFilters(mockCars, filters));

      expect(result.current).toHaveLength(1);
      expect(result.current[0].model).toBe("Q5");
      expect(result.current[0].make).toBe("Audi");
    });
  });

  describe("Sorting", () => {
    it("should sort cars by make ascending", () => {
      const filters: CarFilters = {
        ...defaultFilters,
        sortBy: "make",
        sortOrder: "asc",
      };

      const { result } = renderHook(() => useCarFilters(mockCars, filters));

      const makes = result.current.map((car) => car.make);
      expect(makes).toEqual(["Audi", "BMW", "Toyota"]);
    });

    it("should sort cars by make descending", () => {
      const filters: CarFilters = {
        ...defaultFilters,
        sortBy: "make",
        sortOrder: "desc",
      };

      const { result } = renderHook(() => useCarFilters(mockCars, filters));

      const makes = result.current.map((car) => car.make);
      expect(makes).toEqual(["Toyota", "BMW", "Audi"]);
    });

    it("should sort cars by year ascending", () => {
      const filters: CarFilters = {
        ...defaultFilters,
        sortBy: "year",
        sortOrder: "asc",
      };

      const { result } = renderHook(() => useCarFilters(mockCars, filters));

      const years = result.current.map((car) => car.year);
      expect(years).toEqual([2021, 2022, 2023]);
    });

    it("should sort cars by year descending", () => {
      const filters = {
        ...defaultFilters,
        sortBy: "year" as SortBy,
        sortOrder: "desc" as SortOrder,
      };

      const { result } = renderHook(() => useCarFilters(mockCars, filters));

      const years = result.current.map((car) => car.year);
      expect(years).toEqual([2023, 2022, 2021]);
    });

    it("should sort cars by model alphabetically", () => {
      const filters: CarFilters = {
        ...defaultFilters,
        sortBy: "model",
        sortOrder: "asc",
      };

      const { result } = renderHook(() => useCarFilters(mockCars, filters));

      const models = result.current.map((car) => car.model);
      expect(models).toEqual(["Camry", "Q5", "X5"]);
    });
  });

  describe("Price Sorting Edge Cases", () => {
    it("should handle cars with undefined price in sorting", () => {
      const carsWithNullPrice: Car[] = [
        { ...mockCars[0], price: undefined },
        { ...mockCars[1], price: 45000 },
        { ...mockCars[2], price: undefined },
      ];

      const filters: CarFilters = {
        ...defaultFilters,
        sortBy: "price",
        sortOrder: "asc",
      };

      const { result } = renderHook(() =>
        useCarFilters(carsWithNullPrice, filters)
      );

      // Cars with undefined price should be treated as 0 and come first
      const prices = result.current.map((car) => car.price ?? 0);
      expect(prices).toEqual([0, 0, 45000]);
    });
  });

  describe("Performance and Memoization", () => {
    it("should return same reference when inputs don't change", () => {
      const { result, rerender } = renderHook(
        ({ cars, filters }) => useCarFilters(cars, filters),
        {
          initialProps: { cars: mockCars, filters: defaultFilters },
        }
      );

      const firstResult = result.current;

      // Rerender with same props
      rerender({ cars: mockCars, filters: defaultFilters });

      // Should return same reference due to useMemo
      expect(result.current).toBe(firstResult);
    });

    it("should return new reference when filters change", () => {
      const { result, rerender } = renderHook(
        ({ cars, filters }) => useCarFilters(cars, filters),
        {
          initialProps: { cars: mockCars, filters: defaultFilters },
        }
      );

      const firstResult = result.current;

      // Rerender with different filters
      const newFilters = { ...defaultFilters, searchTerm: "Q5" };
      rerender({ cars: mockCars, filters: newFilters });

      // Should return new reference
      expect(result.current).not.toBe(firstResult);
    });

    it("should handle large datasets efficiently", () => {
      const largeMockCars = createMockCars(100);
      const filters = { ...defaultFilters, makeFilter: "Make 50" };

      const { result } = renderHook(() =>
        useCarFilters(largeMockCars, filters)
      );

      expect(result.current).toHaveLength(1);
      expect(result.current[0].make).toBe("Make 50");
    });
  });

  describe("String Comparison Edge Cases", () => {
    it("should handle special characters in search", () => {
      const specialCars: Car[] = [
        { ...mockCars[0], model: "Q5-Sport" },
        { ...mockCars[1], model: "X5 M-Power" },
      ];

      const filters = { ...defaultFilters, searchTerm: "Q5-" };

      const { result } = renderHook(() => useCarFilters(specialCars, filters));

      expect(result.current).toHaveLength(1);
      expect(result.current[0].model).toBe("Q5-Sport");
    });

    it("should handle unicode characters", () => {
      const unicodeCars: Car[] = [
        { ...mockCars[0], make: "Citroën" },
        { ...mockCars[1], make: "BMW" },
      ];

      const filters = { ...defaultFilters, makeFilter: "citroën" };

      const { result } = renderHook(() => useCarFilters(unicodeCars, filters));

      expect(result.current).toHaveLength(1);
      expect(result.current[0].make).toBe("Citroën");
    });
  });
});
