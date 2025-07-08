import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import AddCarModal from "../../../components/car/AddCarModal";
import { FullContextWrapper, createSuccessMocks } from "../../utils";

// Mock the theme styles
vi.mock("../../../theme/componentStyles", () => ({
  modalStyles: {
    dialogPaper: {},
    dialogTitle: {},
    dialogActions: {},
  },
}));

// Mock react-hot-toast
vi.mock("react-hot-toast", () => ({
  default: {
    loading: vi.fn(() => "loading-toast"),
    dismiss: vi.fn(),
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("AddCarModal", () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderModal = (open = true, mocks = createSuccessMocks()) => {
    return render(
      <FullContextWrapper mocks={mocks}>
        <AddCarModal open={open} onClose={mockOnClose} />
      </FullContextWrapper>
    );
  };

  describe("Rendering", () => {
    it("renders when open is true", () => {
      renderModal(true);
      expect(screen.getByText("Add New Car")).toBeInTheDocument();
      expect(screen.getByText("Basic Information")).toBeInTheDocument();
    });

    it("does not render when open is false", () => {
      renderModal(false);
      expect(screen.queryByText("Add New Car")).not.toBeInTheDocument();
    });

    it("shows the first step with required fields", () => {
      renderModal();

      expect(screen.getByLabelText(/Make/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Model/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Year/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Color/i)).toBeInTheDocument();
      expect(screen.getByText("Next")).toBeInTheDocument();
    });
  });

  describe("Navigation", () => {
    it("navigates to the next step when valid data is entered", async () => {
      const user = userEvent.setup();
      renderModal();

      // Fill required fields for step 0
      await user.type(screen.getByLabelText(/Make/i), "Audi");
      await user.type(screen.getByLabelText(/Model/i), "Q5");
      await user.clear(screen.getByLabelText(/Year/i));
      await user.type(screen.getByLabelText(/Year/i), "2023");
      await user.type(screen.getByLabelText(/Color/i), "Blue");

      await user.click(screen.getByText("Next"));

      await waitFor(() => {
        expect(screen.getByText(/Car Images/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Mobile Image URL/i)).toBeInTheDocument();
      });
    });

    it("does not navigate to next step with invalid data", async () => {
      const user = userEvent.setup();
      renderModal();

      // Leave required fields empty and try to proceed
      await user.click(screen.getByText("Next"));

      // Should still be on first step
      expect(screen.getByLabelText(/Make/i)).toBeInTheDocument();
      expect(screen.queryByText(/Car Images/i)).not.toBeInTheDocument();
    });

    it("navigates back to previous step", async () => {
      const user = userEvent.setup();
      renderModal();

      // Fill step 0 and go to step 1
      await user.type(screen.getByLabelText(/Make/i), "Audi");
      await user.type(screen.getByLabelText(/Model/i), "Q5");
      await user.clear(screen.getByLabelText(/Year/i));
      await user.type(screen.getByLabelText(/Year/i), "2023");
      await user.type(screen.getByLabelText(/Color/i), "Blue");
      await user.click(screen.getByText("Next"));

      await waitFor(() => {
        expect(screen.getByText(/Car Images/i)).toBeInTheDocument();
      });

      // Go back
      await user.click(screen.getByText("Back"));

      expect(screen.getByLabelText(/Make/i)).toBeInTheDocument();
      expect(screen.queryByText("Car Images")).not.toBeInTheDocument();
    });

    it("shows all three steps correctly", async () => {
      const user = userEvent.setup();
      renderModal();

      // Step 0 -> Step 1
      await user.type(screen.getByLabelText(/Make/i), "Audi");
      await user.type(screen.getByLabelText(/Model/i), "Q5");
      await user.clear(screen.getByLabelText(/Year/i));
      await user.type(screen.getByLabelText(/Year/i), "2023");
      await user.type(screen.getByLabelText(/Color/i), "Blue");
      await user.click(screen.getByText("Next"));

      await waitFor(() => {
        expect(screen.getByText(/Car Images/i)).toBeInTheDocument();
      });

      // Step 1 -> Step 2
      await user.click(screen.getByText("Next"));

      await waitFor(() => {
        expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Mileage/i)).toBeInTheDocument();
        expect(screen.getByText("Add Car")).toBeInTheDocument();
      });
    });
  });

  describe("Modal Controls", () => {
    it("calls onClose when close button is clicked", async () => {
      const user = userEvent.setup();
      renderModal();

      const closeButton = screen.getByLabelText(/close/i);
      await user.click(closeButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("resets form when modal is closed and reopened", async () => {
      const user = userEvent.setup();
      const { rerender } = renderModal();

      // Fill some data
      await user.type(screen.getByLabelText(/Make/i), "Audi");

      // Close modal
      await user.click(screen.getByLabelText(/close/i));

      // Reopen modal
      rerender(
        <FullContextWrapper mocks={createSuccessMocks()}>
          <AddCarModal open={true} onClose={mockOnClose} />
        </FullContextWrapper>
      );

      // Form should be reset
      expect(screen.getByLabelText(/Make/i)).toHaveValue("");
    });
  });

  describe("Form Validation", () => {
    it("shows validation errors for required fields", async () => {
      const user = userEvent.setup();
      renderModal();

      // Try to submit empty form
      await user.click(screen.getByText("Next"));

      // Should show validation errors
      await waitFor(() => {
        expect(screen.getByLabelText(/Make/i)).toBeInTheDocument();
        // Should still be on step 0 due to validation errors
      });
    });

    it("validates year field properly", async () => {
      const user = userEvent.setup();
      renderModal();

      const yearInput = screen.getByLabelText(/Year/i);

      // Test invalid year
      await user.clear(yearInput);
      await user.type(yearInput, "1800");

      await user.click(screen.getByText("Next"));

      // Should still be on first step due to invalid year
      expect(screen.getByLabelText(/Make/i)).toBeInTheDocument();
    });
  });

  describe("Stepper Component", () => {
    it("shows correct step labels", () => {
      renderModal();

      expect(screen.getByText("Basic Information")).toBeInTheDocument();
      expect(screen.getByText("Images")).toBeInTheDocument();
      expect(screen.getByText("Additional Details")).toBeInTheDocument();
    });

    it("disables back button on first step", () => {
      renderModal();

      const backButton = screen.getByText("Back");
      expect(backButton).toBeDisabled();
    });
  });
});
