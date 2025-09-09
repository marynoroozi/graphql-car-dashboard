import type { Car } from "../../types/car.types";
import { vi } from "vitest";

// Async helpers
export const waitForApollo = (): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, 0));

export const waitFor = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Mock car factory
export const createMockCar = (overrides: Partial<Car> = {}): Car => ({
  id: Math.random().toString(36).substr(2, 9),
  make: "Test Make",
  model: "Test Model",
  year: 2023,
  color: "Test Color",
  mobile: "https://example.com/test-mobile.jpg",
  tablet: "https://example.com/test-tablet.jpg",
  desktop: "https://example.com/test-desktop.jpg",
  description: "Test description",
  price: 30000,
  mileage: 10000,
  ...overrides,
});

// Create multiple cars with pattern
export const createMockCars = (
  count: number,
  baseData?: Partial<Car>
): Car[] => {
  return Array.from({ length: count }, (_, index) =>
    createMockCar({
      id: `test-${index + 1}`,
      make: `Make ${index + 1}`,
      model: `Model ${index + 1}`,
      year: 2020 + index,
      ...baseData,
    })
  );
};

// Mock console methods
export const mockConsoleError = (): (() => void) => {
  const originalError = console.error;
  console.error = vi.fn();

  return () => {
    console.error = originalError;
  };
};

// Array helpers
export const sortByField = <T>(
  array: T[],
  field: keyof T,
  order: "asc" | "desc" = "asc"
): T[] => {
  return [...array].sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];

    if (aValue < bValue) return order === "asc" ? -1 : 1;
    if (aValue > bValue) return order === "asc" ? 1 : -1;
    return 0;
  });
};

export const filterByField = <T>(
  array: T[],
  field: keyof T,
  value: any
): T[] => {
  return array.filter((item) => {
    const itemValue = item[field];
    if (typeof itemValue === "string" && typeof value === "string") {
      return itemValue.toLowerCase().includes(value.toLowerCase());
    }
    return itemValue === value;
  });
};
