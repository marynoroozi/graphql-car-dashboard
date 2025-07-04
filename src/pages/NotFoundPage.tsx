import { Link } from "react-router-dom";
import { Container, Typography, Button, Box, Paper } from "@mui/material";
import {
  Home as HomeIcon,
  ErrorOutline as ErrorIcon,
} from "@mui/icons-material";

export default function NotFoundPage() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 3,
          }}
        >
          <ErrorIcon
            sx={{
              fontSize: 120,
              color: "text.secondary",
              mb: 2,
            }}
          />

          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 600, color: "primary.main" }}
          >
            404
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2 }}>
            Oops! Page Not Found
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            paragraph
            sx={{ mb: 4, maxWidth: 400, mx: "auto" }}
          >
            The page you're looking for doesn't exist. It might have been moved,
            deleted, or you entered the wrong URL.
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              component={Link}
              to="/"
              startIcon={<HomeIcon />}
              size="large"
            >
              Go Home
            </Button>

            <Button
              variant="outlined"
              onClick={() => window.history.back()}
              size="large"
            >
              Go Back
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
