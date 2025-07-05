import { Box, Typography, Fade, Zoom } from "@mui/material";
import type { Car } from "../../types/car.types";
import CarCard from "./CarCard";

interface CarListProps {
  cars: Car[];
}

export default function CarList({ cars }: CarListProps) {
  if (cars.length === 0) {
    return (
      <Fade in timeout={500}>
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            color: "text.secondary",
          }}
        >
          <Typography variant="h6" gutterBottom>
            No cars found
          </Typography>
          <Typography variant="body1">
            Try adjusting your search criteria or add a new car to get started.
          </Typography>
        </Box>
      </Fade>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        },
        gap: 3,
        mt: 2,
      }}
      role="region"
      aria-label="Car listings"
    >
      {cars.map((car, index) => (
        <Zoom
          key={car.id}
          in
          timeout={400}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <Box>
            <CarCard car={car} />
          </Box>
        </Zoom>
      ))}
    </Box>
  );
}
