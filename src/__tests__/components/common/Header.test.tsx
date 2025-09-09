import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../../../components/common/Header";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

// Mock AddCarModal and ResetDataButton
vi.mock("../../../components/car/AddCarModal", () => ({
  default: ({ open }: { open: boolean }) =>
    open ? <div data-testid="add-car-modal">Add Car Modal</div> : null,
}));
vi.mock("../../../components/common/ResetDataButton", () => ({
  default: () => <button data-testid="reset-data-btn">Reset Data</button>,
}));

function renderHeader(path = "/") {
  window.history.pushState({}, "Test page", path);
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Header />
    </MemoryRouter>
  );
}

describe("Header", () => {
  it("renders logo and title", () => {
    renderHeader();
    expect(screen.getByLabelText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/Car Assessment Dashboard/i)).toBeInTheDocument();
  });

  it("shows Home button when not on root path", () => {
    renderHeader("/car/1");
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });

  it("does not show Home button on root path", () => {
    renderHeader("/");
    expect(screen.queryByText(/Home/i)).not.toBeInTheDocument();
  });

  it("shows Add Car button and opens modal on click", () => {
    renderHeader();
    const addCarBtn = screen.getByRole("button", { name: /add car/i });
    expect(addCarBtn).toBeInTheDocument();
    fireEvent.click(addCarBtn);
    expect(screen.getByTestId("add-car-modal")).toBeInTheDocument();
  });

  it("shows ResetDataButton only in development", () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "development";
    renderHeader();
    expect(screen.getByTestId("reset-data-btn")).toBeInTheDocument();
    process.env.NODE_ENV = originalEnv;
  });
});
