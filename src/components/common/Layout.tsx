import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import { layoutStyles } from "../../theme/componentStyles";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box sx={layoutStyles.mainLayout}>
      <Header />

      <Box component="main" sx={layoutStyles.mainContent}>
        {children}
      </Box>

      <Footer />
    </Box>
  );
}
