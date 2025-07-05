import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";
import theme from "./theme";
import Layout from "./components/common/Layout";
import HomePage from "./pages/HomePage";
import CarDetailPage from "./pages/CarDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import ErrorBoundary from "./components/common/ErrorBoundary";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApolloProvider client={client}>
        <ErrorBoundary>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/car/:id" element={<CarDetailPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Layout>
          </Router>

          {/* Global Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#363636",
                color: "#fff",
                borderRadius: "8px",
                fontFamily: theme.typography.fontFamily,
              },
              success: {
                iconTheme: {
                  primary: theme.palette.success.main,
                  secondary: "#fff",
                },
                style: {
                  background: theme.palette.success.light,
                  color: theme.palette.success.contrastText,
                },
              },
              error: {
                iconTheme: {
                  primary: theme.palette.error.main,
                  secondary: "#fff",
                },
                style: {
                  background: theme.palette.error.light,
                  color: theme.palette.error.contrastText,
                },
              },
            }}
          />
        </ErrorBoundary>
      </ApolloProvider>
    </ThemeProvider>
  );
}
