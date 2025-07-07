import ReactDOM from "react-dom/client";
import App from "./App";

// Just in development, we use MSW to mock API calls
if (import.meta.env.DEV) {
  import("./mocks/browser").then(({ worker }) => {
    worker.start().then(() => {
      renderApp();
    });
  });
} else {
  renderApp();
}

function renderApp() {
  ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
}
