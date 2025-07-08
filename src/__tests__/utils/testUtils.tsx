// React Wrappers & GraphQL Mocks
import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import { CarProvider } from "../../contexts/CarContext";
import { GET_CARS } from "../../graphql/queries";
import { ADD_CAR } from "../../graphql/mutations";
import {
  mockCars,
  newCarInput,
  newCarResponse,
  updatedMockCars,
} from "./mockData";

// GraphQL Mocks
export const createSuccessMocks = (cars: typeof mockCars = mockCars) => [
  {
    request: { query: GET_CARS },
    result: { data: { cars } },
  },
  {
    request: { query: ADD_CAR, variables: { input: newCarInput } },
    result: {
      data: {
        addCar: {
          success: true,
          message: "Car added successfully",
          car: newCarResponse,
        },
      },
    },
  },
  // Additional GET_CARS for refetch after mutation
  {
    request: { query: GET_CARS },
    result: { data: { cars: updatedMockCars } },
  },
  // Extra GET_CARS mocks for multiple refetches
  {
    request: { query: GET_CARS },
    result: { data: { cars: updatedMockCars } },
  },
];

export const createErrorMocks = (errorMessage = "Network error occurred") => [
  {
    request: { query: GET_CARS },
    error: new Error(errorMessage),
  },
];

export const createLoadingMocks = () => [
  {
    request: { query: GET_CARS },
    result: () => new Promise(() => {}), // Never resolves
  },
];

export const createEmptyDataMocks = () => [
  {
    request: { query: GET_CARS },
    result: { data: { cars: [] } },
  },
];

export const createAddCarErrorMocks = () => [
  {
    request: { query: GET_CARS },
    result: { data: { cars: mockCars } },
  },
  {
    request: { query: ADD_CAR, variables: { input: newCarInput } },
    error: new Error("Failed to add car"),
  },
  // Additional GET_CARS mock in case of retry
  {
    request: { query: GET_CARS },
    result: { data: { cars: mockCars } },
  },
];

// Helper function to create multiple GET_CARS mocks for refetch testing
export const createRefetchMocks = (
  cars: typeof mockCars = mockCars,
  count: number = 3
) => {
  const mocks = [];
  for (let i = 0; i < count; i++) {
    mocks.push({
      request: { query: GET_CARS },
      result: { data: { cars } },
    });
  }
  return mocks;
};

// React Wrappers
interface TestWrapperProps {
  children: React.ReactNode;
  mocks?: any[];
  addTypename?: boolean;
}

export const ApolloWrapper: React.FC<TestWrapperProps> = ({
  children,
  mocks = successMocks,
  addTypename = false,
}) => (
  <MockedProvider mocks={mocks} addTypename={addTypename}>
    {children}
  </MockedProvider>
);

export const FullContextWrapper: React.FC<TestWrapperProps> = ({
  children,
  mocks = successMocks,
  addTypename = false,
}) => (
  <MockedProvider mocks={mocks} addTypename={addTypename}>
    <CarProvider>{children}</CarProvider>
  </MockedProvider>
);

// Default mocks
export const successMocks = createSuccessMocks();
export const errorMocks = createErrorMocks();
export const loadingMocks = createLoadingMocks();
export const emptyDataMocks = createEmptyDataMocks();
export const addCarErrorMocks = createAddCarErrorMocks();

// Specialized wrappers for different scenarios
export const ErrorWrapper: React.FC<{
  children: React.ReactNode;
  errorMessage?: string;
}> = ({ children, errorMessage }) => (
  <FullContextWrapper mocks={createErrorMocks(errorMessage)}>
    {children}
  </FullContextWrapper>
);

export const LoadingWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <FullContextWrapper mocks={loadingMocks}>{children}</FullContextWrapper>;

export const EmptyDataWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <FullContextWrapper mocks={emptyDataMocks}>{children}</FullContextWrapper>
);
