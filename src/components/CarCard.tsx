import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import type { Car } from "../hooks/useCars";

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // 640px
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg")); // 640px to 1023px

  // Determine which image to use based on screen size
  const getImageUrl = () => {
    if (isMobile) return car.mobile;
    if (isTablet) return car.tablet;
    return car.desktop;
  };

  return (
    <Card
      sx={{
        maxWidth: 400,
        margin: 2,
        boxShadow: 3,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        height="240"
        image={getImageUrl()}
        alt={`${car.make} ${car.model}`}
        sx={{
          objectFit: "cover",
        }}
      />
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="h5" component="div" fontWeight="bold">
            {car.make} {car.model}
          </Typography>
          <Chip
            label={car.year}
            color="primary"
            variant="outlined"
            size="small"
          />
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="text.secondary">
            Color: {car.color}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            ID: {car.id}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
