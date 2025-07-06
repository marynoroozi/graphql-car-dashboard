import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddCarModal from "../car/AddCarModal";
import { MockedProvider } from "@apollo/client/testing";
import { vi } from "vitest";

vi.mock("../theme/componentStyles", () => ({
  modalStyles: {
    dialogPaper: {},
    dialogTitle: {},
    dialogActions: {},
  },
}));

const onClose = vi.fn();

const renderModal = (open = true) =>
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <AddCarModal open={open} onClose={onClose} />
    </MockedProvider>
  );

describe("AddCarModal", () => {
  it("renders and shows the first step", () => {
    renderModal();
    expect(screen.getByText(/Add New Car/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Make/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Model/i)).toBeInTheDocument();
  });

  it("navigates to the next step", async () => {
    renderModal();
    // Fill required fields for step 0
    fireEvent.change(screen.getByLabelText(/Make/i), {
      target: { value: "Audi" },
    });
    fireEvent.change(screen.getByLabelText(/Model/i), {
      target: { value: "Q5" },
    });
    fireEvent.change(screen.getByLabelText(/Year/i), {
      target: { value: "2023" },
    });
    fireEvent.change(screen.getByLabelText(/Color/i), {
      target: { value: "Blue" },
    });

    fireEvent.click(screen.getByText(/Next/i));
    await waitFor(() => {
      expect(screen.getByText(/Car Images/i)).toBeInTheDocument();
    });
  });

  it("goes back to previous step", async () => {
    renderModal();
    // Fill required fields for step 0
    fireEvent.change(screen.getByLabelText(/Make/i), {
      target: { value: "Audi" },
    });
    fireEvent.change(screen.getByLabelText(/Model/i), {
      target: { value: "Q5" },
    });
    fireEvent.change(screen.getByLabelText(/Year/i), {
      target: { value: "2023" },
    });
    fireEvent.change(screen.getByLabelText(/Color/i), {
      target: { value: "Blue" },
    });

    fireEvent.click(screen.getByText(/Next/i));
    await waitFor(() => {
      expect(screen.getByText(/Car Images/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/Back/i));
    expect(screen.getByLabelText(/Make/i)).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    renderModal();
    fireEvent.click(screen.getByLabelText(/close/i));
    expect(onClose).toHaveBeenCalled();
  });

  it("submits the form on last step", async () => {
    renderModal();
    // Step 0
    fireEvent.change(screen.getByLabelText(/Make/i), {
      target: { value: "Audi" },
    });
    fireEvent.change(screen.getByLabelText(/Model/i), {
      target: { value: "Q5" },
    });
    fireEvent.change(screen.getByLabelText(/Year/i), {
      target: { value: "2023" },
    });
    fireEvent.change(screen.getByLabelText(/Color/i), {
      target: { value: "Blue" },
    });
    fireEvent.click(screen.getByText(/Next/i));
    await waitFor(() => screen.getByText(/Car Images/i));

    // Step 1
    fireEvent.click(screen.getByText(/Next/i));
    await waitFor(() => screen.getByLabelText(/Description/i));

    // Step 2
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "A nice car" },
    });
    fireEvent.change(screen.getByLabelText(/Price/i), {
      target: { value: "10000" },
    });
    fireEvent.change(screen.getByLabelText(/Mileage/i), {
      target: { value: "50000" },
    });

    fireEvent.click(screen.getByText(/Add Car/i));
  });
});
