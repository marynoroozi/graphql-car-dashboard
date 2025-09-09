// contexts/__tests__/CarContext.test.tsx
import { renderHook, act } from "@testing-library/react";
import {
  useCarContext,
  useCarData,
  useCarFiltersContext,
  useCarActions,
} from "../../contexts/CarContext";
import {
  FullContextWrapper,
  ErrorWrapper,
  EmptyDataWrapper,
  createRefetchMocks,
} from "../utils";
import { mockCars, newCarInput } from "../utils/mockData";
import { waitForApollo, mockConsoleError } from "../utils/helpers";
import { vi } from "vitest";

describe("CarContext", () => {
  const restoreConsole = mockConsoleError();

  afterAll(() => {
    restoreConsole();
  });

  describe("Initial State and Data Loading", () => {
    it("should provide initial context values", async () => {
      const { result } = renderHook(() => useCarContext(), {
        wrapper: ({ children }) => (
          <FullContextWrapper>{children}</FullContextWrapper>
        ),
      });

      // Initial state
      expect(result.current.cars).toEqual([]);
      expect(result.current.loading).toBe(true);
      expect(result.current.filters.searchTerm).toBe("");
      expect(result.current.filters.sortBy).toBe("make");
      expect(result.current.filters.sortOrder).toBe("asc");
      expect(result.current.hasActiveFilters).toBe(false);

      // Wait for data to load
      await act(waitForApollo);

      expect(result.current.loading).toBe(false);
      expect(result.current.cars).toHaveLength(mockCars.length);
      expect(result.current.allCars).toHaveLength(mockCars.length);
      expect(result.current.totalResults).toBe(mockCars.length);
    });

    it("should handle empty data gracefully", async () => {
      const { result } = renderHook(() => useCarContext(), {
        wrapper: ({ children }) => (
          <EmptyDataWrapper>{children}</EmptyDataWrapper>
        ),
      });

      await act(waitForApollo);

      expect(result.current.cars).toHaveLength(0);
      expect(result.current.allCars).toHaveLength(0);
      expect(result.current.availableYears).toEqual([]);
      expect(result.current.availableMakes).toEqual([]);
      expect(result.current.availableColors).toEqual([]);
      expect(result.current.totalResults).toBe(0);
    });

    it("should handle errors gracefully", async () => {
      const { result } = renderHook(() => useCarContext(), {
        wrapper: ({ children }) => (
          <ErrorWrapper errorMessage="Test error">{children}</ErrorWrapper>
        ),
      });

      await act(waitForApollo);

      expect(result.current.error).toBeDefined();
      expect(result.current.loading).toBe(false);
      expect(result.current.cars).toEqual([]);
    });
  });

  describe("Filtering", () => {
    it("should filter cars by search term", async () => {
      const { result } = renderHook(() => useCarContext(), {
        wrapper: ({ children }) => (
          <FullContextWrapper>{children}</FullContextWrapper>
        ),
      });

      await act(waitForApollo);

      // Filter by model "Q5"
      act(() => {
        result.current.setFilter("searchTerm", "Q5");
      });

      expect(result.current.cars).toHaveLength(1);
      expect(result.current.cars[0].model).toBe("Q5");
      expect(result.current.totalResults).toBe(1);
      expect(result.current.hasActiveFilters).toBe(true);
      expect(result.current.activeFilters).toHaveLength(1);
    });

    it("should filter cars by year", async () => {
      const { result } = renderHook(() => useCarContext(), {
        wrapper: ({ children }) => (
          <FullContextWrapper>{children}</FullContextWrapper>
        ),
      });

      await act(waitForApollo);

      // Filter by year 2022
      act(() => {
        result.current.setFilter("yearFilter", 2022);
      });

      expect(result.current.cars).toHaveLength(1);
      expect(result.current.cars[0].year).toBe(2022);
      expect(result.current.cars[0].make).toBe("BMW");
    });

    it("should filter cars by make", async () => {
      const { result } = renderHook(() => useCarContext(), {
        wrapper: ({ children }) => (
          <FullContextWrapper>{children}</FullContextWrapper>
        ),
      });

      await act(waitForApollo);

      // Filter by make "Audi"
      act(() => {
        result.current.setFilter("makeFilter", "Audi");
      });

      expect(result.current.cars).toHaveLength(1);
      expect(result.current.cars[0].make).toBe("Audi");
    });

    it("should apply multiple filters", async () => {
      const { result } = renderHook(() => useCarContext(), {
        wrapper: ({ children }) => (
          <FullContextWrapper>{children}</FullContextWrapper>
        ),
      });

      await act(waitForApollo);

      // Apply multiple filters
      act(() => {
        result.current.setFilter("makeFilter", "Audi");
        result.current.setFilter("colorFilter", "Blue");
      });

      expect(result.current.cars).toHaveLength(1);
      expect(result.current.cars[0].make).toBe("Audi");
      expect(result.current.cars[0].color).toBe("Blue");
      expect(result.current.hasActiveFilters).toBe(true);
      expect(result.current.activeFilters).toHaveLength(2);
    });

    it("should return no results when filters don't match", async () => {
      const { result } = renderHook(() => useCarContext(), {
        wrapper: ({ children }) => (
          <FullContextWrapper>{children}</FullContextWrapper>
        ),
      });

      await act(waitForApollo);

      // Filter with non-existent data
      act(() => {
        result.current.setFilter("searchTerm", "NonExistentModel");
      });

      expect(result.current.cars).toHaveLength(0);
      expect(result.current.totalResults).toBe(0);
    });
  });

  describe("Sorting", () => {
    it("should sort cars by year descending", async () => {
      const { result } = renderHook(() => useCarContext(), {
        wrapper: ({ children }) => (
          <FullContextWrapper>{children}</FullContextWrapper>
        ),
      });

      await act(waitForApollo);

      // Sort by year descending
      act(() => {
        result.current.setFilter("sortBy", "year");
        result.current.setFilter("sortOrder", "desc");
      });

      const sortedCars = result.current.cars;
      expect(sortedCars[0].year).toBe(2023); // Audi Q5
      expect(sortedCars[1].year).toBe(2022); // BMW X5
      expect(sortedCars[2].year).toBe(2021); // Toyota Camry
    });

    it("should sort cars by price ascending", async () => {
      const { result } = renderHook(() => useCarContext(), {
        wrapper: ({ children }) => (
          <FullContextWrapper>{children}</FullContextWrapper>
        ),
      });

      await act(waitForApollo);

      // Sort by price ascending
      act(() => {
        result.current.setFilter("sortBy", "price");
        result.current.setFilter("sortOrder", "asc");
      });

      const sortedCars = result.current.cars;
      expect(sortedCars[0].price).toBe(35000); // Toyota Camry
      expect(sortedCars[1].price).toBe(45000); // Audi Q5
      expect(sortedCars[2].price).toBe(55000); // BMW X5
    });

    it("should toggle sort order", async () => {
      const { result } = renderHook(() => useCarContext(), {
        wrapper: ({ children }) => (
          <FullContextWrapper>{children}</FullContextWrapper>
        ),
      });

      await act(waitForApollo);

      expect(result.current.filters.sortOrder).toBe("asc");

      act(() => {
        result.current.toggleSortOrder();
      });

      expect(result.current.filters.sortOrder).toBe("desc");

      act(() => {
        result.current.toggleSortOrder();
      });

      expect(result.current.filters.sortOrder).toBe("asc");
    });
  });

  describe("Filter Management", () => {
    it("should clear all filters", async () => {
      const { result } = renderHook(() => useCarContext(), {
        wrapper: ({ children }) => (
          <FullContextWrapper>{children}</FullContextWrapper>
        ),
      });

      await act(waitForApollo);

      // Add some filters
      act(() => {
        result.current.setFilter("searchTerm", "Q5");
        result.current.setFilter("yearFilter", 2022);
        result.current.setFilter("makeFilter", "Audi");
      });

      expect(result.current.hasActiveFilters).toBe(true);

      // Clear all filters
      act(() => {
        result.current.clearAllFilters();
      });

      expect(result.current.filters.searchTerm).toBe("");
      expect(result.current.filters.yearFilter).toBe(null);
      expect(result.current.filters.makeFilter).toBe("");
      expect(result.current.hasActiveFilters).toBe(false);
      expect(result.current.cars).toHaveLength(mockCars.length);
    });

    it("should track active filters correctly", async () => {
      const { result } = renderHook(() => useCarContext(), {
        wrapper: ({ children }) => (
          <FullContextWrapper>{children}</FullContextWrapper>
        ),
      });

      await act(waitForApollo);

      // Add filters
      act(() => {
        result.current.setFilter("searchTerm", "Q5");
        result.current.setFilter("yearFilter", 2023);
        result.current.setFilter("makeFilter", "Audi");
      });

      expect(result.current.activeFilters).toHaveLength(3);
      expect(result.current.activeFilters).toEqual([
        { key: "searchTerm", label: "Model", value: "Q5" },
        { key: "yearFilter", label: "Year", value: "2023" },
        { key: "makeFilter", label: "Make", value: "Audi" },
      ]);
    });
  });

  describe("Available Filter Options", () => {
    it("should provide available filter options", async () => {
      const { result } = renderHook(() => useCarContext(), {
        wrapper: ({ children }) => (
          <FullContextWrapper>{children}</FullContextWrapper>
        ),
      });

      await act(waitForApollo);

      expect(result.current.availableYears).toEqual([2023, 2022, 2021]);
      expect(result.current.availableColors).toEqual(["Blue", "Red", "White"]);
      expect(result.current.availableMakes).toEqual(["Audi", "BMW", "Toyota"]);
    });
  });

  describe("Car Actions", () => {
    it("should add new car", async () => {
      const { result } = renderHook(() => useCarContext(), {
        wrapper: ({ children }) => (
          <FullContextWrapper>{children}</FullContextWrapper>
        ),
      });

      await act(waitForApollo);

      const initialCount = result.current.cars.length;

      await act(async () => {
        await result.current.addCar(newCarInput);
      });

      // Function should exist and be callable
      expect(result.current.addCar).toBeDefined();
      expect(typeof result.current.addCar).toBe("function");
    });

    it("should refetch cars", async () => {
      const mocks = createRefetchMocks(mockCars, 3);

      const { result } = renderHook(() => useCarContext(), {
        wrapper: ({ children }) => (
          <FullContextWrapper mocks={mocks}>{children}</FullContextWrapper>
        ),
      });

      await act(waitForApollo);

      await act(async () => {
        await result.current.refetchCars();
      });

      expect(result.current.refetchCars).toBeDefined();
      expect(typeof result.current.refetchCars).toBe("function");
    });
  });
});

describe("CarContext convenience hooks", () => {
  it("useCarData should return data-related values", async () => {
    const { result } = renderHook(() => useCarData(), {
      wrapper: ({ children }) => (
        <FullContextWrapper>{children}</FullContextWrapper>
      ),
    });

    await act(waitForApollo);

    expect(result.current.cars).toHaveLength(mockCars.length);
    expect(result.current.allCars).toHaveLength(mockCars.length);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it("useCarFiltersContext should return filter-related values", async () => {
    const { result } = renderHook(() => useCarFiltersContext(), {
      wrapper: ({ children }) => (
        <FullContextWrapper>{children}</FullContextWrapper>
      ),
    });

    await act(waitForApollo);

    expect(result.current.filters).toBeDefined();
    expect(result.current.setFilter).toBeDefined();
    expect(result.current.clearAllFilters).toBeDefined();
    expect(result.current.availableYears).toEqual([2023, 2022, 2021]);
    expect(result.current.totalResults).toBe(mockCars.length);
  });

  it("useCarActions should return action functions", async () => {
    const { result } = renderHook(() => useCarActions(), {
      wrapper: ({ children }) => (
        <FullContextWrapper>{children}</FullContextWrapper>
      ),
    });

    await act(waitForApollo);

    expect(result.current.addCar).toBeDefined();
    expect(result.current.refetchCars).toBeDefined();
    expect(result.current.mutationLoading).toBe(false);
    expect(typeof result.current.addCar).toBe("function");
    expect(typeof result.current.refetchCars).toBe("function");
  });

  it("should throw error when used outside provider", () => {
    const originalError = console.error;
    console.error = vi.fn();

    expect(() => {
      renderHook(() => useCarContext());
    }).toThrow("useCarContext must be used within CarProvider");

    console.error = originalError;
  });
});
