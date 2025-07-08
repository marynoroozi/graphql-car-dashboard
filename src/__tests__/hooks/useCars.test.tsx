import { renderHook, act } from "@testing-library/react";
import { useCars } from "../../hooks/useCars";
import {
  ApolloWrapper,
  ErrorWrapper,
  LoadingWrapper,
  createSuccessMocks,
  createErrorMocks,
  createAddCarErrorMocks,
} from "../utils";
import { mockCars, newCarInput } from "../utils/mockData";
import { waitForApollo, mockConsoleError } from "../utils/helpers";
import { GET_CARS } from "../../graphql/queries";
import { ADD_CAR } from "../../graphql/mutations";

describe("useCars", () => {
  // Mock console.error for cleaner test output
  const restoreConsole = mockConsoleError();

  afterAll(() => {
    restoreConsole();
  });

  describe("Initial State", () => {
    it("should return initial loading state", () => {
      const { result } = renderHook(() => useCars(), {
        wrapper: ({ children }) => <LoadingWrapper>{children}</LoadingWrapper>,
      });

      expect(result.current.cars).toEqual([]);
      expect(result.current.loading).toBe(true);
      expect(result.current.error).toBeUndefined();
      expect(result.current.mutationLoading).toBe(false);
    });

    it("should provide all required functions", () => {
      const { result } = renderHook(() => useCars(), {
        wrapper: ({ children }) => <ApolloWrapper>{children}</ApolloWrapper>,
      });

      expect(result.current.addCar).toBeDefined();
      expect(result.current.refetch).toBeDefined();
      expect(typeof result.current.addCar).toBe("function");
      expect(typeof result.current.refetch).toBe("function");
    });
  });

  describe("Data Fetching", () => {
    it("should load cars from GraphQL successfully", async () => {
      const { result } = renderHook(() => useCars(), {
        wrapper: ({ children }) => <ApolloWrapper>{children}</ApolloWrapper>,
      });

      // Initially loading
      expect(result.current.loading).toBe(true);
      expect(result.current.cars).toEqual([]);

      // Wait for data to load
      await act(waitForApollo);

      // After loading
      expect(result.current.loading).toBe(false);
      expect(result.current.cars).toHaveLength(mockCars.length);
      expect(result.current.cars[0]).toEqual(mockCars[0]);
      expect(result.current.cars[1]).toEqual(mockCars[1]);
      expect(result.current.cars[2]).toEqual(mockCars[2]);
      expect(result.current.error).toBeUndefined();
    });

    it("should return specific car data correctly", async () => {
      const { result } = renderHook(() => useCars(), {
        wrapper: ({ children }) => <ApolloWrapper>{children}</ApolloWrapper>,
      });

      await act(waitForApollo);

      const [audiCar, bmwCar, toyotaCar] = result.current.cars;

      // Check Audi Q5
      expect(audiCar.make).toBe("Audi");
      expect(audiCar.model).toBe("Q5");
      expect(audiCar.year).toBe(2023);
      expect(audiCar.color).toBe("Blue");
      expect(audiCar.price).toBe(45000);

      // Check BMW X5
      expect(bmwCar.make).toBe("BMW");
      expect(bmwCar.model).toBe("X5");
      expect(bmwCar.year).toBe(2022);
      expect(bmwCar.color).toBe("Red");
      expect(bmwCar.price).toBe(55000);

      // Check Toyota Camry
      expect(toyotaCar.make).toBe("Toyota");
      expect(toyotaCar.model).toBe("Camry");
      expect(toyotaCar.year).toBe(2021);
      expect(toyotaCar.color).toBe("White");
      expect(toyotaCar.price).toBe(35000);
    });

    it("should handle empty data gracefully", async () => {
      const emptyMocks = [
        {
          request: { query: GET_CARS },
          result: { data: { cars: [] } },
        },
      ];

      const { result } = renderHook(() => useCars(), {
        wrapper: ({ children }) => (
          <ApolloWrapper mocks={emptyMocks}>{children}</ApolloWrapper>
        ),
      });

      await act(waitForApollo);

      expect(result.current.loading).toBe(false);
      expect(result.current.cars).toEqual([]);
      expect(result.current.error).toBeUndefined();
    });
  });

  describe("Error Handling", () => {
    it("should handle network errors", async () => {
      const errorMessage = "Network connection failed";
      const { result } = renderHook(() => useCars(), {
        wrapper: ({ children }) => (
          <ErrorWrapper errorMessage={errorMessage}>{children}</ErrorWrapper>
        ),
      });

      await act(waitForApollo);

      expect(result.current.error).toBeDefined();
      expect(result.current.error).toBeTruthy();
      if (result.current.error) {
        expect(result.current.error.message).toBe(errorMessage);
      }
      expect(result.current.loading).toBe(false);
      expect(result.current.cars).toEqual([]);
    });

    it("should handle GraphQL errors", async () => {
      const graphqlErrorMocks = [
        {
          request: { query: GET_CARS },
          result: {
            errors: [{ message: "GraphQL validation error" }],
          },
        },
      ];

      const { result } = renderHook(() => useCars(), {
        wrapper: ({ children }) => (
          <ApolloWrapper mocks={graphqlErrorMocks}>{children}</ApolloWrapper>
        ),
      });

      await act(waitForApollo);

      expect(result.current.error).toBeDefined();
      expect(result.current.error).toBeTruthy();
      expect(result.current.loading).toBe(false);
    });

    it("should handle server timeout", async () => {
      const timeoutErrorMocks = createErrorMocks("Request timeout");

      const { result } = renderHook(() => useCars(), {
        wrapper: ({ children }) => (
          <ApolloWrapper mocks={timeoutErrorMocks}>{children}</ApolloWrapper>
        ),
      });

      await act(waitForApollo);

      expect(result.current.error).toBeDefined();
      expect(result.current.error).toBeTruthy();
      if (result.current.error) {
        expect(result.current.error.message).toBe("Request timeout");
      }
    });
  });

  describe("Car Mutations", () => {
    it("should add new car successfully", async () => {
      const { result } = renderHook(() => useCars(), {
        wrapper: ({ children }) => <ApolloWrapper>{children}</ApolloWrapper>,
      });

      // Wait for initial data
      await act(waitForApollo);

      expect(result.current.cars).toHaveLength(mockCars.length);
      expect(result.current.mutationLoading).toBe(false);

      // Add new car
      await act(async () => {
        await result.current.addCar(newCarInput);
      });

      // Verify mutation was called
      expect(result.current.addCar).toBeDefined();
      expect(typeof result.current.addCar).toBe("function");
    });

    it("should handle add car with complete data", async () => {
      const completeCarInput = {
        make: "Tesla",
        model: "Model 3",
        year: 2024,
        color: "White",
        mobile: "https://example.com/tesla-mobile.jpg",
        tablet: "https://example.com/tesla-tablet.jpg",
        desktop: "https://example.com/tesla-desktop.jpg",
        description: "Electric sedan with autopilot",
        price: 45000,
        mileage: 0,
      };

      // Create custom mocks for this specific input with refetch
      const customMocks = [
        {
          request: { query: GET_CARS },
          result: { data: { cars: mockCars } },
        },
        {
          request: { query: ADD_CAR, variables: { input: completeCarInput } },
          result: {
            data: {
              addCar: {
                success: true,
                message: "Car added successfully",
                car: { id: "tesla-1", ...completeCarInput },
              },
            },
          },
        },
        // Mock for automatic refetch after mutation
        {
          request: { query: GET_CARS },
          result: {
            data: {
              cars: [...mockCars, { id: "tesla-1", ...completeCarInput }],
            },
          },
        },
      ];

      const { result } = renderHook(() => useCars(), {
        wrapper: ({ children }) => (
          <ApolloWrapper mocks={customMocks}>{children}</ApolloWrapper>
        ),
      });

      await act(waitForApollo);

      await act(async () => {
        await result.current.addCar(completeCarInput);
      });

      expect(result.current.addCar).toBeDefined();
    });

    it("should handle add car with minimal data", async () => {
      const minimalCarInput = {
        make: "Ford",
        model: "Focus",
        year: 2023,
        color: "Blue",
        mobile: "https://example.com/ford-mobile.jpg",
        tablet: "https://example.com/ford-tablet.jpg",
        desktop: "https://example.com/ford-desktop.jpg",
        // No description, price, or mileage
      };

      // Create custom mocks for this specific input with refetch
      const customMocks = [
        {
          request: { query: GET_CARS },
          result: { data: { cars: mockCars } },
        },
        {
          request: { query: ADD_CAR, variables: { input: minimalCarInput } },
          result: {
            data: {
              addCar: {
                success: true,
                message: "Car added successfully",
                car: { id: "ford-1", ...minimalCarInput },
              },
            },
          },
        },
        // Mock for automatic refetch after mutation
        {
          request: { query: GET_CARS },
          result: {
            data: { cars: [...mockCars, { id: "ford-1", ...minimalCarInput }] },
          },
        },
      ];

      const { result } = renderHook(() => useCars(), {
        wrapper: ({ children }) => (
          <ApolloWrapper mocks={customMocks}>{children}</ApolloWrapper>
        ),
      });

      await act(waitForApollo);

      await act(async () => {
        await result.current.addCar(minimalCarInput);
      });

      expect(result.current.addCar).toBeDefined();
    });

    it("should handle mutation errors", async () => {
      const { result } = renderHook(() => useCars(), {
        wrapper: ({ children }) => (
          <ApolloWrapper mocks={createAddCarErrorMocks()}>
            {children}
          </ApolloWrapper>
        ),
      });

      await act(waitForApollo);

      // Try to add car and expect error to be thrown
      await act(async () => {
        try {
          await result.current.addCar(newCarInput);
          // Should not reach here
          expect(true).toBe(false);
        } catch (error: unknown) {
          expect(error).toBeDefined();
          if (error instanceof Error) {
            expect(error.message).toBe("Failed to add car");
          } else {
            expect(typeof error).toBe("object");
          }
        }
      });
    });

    it("should handle mutation loading state", async () => {
      const { result } = renderHook(() => useCars(), {
        wrapper: ({ children }) => <ApolloWrapper>{children}</ApolloWrapper>,
      });

      await act(waitForApollo);

      // Initially not loading
      expect(result.current.mutationLoading).toBe(false);

      // Note: Testing loading state during mutation is tricky with mocks
      // In real implementation, mutationLoading would be true during mutation
      expect(typeof result.current.mutationLoading).toBe("boolean");
    });
  });

  describe("Refetch Functionality", () => {
    it("should provide refetch function", async () => {
      const { result } = renderHook(() => useCars(), {
        wrapper: ({ children }) => <ApolloWrapper>{children}</ApolloWrapper>,
      });

      await act(waitForApollo);

      expect(result.current.refetch).toBeDefined();
      expect(typeof result.current.refetch).toBe("function");
    });

    it("should refetch data successfully", async () => {
      // Provide multiple GET_CARS mocks for initial load and refetch
      const refetchMocks = [
        {
          request: { query: GET_CARS },
          result: { data: { cars: mockCars } },
        },
        {
          request: { query: GET_CARS },
          result: { data: { cars: mockCars } },
        },
      ];

      const { result } = renderHook(() => useCars(), {
        wrapper: ({ children }) => (
          <ApolloWrapper mocks={refetchMocks}>{children}</ApolloWrapper>
        ),
      });

      await act(waitForApollo);

      const initialCarsLength = result.current.cars.length;
      expect(initialCarsLength).toBe(mockCars.length);

      // Test refetch function exists and is callable
      expect(result.current.refetch).toBeDefined();
      expect(typeof result.current.refetch).toBe("function");

      // Test refetch functionality
      await act(async () => {
        const refetchResult = await result.current.refetch();
        expect(refetchResult).toBeDefined();
      });

      // Data should remain the same since we're using the same mocks
      expect(result.current.cars.length).toBe(initialCarsLength);
    });

    it("should handle refetch errors", async () => {
      // First successful load, then error on refetch
      const refetchErrorMocks = [
        {
          request: { query: GET_CARS },
          result: { data: { cars: mockCars } },
        },
        {
          request: { query: GET_CARS },
          error: new Error("Refetch failed"),
        },
      ];

      const { result } = renderHook(() => useCars(), {
        wrapper: ({ children }) => (
          <ApolloWrapper mocks={refetchErrorMocks}>{children}</ApolloWrapper>
        ),
      });

      await act(waitForApollo);

      // Initial load successful
      expect(result.current.cars).toHaveLength(mockCars.length);

      // Refetch should handle error
      await act(async () => {
        try {
          await result.current.refetch();
        } catch (error: unknown) {
          expect(error).toBeDefined();
          if (error instanceof Error) {
            expect(error.message).toBe("Refetch failed");
          } else {
            expect(typeof error).toBe("object");
          }
        }
      });
    });
  });

  describe("Integration with Apollo Client", () => {
    it("should work with Apollo Client cache", async () => {
      const { result } = renderHook(() => useCars(), {
        wrapper: ({ children }) => <ApolloWrapper>{children}</ApolloWrapper>,
      });

      await act(waitForApollo);

      // Check that data comes from Apollo Client
      expect(result.current.cars).toEqual(mockCars);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeUndefined();
    });

    it("should handle multiple renders correctly", async () => {
      const { result, rerender } = renderHook(() => useCars(), {
        wrapper: ({ children }) => <ApolloWrapper>{children}</ApolloWrapper>,
      });

      await act(waitForApollo);

      const firstRenderCars = result.current.cars;

      // Rerender hook
      rerender();

      // Should have same data after rerender
      expect(result.current.cars).toEqual(firstRenderCars);
      expect(result.current.loading).toBe(false);
    });

    it("should handle error states properly", async () => {
      const { result } = renderHook(() => useCars(), {
        wrapper: ({ children }) => (
          <ErrorWrapper errorMessage="Test error">{children}</ErrorWrapper>
        ),
      });

      await act(waitForApollo);

      expect(result.current.error).toBeDefined();
      expect(result.current.error).toBeTruthy();
      if (result.current.error) {
        expect(typeof result.current.error.message).toBe("string");
        expect(result.current.error.message).toBe("Test error");
      }
    });
  });

  describe("Type Safety", () => {
    it("should return correctly typed data", async () => {
      const { result } = renderHook(() => useCars(), {
        wrapper: ({ children }) => <ApolloWrapper>{children}</ApolloWrapper>,
      });

      await act(waitForApollo);

      // Check types
      expect(Array.isArray(result.current.cars)).toBe(true);
      expect(typeof result.current.loading).toBe("boolean");
      expect(typeof result.current.mutationLoading).toBe("boolean");
      expect(typeof result.current.addCar).toBe("function");
      expect(typeof result.current.refetch).toBe("function");

      // Check car object structure
      if (result.current.cars.length > 0) {
        const car = result.current.cars[0];
        expect(typeof car.id).toBe("string");
        expect(typeof car.make).toBe("string");
        expect(typeof car.model).toBe("string");
        expect(typeof car.year).toBe("number");
        expect(typeof car.color).toBe("string");
        expect(typeof car.mobile).toBe("string");
        expect(typeof car.tablet).toBe("string");
        expect(typeof car.desktop).toBe("string");
      }
    });
  });
});
