import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Chip,
  Grid,
  Fade,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  CalendarToday as CalendarIcon,
  Palette as PaletteIcon,
  Speed as SpeedIcon,
  AttachMoney as PriceIcon,
} from "@mui/icons-material";
import { GET_CAR_BY_ID } from "../graphql/queries";
import type { Car } from "../types/car.types";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function CarDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));

  const { data, loading, error } = useQuery<{ car: Car }>(GET_CAR_BY_ID, {
    variables: { id },
    skip: !id,
  });

  const handleBack = () => {
    navigate("/");
  };

  if (loading) {
    return <LoadingSpinner message="Loading car details..." />;
  }

  if (error || !data?.car) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4, textAlign: "center" }}>
          <Typography variant="h5" color="error" gutterBottom>
            Car not found
          </Typography>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
          >
            Back to Cars
          </Button>
        </Box>
      </Container>
    );
  }

  const car = data.car;

  const getImageUrl = () => {
    if (isMobile) return car.mobile;
    if (isTablet) return car.tablet;
    return car.desktop;
  };

  return (
    <Container maxWidth="lg">
      <Fade in timeout={600}>
        <Box>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={{ mb: 3 }}
            variant="outlined"
          >
            Back to Cars
          </Button>

          <Paper elevation={3} sx={{ overflow: "hidden", borderRadius: 3 }}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  src={getImageUrl()}
                  alt={`${car.make} ${car.model} ${car.year}`}
                  sx={{
                    width: "100%",
                    height: { xs: 300, md: 400 },
                    objectFit: "cover",
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ p: 4 }}>
                  <Typography
                    variant="h3"
                    component="h1"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    {car.make} {car.model}
                  </Typography>

                  <Box
                    sx={{ mb: 3, display: "flex", gap: 1, flexWrap: "wrap" }}
                  >
                    <Chip
                      icon={<CalendarIcon />}
                      label={car.year}
                      color="primary"
                      variant="outlined"
                    />
                    <Chip
                      icon={<PaletteIcon />}
                      label={car.color}
                      color="secondary"
                      variant="outlined"
                    />
                    {car.mileage && (
                      <Chip
                        icon={<SpeedIcon />}
                        label={`${car.mileage.toLocaleString()} km`}
                        variant="outlined"
                      />
                    )}
                    {car.price && (
                      <Chip
                        icon={<PriceIcon />}
                        label={`${car.price.toLocaleString()}`}
                        color="success"
                        variant="filled"
                      />
                    )}
                  </Box>

                  {car.description && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" gutterBottom>
                        Description
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {car.description}
                      </Typography>
                    </Box>
                  )}

                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{ flexGrow: 1, minWidth: 150 }}
                    >
                      Contact Seller
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      sx={{ flexGrow: 1, minWidth: 150 }}
                    >
                      Save to Favorites
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Additional Details Section */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Specifications
            </Typography>
            <Paper sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={3}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Make
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {car.make}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Model
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {car.model}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Year
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {car.year}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Color
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {car.color}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Box>
      </Fade>
    </Container>
  );
}
