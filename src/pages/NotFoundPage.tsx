import { Link } from "react-router-dom";
import { Container, Typography, Button, Box, Paper } from "@mui/material";
import {
  Home as HomeIcon,
  ErrorOutline as ErrorIcon,
} from "@mui/icons-material";
import { pageStyles } from "../theme/componentStyles";

export default function NotFoundPage() {
  return (
    <Container maxWidth="md">
      <Box sx={pageStyles.notFoundPageContainer}>
        <Paper elevation={3} sx={pageStyles.notFoundPagePaper}>
          <ErrorIcon sx={pageStyles.errorIconStyles} />

          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={pageStyles.notFoundPageHeading}
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
            sx={pageStyles.notFoundPageDescription}
          >
            The page you're looking for doesn't exist. It might have been moved,
            deleted, or you entered the wrong URL.
          </Typography>

          <Box sx={pageStyles.notFoundPageBox}>
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
