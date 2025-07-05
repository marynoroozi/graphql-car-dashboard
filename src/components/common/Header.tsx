import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Add as AddIcon, DirectionsCar as CarIcon } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();

  return (
    <>
      <AppBar position="sticky" elevation={2}>
        <Container maxWidth="xl">
          <Toolbar sx={{ px: { xs: 0 } }}>
            <IconButton
              edge="start"
              color="inherit"
              component={Link}
              to="/"
              aria-label="home"
              sx={{ mr: 2 }}
            >
              <CarIcon />
            </IconButton>

            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                flexGrow: 1,
                textDecoration: "none",
                color: "inherit",
                fontWeight: 600,
              }}
            >
              Car Assessment Dashboard
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {location.pathname !== "/" && (
                <Button color="inherit" component={Link} to="/" sx={{ mr: 1 }}>
                  Home
                </Button>
              )}

              <Button
                variant="contained"
                color="secondary"
                startIcon={!isMobile ? <AddIcon /> : undefined}
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
              >
                {isMobile ? <AddIcon /> : "Add Car"}
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
