import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ErrorBoundary from "../common/ErrorBoundary";

function ProblemChild() {
  throw new Error("Test error!");
  return null;
}

describe("ErrorBoundary", () => {
  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <div>Safe Child</div>
      </ErrorBoundary>
    );
    expect(screen.getByText("Safe Child")).toBeInTheDocument();
  });

  it("shows fallback UI when a child throws", () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/Try Again/i)).toBeInTheDocument();
    expect(screen.getByText(/Reload Page/i)).toBeInTheDocument();
  });

  it("resets error when Try Again is clicked", async () => {
    function FlakyChild({ fail }: { fail: boolean }) {
      if (fail) throw new Error("Boom!");
      return <div>All Good</div>;
    }
    const { rerender } = render(
      <ErrorBoundary>
        <FlakyChild fail={true} />
      </ErrorBoundary>
    );
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

    // first render the component with fail=false
    rerender(
      <ErrorBoundary>
        <FlakyChild fail={false} />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByText(/Try Again/i));

    await waitFor(() => {
      expect(screen.getByText("All Good")).toBeInTheDocument();
    });
  });
});
