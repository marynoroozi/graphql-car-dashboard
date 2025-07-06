import { Box, CircularProgress, Typography, Fade } from "@mui/material";
import { layoutStyles } from "../../theme/componentStyles";

interface LoadingSpinnerProps {
  message?: string;
  size?: number;
}

export default function LoadingSpinner({
  message = "Loading...",
  size = 60,
}: LoadingSpinnerProps) {
  return (
    <Fade in timeout={300}>
      <Box
        sx={layoutStyles.loadingContainer}
        role="status"
        aria-label={message}
      >
        <CircularProgress
          size={size}
          thickness={4}
          sx={{
            color: "primary.main",
          }}
        />

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ fontWeight: 500 }}
        >
          {message}
        </Typography>

        <Box component="span" sx={layoutStyles.loadingMessageBox}>
          {message}
        </Box>
      </Box>
    </Fade>
  );
}
