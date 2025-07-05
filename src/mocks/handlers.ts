import { graphql, HttpResponse } from "msw";

const carList = [
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

export const handlers = [
  // Get all cars
  graphql.query("GetCars", () => {
    return HttpResponse.json({ data: { cars: carList } });
  }),

  // Get single car by ID
  graphql.query("GetCarById", ({ variables }) => {
    const { id } = variables as { id: string };
    const car = carList.find((car) => car.id === id);

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

    let filteredCars = carList;

    if (make) {
      filteredCars = filteredCars.filter((car) =>
        car.make.toLowerCase().includes(make.toLowerCase())
      );
    }

    if (model) {
      filteredCars = filteredCars.filter((car) =>
        car.model.toLowerCase().includes(model.toLowerCase())
      );
    }

    if (year) {
      filteredCars = filteredCars.filter((car) => car.year === year);
    }

    if (color) {
      filteredCars = filteredCars.filter((car) =>
        car.color.toLowerCase().includes(color.toLowerCase())
      );
    }

    return HttpResponse.json({ data: { carsFiltered: filteredCars } });
  }),

  // Add new car
  graphql.mutation("AddCar", ({ variables }) => {
    const { input } = variables as { input: any };

    const newCar = {
      id: (carList.length + 1).toString(),
      ...input,
      mobile:
        input.mobile || "https://via.placeholder.com/300x200?text=No+Image",
      tablet:
        input.tablet || "https://via.placeholder.com/900x600?text=No+Image",
      desktop:
        input.desktop || "https://via.placeholder.com/1200x800?text=No+Image",
    };

    carList.push(newCar);

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
