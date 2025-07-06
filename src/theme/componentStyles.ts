import type { Theme } from "@mui/material/styles";

export const cardStyles = {
  carCard: (theme: Theme) => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer",
    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: theme.shadows[8],
    },
    "&:focus-within": {
      outline: "2px solid",
      outlineColor: "primary.main",
      outlineOffset: "2px",
    },
  }),

  carCardMedia: {
    objectFit: "cover",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
    },
  } as const,

  carCardActionButtons: {
    position: "absolute",
    top: 12,
    right: 12,
    display: "flex",
    gap: 1,
  } as const,

  actionButton: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 1)",
    },
  } as const,

  favoriteButton: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 1)",
      color: "error.main",
    },
  } as const,
};

export const modalStyles = {
  dialogPaper: {
    borderRadius: 3,
  } as const,

  dialogTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    pb: 1,
  } as const,

  dialogActions: {
    px: 3,
    pb: 3,
  } as const,
};

export const layoutStyles = {
  mainLayout: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  } as const,

  mainContent: {
    flexGrow: 1,
    py: 3,
  } as const,

  toolbar: {
    px: { xs: 0 },
  } as const,

  brandLink: {
    flexGrow: 1,
    textDecoration: "none",
    color: "inherit",
    fontWeight: 600,
  } as const,

  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  } as const,

  addButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
  } as const,
};

export const pageStyles = {
  centeredContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "50vh",
    gap: 2,
  } as const,

  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "50vh",
    gap: 2,
  } as const,

  errorContainer: {
    py: 4,
    textAlign: "center",
    color: "error.main",
  } as const,

  homePageHeader: {
    mb: 4,
    textAlign: "center",
  } as const,

  homePageSubtitle: {
    maxWidth: 600,
    mx: "auto",
  } as const,

  carGrid: {
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      sm: "repeat(2, 1fr)",
      md: "repeat(3, 1fr)",
      lg: "repeat(4, 1fr)",
    },
    gap: 3,
    mt: 2,
  } as const,

  noResultsContainer: {
    textAlign: "center",
    py: 8,
    color: "text.secondary",
  } as const,
};

export const detailPageStyles = {
  backButton: {
    mb: 3,
  } as const,

  detailPaper: {
    overflow: "hidden",
    borderRadius: 3,
  } as const,

  carImage: {
    width: "100%",
    height: { xs: 300, md: 400 },
    objectFit: "cover",
  } as const,

  detailContent: {
    p: 4,
  } as const,

  chipContainer: {
    mb: 3,
    display: "flex",
    gap: 1,
    flexWrap: "wrap",
  } as const,

  actionButtonsContainer: {
    display: "flex",
    gap: 2,
    flexWrap: "wrap",
  } as const,

  actionButton: {
    flexGrow: 1,
    minWidth: 150,
  } as const,

  specsSection: {
    mt: 4,
  } as const,

  specsGrid: {
    spacing: 3,
  } as const,
};

export const filterStyles = {
  filterContainer: {
    p: 3,
    mb: 3,
  } as const,

  filterGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: 2,
    alignItems: "center",
  } as const,

  searchField: {
    flex: { xs: "1 1 100%", md: "1 1 50%" },
    minWidth: 200,
  } as const,

  sortField: {
    flex: { xs: "1 1 100%", md: "1 1 33%" },
    minWidth: 150,
  } as const,

  makeField: {
    flex: { xs: "1 1 100%", md: "1 1 33%" },
    paddingBottom: { xs: 0, md: "1.46rem" },
    minWidth: 150,
  } as const,

  sortButton: {
    flex: { xs: "1 1 100%", md: "0 0 auto" },
    minWidth: 120,
  } as const,

  sortButtonInner: {
    border: 1,
    borderColor: "primary.main",
    borderRadius: 1,
    width: "100%",
    height: 56,
  } as const,
};

// Helper function to get styles
export const getComponentStyles = () => ({
  card: cardStyles,
  modal: modalStyles,
  layout: layoutStyles,
  page: pageStyles,
  detail: detailPageStyles,
  filter: filterStyles,
});
