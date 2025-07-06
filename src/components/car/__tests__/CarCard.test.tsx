import { render, screen } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material";
import { MemoryRouter } from "react-router-dom";
import CarCard from "../CarCard";
import type { Car } from "../../../types/car.types";

const theme = createTheme();

const mockCar: Car = {
  id: "1",
  make: "Audi",
  model: "Q5",
  year: 2023,
  color: "Blue",
  mobile: "https://example.com/mobile.jpg",
  tablet: "https://example.com/tablet.jpg",
  desktop: "https://example.com/desktop.jpg",
};

const renderCarCard = (car: Car = mockCar) => {
  return render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <CarCard car={car} />
      </ThemeProvider>
    </MemoryRouter>
  );
};

describe("CarCard", () => {
  it("renders car information correctly", () => {
    renderCarCard();

    expect(screen.getByText("Audi Q5")).toBeInTheDocument();
    expect(screen.getByText("2023")).toBeInTheDocument();
    expect(screen.getByText(/Blue/)).toBeInTheDocument();
  });

  it("displays car image with correct alt text", () => {
    renderCarCard();

    expect(screen.getByAltText("Audi Q5 2023 in Blue")).toBeInTheDocument();
  });
});
