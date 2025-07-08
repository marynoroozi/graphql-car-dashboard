export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  mobile: string;
  tablet: string;
  desktop: string;
  description?: string;
  price?: number;
  mileage?: number;
}

export interface CarsData {
  cars: Car[];
}

export type SortBy = "make" | "model" | "year" | "price";
export type SortOrder = "asc" | "desc";
export interface CarFilters {
  searchTerm: string;
  yearFilter: number | null;
  colorFilter: string;
  makeFilter: string;
  sortBy: SortBy;
  sortOrder: SortOrder;
}
export interface SortOptions {
  sortBy: SortBy;
  sortOrder: SortOrder;
}
export interface CarInput {
  make: string;
  model: string;
  year: number;
  color: string;
  mobile: string;
  tablet: string;
  desktop: string;
  description?: string;
  price?: number;
  mileage?: number;
}

export interface AddCarResponse {
  addCar: {
    success: boolean;
    car?: Car;
    message?: string;
  };
}
