import { Box, Container, Typography, Link, Divider } from "@mui/material";
import { GitHub as GitHubIcon } from "@mui/icons-material";
import { layoutStyles } from "../../theme/componentStyles";

export default function Footer() {
  return (
    <Box component="footer" sx={layoutStyles.footerContainerBox}>
      <Container maxWidth="xl">
        <Divider sx={{ mb: 2 }} />

        <Box sx={layoutStyles.footerTypoBox}>
          <Typography variant="body2" color="text.secondary">
            © 2025 Car Assessment Dashboard. Built with React, TypeScript,
            Apollo GraphQL & Material-UI.
          </Typography>

          <Box sx={layoutStyles.headerActions}>
            <Link
              href="https://github.com/marynoroozi/graphql-car-dashboard"
              target="_blank"
              // Use rel="noopener noreferrer" for security and avoid reverse tabnabbing attack
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
