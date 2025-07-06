import { useState } from "react";
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
import AddCarModal from "../car/AddCarModal";
import ResetDataButton from "./ResetDataButton";
import { layoutStyles } from "../../theme/componentStyles";

export default function Header() {
  const [isAddCarModalOpen, setIsAddCarModalOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();

  const handleOpenAddCarModal = () => {
    setIsAddCarModalOpen(true);
  };

  const handleCloseAddCarModal = () => {
    setIsAddCarModalOpen(false);
  };

  return (
    <>
      <AppBar position="sticky" elevation={2}>
        <Container maxWidth="xl">
          <Toolbar sx={layoutStyles.headerToolbar}>
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

            {!isMobile && (
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={layoutStyles.headerTitle}
              >
                Car Assessment Dashboard
              </Typography>
            )}

            <Box sx={layoutStyles.headerActions}>
              {location.pathname !== "/" && (
                <Button color="inherit" component={Link} to="/" sx={{ mr: 1 }}>
                  Home
                </Button>
              )}

              <Button
                variant="contained"
                color="info"
                startIcon={!isMobile ? <AddIcon /> : undefined}
                onClick={handleOpenAddCarModal}
              >
                {isMobile ? <AddIcon /> : "Add Car"}
              </Button>

              {process.env.NODE_ENV === "development" && <ResetDataButton />}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <AddCarModal open={isAddCarModalOpen} onClose={handleCloseAddCarModal} />
    </>
  );
}
