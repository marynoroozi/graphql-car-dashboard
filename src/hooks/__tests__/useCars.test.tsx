import { renderHook, act } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { useCars } from "../useCars";
import { GET_CARS } from "../../graphql/queries";

const mocks = [
  {
    request: {
      query: GET_CARS,
    },
    result: {
      data: {
        cars: [
          {
            id: "1",
            make: "Audi",
            model: "Q5",
            year: 2023,
            color: "Blue",
            mobile: "https://example.com/mobile.jpg",
            tablet: "https://example.com/tablet.jpg",
            desktop: "https://example.com/desktop.jpg",
          },
          {
            id: "2",
            make: "BMW",
            model: "X5",
            year: 2022,
            color: "Red",
            mobile: "https://example.com/bmw-mobile.jpg",
            tablet: "https://example.com/bmw-tablet.jpg",
            desktop: "https://example.com/bmw-desktop.jpg",
          },
        ],
      },
    },
  },
];

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MockedProvider mocks={mocks} addTypename={false}>
    {children}
  </MockedProvider>
);

describe("useCars", () => {
  it("should return initial state", () => {
    const { result } = renderHook(() => useCars(), { wrapper });

    expect(result.current.cars).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.searchTerm).toBe("");
    expect(result.current.sortBy).toBe("make");
    expect(result.current.sortOrder).toBe("asc");
  });

  it("should filter cars by search term", async () => {
    const { result, rerender } = renderHook(() => useCars(), { wrapper });

    // Wait for data to load
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    rerender();

    // Test filtering
    act(() => {
      result.current.setSearchTerm("Q5");
    });

    expect(result.current.cars).toHaveLength(1);
    expect(result.current.cars[0].model).toBe("Q5");
  });

  it("should add new car to local state", async () => {
    const { result, rerender } = renderHook(() => useCars(), { wrapper });

    // Wait for data to load
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    rerender();

    const initialCount = result.current.cars.length;

    act(() => {
      result.current.addCar({
        make: "Mercedes",
        model: "C-Class",
        year: 2024,
        color: "White",
        mobile: "https://example.com/mercedes-mobile.jpg",
        tablet: "https://example.com/mercedes-tablet.jpg",
        desktop: "https://example.com/mercedes-desktop.jpg",
      });
    });

    expect(result.current.cars).toHaveLength(initialCount + 1);
    expect(result.current.cars.some((car) => car.model === "C-Class")).toBe(
      true
    );
  });

  it("should sort cars correctly", async () => {
    const { result, rerender } = renderHook(() => useCars(), { wrapper });

    // Wait for data to load
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    rerender();

    // Test sorting by year descending
    act(() => {
      result.current.setSortBy("year");
      result.current.setSortOrder("desc");
    });

    expect(result.current.cars[0].year).toBeGreaterThanOrEqual(
      result.current.cars[1].year
    );
  });
});
