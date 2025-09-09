import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import CarFilters from "../../../components/car/CarFilters";
import { FullContextWrapper, createSuccessMocks, mockCars } from "../../utils";

// Mock the theme styles
vi.mock("../../../theme/componentStyles", () => ({
  getComponentStyles: () => ({
    filter: {
      filterContainer: {},
      filterBox: {},
      filterTypography: {},
      filterChipBox: {},
      filterGrid: {},
      searchField: {},
      makeField: {},
      sortField: {},
      sortButton: {},
      sortButtonInner: {},
    },
  }),
}));

describe("CarFilters", () => {
  const renderFilters = () => {
    return render(
      <FullContextWrapper mocks={createSuccessMocks(mockCars)}>
        <CarFilters />
      </FullContextWrapper>
    );
  };

  it("renders all basic filter elements", async () => {
    renderFilters();

    await waitFor(() => {
      expect(screen.getByText(/Filter & Sort Cars/i)).toBeInTheDocument();
    });

    expect(screen.getByLabelText(/Search by Model/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Make/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Year/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Color/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Sort By/i)).toBeInTheDocument();
  });

  it("allows typing in search field", async () => {
    const user = userEvent.setup();
    renderFilters();

    await waitFor(() => {
      expect(screen.getByLabelText(/Search by Model/i)).toBeInTheDocument();
    });

    const searchInput = screen.getByLabelText(/Search by Model/i);
    await user.type(searchInput, "BMW");

    expect(searchInput).toHaveValue("BMW");
  });

  it("opens make dropdown when clicked", async () => {
    const user = userEvent.setup();
    renderFilters();

    await waitFor(() => {
      expect(screen.getByLabelText(/Make/i)).toBeInTheDocument();
    });

    const makeSelect = screen.getByLabelText(/Make/i);
    await user.click(makeSelect);

    await waitFor(() => {
      expect(screen.getByText("All Makes")).toBeInTheDocument();
    });
  });

  it("has clickable sort order button", async () => {
    const user = userEvent.setup();
    renderFilters();

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /Sort order/i })
      ).toBeInTheDocument();
    });

    const sortButton = screen.getByRole("button", { name: /Sort order/i });
    await user.click(sortButton);

    // Should not throw error
    expect(sortButton).toBeInTheDocument();
  });

  it("shows results count", async () => {
    renderFilters();

    await waitFor(() => {
      expect(screen.getByText(/results/i)).toBeInTheDocument();
    });
  });

  it("does not show clear all button initially", async () => {
    renderFilters();

    await waitFor(() => {
      expect(screen.getByText(/Filter & Sort Cars/i)).toBeInTheDocument();
    });

    expect(screen.queryByText("Clear All")).not.toBeInTheDocument();
  });
});
