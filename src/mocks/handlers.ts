import { graphql, HttpResponse } from "msw";
import type { CarInput, CarsData } from "../types";

const initialCarList = [
  {
    id: "1",
    make: "Audi",
    model: "Q5",
    year: 2023,
    color: "Blue",
    mobile:
      "https://media.audi.com/is/image/audi/nemo/uk/models/q5-tfsi-e/2023-trims/mobile/q5_sportback_tfsie_sport_1280x1080px.png?width=300",
    tablet:
      "https://media.audi.com/is/image/audi/nemo/uk/models/q5-tfsi-e/2023-trims/mobile/q5_sportback_tfsie_sport_1280x1080px.png?width=900",
    desktop:
      "https://media.audi.com/is/image/audi/nemo/uk/models/q5-tfsi-e/2023-trims/mobile/q5_sportback_tfsie_sport_1280x1080px.png?width=1280",
    description:
      "Luxury SUV with advanced safety features and premium interior. Perfect for family trips and daily commuting.",
    price: 45000,
    mileage: 8000,
  },
  {
    id: "2",
    make: "Audi",
    model: "A3",
    year: 2022,
    color: "Red",
    mobile:
      "https://nar.media.audi.com/is/image/audinar/nemo/ca/Models/a3/MY25/1920x1920-A3-P1.jpg?width=300",
    tablet:
      "https://nar.media.audi.com/is/image/audinar/nemo/ca/Models/a3/MY25/1920x1920-A3-P1.jpg?width=900",
    desktop:
      "https://nar.media.audi.com/is/image/audinar/nemo/ca/Models/a3/MY25/1920x1920-A3-P1.jpg?width=1200",
    description:
      "compact luxury sedan known for its stylish design, comfortable interior, and engaging driving experience",
    price: 48000,
    mileage: 15000,
  },
  {
    id: "3",
    make: "Audi",
    model: "R8",
    year: 2024,
    color: "White",
    mobile:
      "https://www.intotheblue.co.uk/images/Suppliers/6thGear/6th-Gear-Experience---Audi-Thrill-2024/r8-white-600X600-1.jpg?width=300",
    tablet:
      "https://www.intotheblue.co.uk/images/Suppliers/6thGear/6th-Gear-Experience---Audi-Thrill-2024/r8-white-600X600-1.jpg?width=900",
    desktop:
      "https://www.intotheblue.co.uk/images/Suppliers/6thGear/6th-Gear-Experience---Audi-Thrill-2024/r8-white-600X600-1.jpg?width=1200",
    description:
      "The Audi R8 is a high-performance sports car that combines luxury with cutting-edge technology, offering an exhilarating driving experience.",
    price: 95000,
    mileage: 3000,
  },
];

// Storage key for localStorage
const STORAGE_KEY = "car-assessment-data";

// Get cars from localStorage or use initial data
const getCarList = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn("Error reading from localStorage:", error);
  }

  // First time - save initial data to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCarList));
  return initialCarList;
};

// Save cars to localStorage
const saveCarList = (cars: CarsData) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
  } catch (error) {
    console.warn("Error saving to localStorage:", error);
  }
};

// Get current car list from localStorage
let carList = getCarList();

export const handlers = [
  // Get all cars
  graphql.query("GetCars", () => {
    // Always get fresh data from localStorage
    carList = getCarList();
    return HttpResponse.json({ data: { cars: carList } });
  }),

  // Get single car by ID
  graphql.query("GetCarById", ({ variables }) => {
    const { id } = variables as { id: string };
    carList = getCarList();
    const car = carList.find((car: any) => car.id === id);

    if (!car) {
      return HttpResponse.json(
        {
          errors: [{ message: "Car not found" }],
        },
        { status: 404 }
      );
    }

    return HttpResponse.json({ data: { car } });
  }),

  // Get filtered cars
  graphql.query("GetCarsFiltered", ({ variables }) => {
    const { make, model, year, color } = variables as {
      make?: string;
      model?: string;
      year?: number;
      color?: string;
    };

    carList = getCarList();
    let filteredCars = carList;

    if (make) {
      filteredCars = filteredCars.filter((car: any) =>
        car.make.toLowerCase().includes(make.toLowerCase())
      );
    }

    if (model) {
      filteredCars = filteredCars.filter((car: any) =>
        car.model.toLowerCase().includes(model.toLowerCase())
      );
    }

    if (year) {
      filteredCars = filteredCars.filter((car: any) => car.year === year);
    }

    if (color) {
      filteredCars = filteredCars.filter((car: any) =>
        car.color.toLowerCase().includes(color.toLowerCase())
      );
    }

    return HttpResponse.json({ data: { carsFiltered: filteredCars } });
  }),

  // Add new car
  graphql.mutation("AddCar", ({ variables }) => {
    const { input } = variables as { input: CarInput };

    // Get current list
    carList = getCarList();

    const newCar = {
      id: `car-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Unique ID
      ...input,
      mobile:
        input.mobile || "https://via.placeholder.com/300x200?text=No+Image",
      tablet:
        input.tablet || "https://via.placeholder.com/900x600?text=No+Image",
      desktop:
        input.desktop || "https://via.placeholder.com/1200x800?text=No+Image",
    };

    carList.push(newCar);

    // Save to localStorage
    saveCarList(carList);

    return HttpResponse.json({
      data: {
        addCar: {
          success: true,
          message: "Car added successfully!",
          car: newCar,
        },
      },
    });
  }),
];
