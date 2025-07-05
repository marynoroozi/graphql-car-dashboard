import { Box, Container, Typography, Link, Divider } from "@mui/material";
import { GitHub as GitHubIcon } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="xl">
        <Divider sx={{ mb: 2 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © 2025 Car Assessment Dashboard. Built with React, TypeScript,
            Apollo GraphQL & Material-UI.
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <GitHubIcon fontSize="small" />
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
