import type { Car } from "../../types/car.types";

// Base Mock Cars Data
export const mockCars: Car[] = [
  {
    id: "1",
    make: "Audi",
    model: "Q5",
    year: 2023,
    color: "Blue",
    mobile: "https://example.com/audi-q5-mobile.jpg",
    tablet: "https://example.com/audi-q5-tablet.jpg",
    desktop: "https://example.com/audi-q5-desktop.jpg",
    description: "Luxury SUV with advanced safety features",
    price: 45000,
    mileage: 8000,
  },
  {
    id: "2",
    make: "BMW",
    model: "X5",
    year: 2022,
    color: "Red",
    mobile: "https://example.com/bmw-x5-mobile.jpg",
    tablet: "https://example.com/bmw-x5-tablet.jpg",
    desktop: "https://example.com/bmw-x5-desktop.jpg",
    description: "Sport utility vehicle with premium features",
    price: 55000,
    mileage: 12000,
  },
  {
    id: "3",
    make: "Toyota",
    model: "Camry",
    year: 2021,
    color: "White",
    mobile: "https://example.com/toyota-camry-mobile.jpg",
    tablet: "https://example.com/toyota-camry-tablet.jpg",
    desktop: "https://example.com/toyota-camry-desktop.jpg",
    description: "Reliable sedan for daily commuting",
    price: 35000,
    mileage: 25000,
  },
];

export const economyCars: Car[] = [
  {
    id: "economy-1",
    make: "Honda",
    model: "Civic",
    year: 2023,
    color: "Blue",
    mobile: "https://example.com/honda-civic-mobile.jpg",
    tablet: "https://example.com/honda-civic-tablet.jpg",
    desktop: "https://example.com/honda-civic-desktop.jpg",
    description: "Reliable compact car",
    price: 22000,
    mileage: 15000,
  },
  {
    id: "economy-2",
    make: "Nissan",
    model: "Sentra",
    year: 2022,
    color: "White",
    mobile: "https://example.com/nissan-sentra-mobile.jpg",
    tablet: "https://example.com/nissan-sentra-tablet.jpg",
    desktop: "https://example.com/nissan-sentra-desktop.jpg",
    description: "Affordable and efficient",
    price: 20000,
    mileage: 18000,
  },
];

// Form Input Data
export const newCarInput = {
  make: "Honda",
  model: "Accord",
  year: 2024,
  color: "Black",
  mobile: "https://example.com/honda-accord-mobile.jpg",
  tablet: "https://example.com/honda-accord-tablet.jpg",
  desktop: "https://example.com/honda-accord-desktop.jpg",
  description: "Modern sedan with excellent fuel efficiency",
  price: 32000,
  mileage: 0,
};

export const newCarResponse: Car = {
  id: "4",
  ...newCarInput,
};

export const invalidCarInput = {
  make: "", // Invalid: empty
  model: "Test Model",
  year: 1800, // Invalid: too old
  color: "Test Color",
  mobile: "invalid-url", // Invalid: not a URL
  tablet: "https://example.com/tablet.jpg",
  desktop: "https://example.com/desktop.jpg",
};

// Updated data after operations
export const updatedMockCars: Car[] = [...mockCars, newCarResponse];
