import { Component, type ErrorInfo, type ReactNode } from "react";
import { Box, Typography, Button, Paper, Container } from "@mui/material";
import {
  Error as ErrorIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="md" sx={{ py: 8 }}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              textAlign: "center",
              backgroundColor: "error.light",
              color: "error.contrastText",
            }}
          >
            <ErrorIcon sx={{ fontSize: 64, mb: 2 }} />

            <Typography variant="h4" gutterBottom>
              Oops! Something went wrong
            </Typography>

            <Typography variant="body1" paragraph>
              We're sorry, but something unexpected happened. Please try
              refreshing the page.
            </Typography>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  backgroundColor: "rgba(0,0,0,0.1)",
                  borderRadius: 1,
                  textAlign: "left",
                }}
              >
                <Typography variant="caption" component="pre">
                  {this.state.error.stack}
                </Typography>
              </Box>
            )}

            <Box
              sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "center" }}
            >
              <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={this.handleReset}
                color="inherit"
              >
                Try Again
              </Button>

              <Button
                variant="outlined"
                onClick={() => window.location.reload()}
                color="inherit"
              >
                Reload Page
              </Button>
            </Box>
          </Paper>
        </Container>
      );
    }

    return this.props.children;
  }
}
