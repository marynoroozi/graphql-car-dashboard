import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  Button,
  useTheme,
  useMediaQuery,
  CardActions,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Visibility as ViewIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  Speed as SpeedIcon,
} from "@mui/icons-material";
import type { Car } from "../../types/car.types";
import { getComponentStyles } from "../../theme/componentStyles";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));
  const styles = getComponentStyles();

  const getImageUrl = () => {
    if (isMobile) return car.mobile;
    if (isTablet) return car.tablet;
    return car.desktop;
  };

  const handleViewDetails = () => {
    navigate(`/car/${car.id}`);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: `${car.make} ${car.model}`,
        text: `Check out this ${car.year} ${car.make} ${car.model}`,
        url: `${window.location.origin}/car/${car.id}`,
      });
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Added to favorites:", car.id);
  };

  return (
    <Card
      component="article"
      sx={styles.card.carCard(theme)}
      onClick={handleViewDetails}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="240"
          image={getImageUrl()}
          alt={`${car.make} ${car.model} ${car.year} in ${car.color}`}
          sx={styles.card.carCardMedia}
        />

        <Box sx={styles.card.carCardActionButtons}>
          <Tooltip title="Add to favorites">
            <IconButton
              size="small"
              onClick={handleFavorite}
              sx={styles.card.favoriteButton}
            >
              <FavoriteIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Share">
            <IconButton
              size="small"
              onClick={handleShare}
              sx={styles.card.actionButton}
            >
              <ShareIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        {car.price && (
          <Chip
            label={`$${car.price.toLocaleString()}`}
            color="success"
            sx={{
              position: "absolute",
              bottom: 12,
              left: 12,
              fontWeight: 600,
              backgroundColor: "success.main",
              color: "success.contrastText",
            }}
          />
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: 600,
            lineHeight: 1.2,
          }}
          id={`car-title-${car.id}`}
        >
          {car.make} {car.model}
        </Typography>

        <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
          <Chip
            label={car.year}
            size="small"
            color="primary"
            variant="outlined"
          />
          <Chip label={car.color} size="small" variant="outlined" />
          {car.mileage && (
            <Chip
              icon={<SpeedIcon />}
              label={`${car.mileage.toLocaleString()} km`}
              size="small"
              variant="outlined"
            />
          )}
        </Box>

        {car.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              lineHeight: 1.4,
            }}
          >
            {car.description}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<ViewIcon />}
          onClick={handleViewDetails}
          sx={{ fontWeight: 500 }}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}
