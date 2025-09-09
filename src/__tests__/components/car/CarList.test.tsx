import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import CarList from "../../../components/car/CarList";
import type { Car } from "../../../types/car.types";
import {
  FullContextWrapper,
  createSuccessMocks,
  createEmptyDataMocks,
  mockCars,
  economyCars,
} from "../../utils";

// Mock CarCard
vi.mock("../../../components/car/CarCard", () => ({
  default: ({ car }: { car: Car }) => (
    <div data-testid="car-card">
      {car.make} {car.model}
    </div>
  ),
}));

describe("CarList", () => {
  describe("With cars data from context", () => {
    it("renders a list of cars from context", async () => {
      render(
        <FullContextWrapper mocks={createSuccessMocks(mockCars)}>
          <CarList />
        </FullContextWrapper>
      );

      // Wait for Apollo to load data
      await waitFor(() => {
        expect(screen.getAllByTestId("car-card")).toHaveLength(mockCars.length);
      });

      expect(screen.getByLabelText(/Car listings/i)).toBeInTheDocument();
      expect(screen.getByText(/Audi Q5/)).toBeInTheDocument();
      expect(screen.getByText(/BMW X5/)).toBeInTheDocument();
      expect(screen.getByText(/Toyota Camry/)).toBeInTheDocument();
    });

    it("renders economy cars correctly from context", async () => {
      render(
        <FullContextWrapper mocks={createSuccessMocks(economyCars)}>
          <CarList />
        </FullContextWrapper>
      );

      await waitFor(() => {
        expect(screen.getAllByTestId("car-card")).toHaveLength(
          economyCars.length
        );
      });

      expect(screen.getByLabelText(/Car listings/i)).toBeInTheDocument();
      expect(screen.getByText(/Honda Civic/)).toBeInTheDocument();
      expect(screen.getByText(/Nissan Sentra/)).toBeInTheDocument();
    });

    it("renders cars with correct structure from context", async () => {
      render(
        <FullContextWrapper mocks={createSuccessMocks(mockCars)}>
          <CarList />
        </FullContextWrapper>
      );

      await waitFor(() => {
        const carCards = screen.getAllByTestId("car-card");
        expect(carCards).toHaveLength(3);
      });

      const carCards = screen.getAllByTestId("car-card");

      // Check that each car is rendered with make and model
      carCards.forEach((card, index) => {
        const car = mockCars[index];
        expect(card).toHaveTextContent(`${car.make} ${car.model}`);
      });
    });

    it("renders grid layout with proper accessibility", async () => {
      render(
        <FullContextWrapper mocks={createSuccessMocks(mockCars)}>
          <CarList />
        </FullContextWrapper>
      );

      await waitFor(() => {
        const gridContainer = screen.getByRole("region", {
          name: /Car listings/i,
        });
        expect(gridContainer).toBeInTheDocument();
      });

      const gridContainer = screen.getByRole("region", {
        name: /Car listings/i,
      });
      expect(gridContainer).toHaveAttribute("aria-label", "Car listings");
    });
  });

  describe("Empty state from context", () => {
    it("renders empty state when no cars in context", async () => {
      render(
        <FullContextWrapper mocks={createEmptyDataMocks()}>
          <CarList />
        </FullContextWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText(/No cars found/i)).toBeInTheDocument();
      });

      expect(
        screen.getByText(
          /Try adjusting your search criteria or add a new car to get started/i
        )
      ).toBeInTheDocument();
      expect(screen.queryByTestId("car-card")).not.toBeInTheDocument();
      expect(screen.queryByLabelText(/Car listings/i)).not.toBeInTheDocument();
    });

    it("shows empty state with correct styling", async () => {
      render(
        <FullContextWrapper mocks={createEmptyDataMocks()}>
          <CarList />
        </FullContextWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText(/No cars found/i)).toBeInTheDocument();
      });

      const emptyTitle = screen.getByText(/No cars found/i);
      const emptyMessage = screen.getByText(/Try adjusting your search/i);

      expect(emptyTitle).toBeInTheDocument();
      expect(emptyMessage).toBeInTheDocument();
    });
  });

  describe("Different car counts from context", () => {
    it("renders single car correctly", async () => {
      const singleCar = [mockCars[0]];

      render(
        <FullContextWrapper mocks={createSuccessMocks(singleCar)}>
          <CarList />
        </FullContextWrapper>
      );

      await waitFor(() => {
        expect(screen.getAllByTestId("car-card")).toHaveLength(1);
      });

      expect(screen.getByLabelText(/Car listings/i)).toBeInTheDocument();
      expect(screen.getByText(/Audi Q5/)).toBeInTheDocument();
    });

    it("renders large list of cars", async () => {
      const manyCars = [...mockCars, ...economyCars];

      render(
        <FullContextWrapper mocks={createSuccessMocks(manyCars)}>
          <CarList />
        </FullContextWrapper>
      );

      await waitFor(() => {
        expect(screen.getAllByTestId("car-card")).toHaveLength(manyCars.length);
      });

      expect(screen.getByLabelText(/Car listings/i)).toBeInTheDocument();
    });
  });

  describe("Component behavior", () => {
    it("applies proper ARIA attributes", async () => {
      render(
        <FullContextWrapper mocks={createSuccessMocks(mockCars)}>
          <CarList />
        </FullContextWrapper>
      );

      await waitFor(() => {
        const gridContainer = screen.getByRole("region");
        expect(gridContainer).toHaveAttribute("aria-label", "Car listings");
      });
    });

    it("shows cars in grid layout", async () => {
      render(
        <FullContextWrapper mocks={createSuccessMocks(mockCars)}>
          <CarList />
        </FullContextWrapper>
      );

      await waitFor(() => {
        const gridContainer = screen.getByLabelText(/Car listings/i);
        expect(gridContainer).toBeInTheDocument();
      });

      const carCards = screen.getAllByTestId("car-card");
      expect(carCards).toHaveLength(mockCars.length);
    });

    it("renders each car with proper data", async () => {
      render(
        <FullContextWrapper mocks={createSuccessMocks(mockCars)}>
          <CarList />
        </FullContextWrapper>
      );

      // Wait for cars to load
      await waitFor(() => {
        expect(screen.getAllByTestId("car-card")).toHaveLength(mockCars.length);
      });

      // Test that each mock car is rendered
      mockCars.forEach((car) => {
        expect(
          screen.getByText(`${car.make} ${car.model}`)
        ).toBeInTheDocument();
      });
    });
  });

  describe("Context integration", () => {
    it("correctly uses context data", async () => {
      render(
        <FullContextWrapper mocks={createSuccessMocks(mockCars)}>
          <CarList />
        </FullContextWrapper>
      );

      // Should render the exact number of cars from context
      await waitFor(() => {
        expect(screen.getAllByTestId("car-card")).toHaveLength(mockCars.length);
      });
    });

    it("transitions from loading to displaying cars", async () => {
      render(
        <FullContextWrapper mocks={createSuccessMocks(mockCars)}>
          <CarList />
        </FullContextWrapper>
      );

      // Initially might show empty state
      expect(screen.getByText(/No cars found/i)).toBeInTheDocument();

      // Then should load cars
      await waitFor(() => {
        expect(screen.queryByText(/No cars found/i)).not.toBeInTheDocument();
        expect(screen.getAllByTestId("car-card")).toHaveLength(mockCars.length);
      });
    });
  });
});
