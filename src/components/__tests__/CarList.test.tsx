import { render, screen } from "@testing-library/react";
import CarList from "../car/CarList";
import type { Car } from "../../types/car.types";
import { vi } from "vitest";

// Mock CarCard to avoid rendering its internals
vi.mock("../car/CarCard", () => ({
  default: ({ car }: { car: Car }) => (
    <div data-testid="car-card">
      {car.make} {car.model}
    </div>
  ),
}));

const cars: Car[] = [
  {
    id: "1",
    make: "Audi",
    model: "Q5",
    year: 2023,
    color: "Blue",
    mobile: "",
    tablet: "",
    desktop: "",
  },
  {
    id: "2",
    make: "BMW",
    model: "X5",
    year: 2022,
    color: "Red",
    mobile: "",
    tablet: "",
    desktop: "",
  },
];

describe("CarList", () => {
  it("renders a list of cars", () => {
    render(<CarList cars={cars} />);
    expect(screen.getByLabelText(/Car listings/i)).toBeInTheDocument();
    expect(screen.getAllByTestId("car-card")).toHaveLength(2);
    expect(screen.getByText(/Audi Q5/)).toBeInTheDocument();
    expect(screen.getByText(/BMW X5/)).toBeInTheDocument();
  });

  it("renders empty state when no cars", () => {
    render(<CarList cars={[]} />);
    expect(screen.getByText(/No cars found/i)).toBeInTheDocument();
    expect(screen.getByText(/Try adjusting your search/i)).toBeInTheDocument();
  });
});
