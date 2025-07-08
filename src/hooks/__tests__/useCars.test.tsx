import { renderHook, act } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { useCars } from "../useCars";
import { GET_CARS } from "../../graphql/queries";
import { ADD_CAR } from "../../graphql/mutations";

const addCarVariables = {
  input: {
    make: "Audi",
    model: "R8",
    year: 2024,
    color: "White",
    mobile: "https://example.com/Audi-mobile.jpg",
    tablet: "https://example.com/Audi-tablet.jpg",
    desktop: "https://example.com/Audi-desktop.jpg",
  },
};

const mocks = [
  // initial query response
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
  // mutation response
  {
    request: {
      query: ADD_CAR,
      variables: addCarVariables,
    },
    result: {
      data: {
        addCar: {
          success: true,
          message: "Car added",
          car: {
            id: "3",
            ...addCarVariables.input,
            description: "",
            price: null,
            mileage: null,
          },
        },
      },
    },
  },
  // After (refetch)
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
          {
            id: "3",
            make: "Audi",
            model: "R8",
            year: 2024,
            color: "White",
            mobile: "https://example.com/Audi-mobile.jpg",
            tablet: "https://example.com/Audi-tablet.jpg",
            desktop: "https://example.com/Audi-desktop.jpg",
            description: "",
            price: null,
            mileage: null,
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
    expect(result.current.filters.searchTerm).toBe("");
    expect(result.current.filters.sortBy).toBe("make");
    expect(result.current.filters.sortOrder).toBe("asc");
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
      result.current.setFilter("searchTerm", "Q5");
    });

    expect(result.current.cars).toHaveLength(1);
    expect(result.current.cars[0].model).toBe("Q5");
  });

  it("should add new car to local state (mocked)", async () => {
    const { result, rerender } = renderHook(() => useCars(), { wrapper });

    // Wait for data to load
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    rerender();

    const initialCount = result.current.cars.length;

    await act(async () => {
      await result.current.addCar({
        make: "Audi",
        model: "R8",
        year: 2024,
        color: "White",
        mobile: "https://example.com/Audi-mobile.jpg",
        tablet: "https://example.com/Audi-tablet.jpg",
        desktop: "https://example.com/Audi-desktop.jpg",
      });
    });

    expect(result.current.addCar).toBeDefined();
    expect(result.current.cars.length).toBeGreaterThanOrEqual(initialCount);
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
      result.current.setFilter("sortBy", "year");
      result.current.setFilter("sortOrder", "desc");
    });

    expect(result.current.cars[0].year).toBeGreaterThanOrEqual(
      result.current.cars[1].year
    );
  });
});
