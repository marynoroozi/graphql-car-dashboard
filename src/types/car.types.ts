export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface CarsData {
  cars: Car[];
}

export interface CarFilters {
  searchTerm: string;
  yearFilter: number | null;
  colorFilter: string;
  makeFilter: string;
}

export interface SortOptions {
  sortBy: "make" | "model" | "year";
  sortOrder: "asc" | "desc";
}

export interface CarInput {
  make: string;
  model: string;
  year: number;
  color: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface AddCarResponse {
  addCar: {
    success: boolean;
    car?: Car;
    message?: string;
  };
}
