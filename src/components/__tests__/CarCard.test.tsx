import { render, screen } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material";
import { CarCard } from "../CarCard";
import type { Car } from "../../hooks/useCars";

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
    <ThemeProvider theme={theme}>
      <CarCard car={car} />
    </ThemeProvider>
  );
};

describe("CarCard", () => {
  it("renders car information correctly", () => {
    renderCarCard();

    expect(screen.getByText("Audi Q5")).toBeInTheDocument();
    expect(screen.getByText("2023")).toBeInTheDocument();
    expect(screen.getByText("Color: Blue")).toBeInTheDocument();
    expect(screen.getByText("ID: 1")).toBeInTheDocument();
  });

  it("displays car image with correct alt text", () => {
    renderCarCard();

    const image = screen.getByAltText("Audi Q5");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src");
  });

  it("renders different car data correctly", () => {
    const differentCar: Car = {
      id: "2",
      make: "BMW",
      model: "X5",
      year: 2022,
      color: "Red",
      mobile: "https://example.com/bmw-mobile.jpg",
      tablet: "https://example.com/bmw-tablet.jpg",
      desktop: "https://example.com/bmw-desktop.jpg",
    };

    renderCarCard(differentCar);

    expect(screen.getByText("BMW X5")).toBeInTheDocument();
    expect(screen.getByText("2022")).toBeInTheDocument();
    expect(screen.getByText("Color: Red")).toBeInTheDocument();
    expect(screen.getByText("ID: 2")).toBeInTheDocument();
  });
});
