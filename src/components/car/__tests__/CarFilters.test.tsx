import { render, screen, fireEvent } from "@testing-library/react";
import CarFilters from "../CarFilters";
import { vi } from "vitest";

const defaultProps = {
  searchTerm: "",
  onSearchChange: vi.fn(),
  yearFilter: null,
  onYearFilterChange: vi.fn(),
  colorFilter: "",
  onColorFilterChange: vi.fn(),
  makeFilter: "",
  onMakeFilterChange: vi.fn(),
  sortBy: "make" as const,
  onSortByChange: vi.fn(),
  sortOrder: "asc" as const,
  onSortOrderChange: vi.fn(),
  totalCars: 5,
  availableYears: [2022, 2023],
  availableColors: ["Red", "Blue"],
  availableMakes: ["Audi", "BMW"],
};

describe("CarFilters", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all filter fields and sort controls", () => {
    render(<CarFilters {...defaultProps} />);
    expect(screen.getByLabelText(/Search by Model/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Make/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Year/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Color/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Sort By/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Sort order/i)).toBeInTheDocument();
    expect(screen.getByText(/Filter & Sort Cars/i)).toBeInTheDocument();
    expect(screen.getByText(/\(5 results\)/i)).toBeInTheDocument();
  });

  it("calls onSearchChange when typing in search", () => {
    render(<CarFilters {...defaultProps} />);
    const input = screen.getByLabelText(/Search by Model/i);
    fireEvent.change(input, { target: { value: "Q5" } });
    expect(defaultProps.onSearchChange).toHaveBeenCalledWith("Q5");
  });

  it("calls onMakeFilterChange when selecting make", () => {
    render(<CarFilters {...defaultProps} />);
    const select = screen.getByLabelText(/Make/i);
    fireEvent.mouseDown(select);
    const option = screen.getByText("Audi");
    fireEvent.click(option);
    expect(defaultProps.onMakeFilterChange).toHaveBeenCalledWith("Audi");
  });

  it("shows active filter chips and can clear them", () => {
    const props = {
      ...defaultProps,
      searchTerm: "Q5",
      yearFilter: 2023,
      colorFilter: "Red",
      makeFilter: "Audi",
    };
    render(<CarFilters {...props} />);
    expect(screen.getByText("Model: Q5")).toBeInTheDocument();
    expect(screen.getByText("Year: 2023")).toBeInTheDocument();
    expect(screen.getByText("Color: Red")).toBeInTheDocument();
    expect(screen.getByText("Make: Audi")).toBeInTheDocument();

    // Clear All button should be visible
    const clearAllBtn = screen.getByText(/Clear All/i);
    expect(clearAllBtn).toBeInTheDocument();
    fireEvent.click(clearAllBtn);
    expect(props.onSearchChange).toHaveBeenCalledWith("");
    expect(props.onYearFilterChange).toHaveBeenCalledWith(null);
    expect(props.onColorFilterChange).toHaveBeenCalledWith("");
    expect(props.onMakeFilterChange).toHaveBeenCalledWith("");
  });

  it("calls onSortByChange and onSortOrderChange", async () => {
    render(<CarFilters {...defaultProps} />);
    const sortBySelect = screen.getByLabelText(/Sort By/i);
    fireEvent.mouseDown(sortBySelect);

    const yearOption = await screen.findByRole("option", { name: "Year" });
    fireEvent.click(yearOption);

    expect(defaultProps.onSortByChange).toHaveBeenCalledWith("year");

    const sortOrderBtn = screen.getByLabelText(/Sort order/i);
    fireEvent.click(sortOrderBtn);
    expect(defaultProps.onSortOrderChange).toHaveBeenCalled();
  });
});
