import { Box, CircularProgress, Typography, Fade } from "@mui/material";

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
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
          gap: 2,
        }}
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

        <Box
          component="span"
          sx={{
            position: "absolute",
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            border: 0,
          }}
        >
          {message}
        </Box>
      </Box>
    </Fade>
  );
}
