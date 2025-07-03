import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import { SwapVert as SwapVertIcon } from "@mui/icons-material";

interface CarFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: "make" | "model" | "year";
  onSortByChange: (value: "make" | "model" | "year") => void;
  sortOrder: "asc" | "desc";
  onSortOrderChange: (value: "asc" | "desc") => void;
  totalCars: number;
}

export function CarFilters({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
  totalCars,
}: CarFiltersProps) {
  const toggleSortOrder = () => {
    onSortOrderChange(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <Paper
      elevation={2}
      sx={{ p: 3, mb: 3 }}
      component="section"
      aria-labelledby="filters-heading"
    >
      <Typography variant="h6" gutterBottom id="filters-heading">
        Filter & Sort Cars ({totalCars} results)
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={2} alignItems="center">
        <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 50%" }, minWidth: 200 }}>
          <TextField
            fullWidth
            label="Search by Model"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Type car model to search..."
            inputProps={{
              "aria-describedby": "search-help",
            }}
            helperText="Search for cars by their model name"
            id="search-help"
          />
        </Box>

        <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 33%" }, minWidth: 150 }}>
          <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              label="Sort By"
              onChange={(e) =>
                onSortByChange(e.target.value as "make" | "model" | "year")
              }
            >
              <MenuItem value="make">Make</MenuItem>
              <MenuItem value="model">Model</MenuItem>
              <MenuItem value="year">Year</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ flex: { xs: "1 1 100%", md: "0 0 auto" }, minWidth: 120 }}>
          <IconButton
            onClick={toggleSortOrder}
            color="primary"
            sx={{
              border: 1,
              borderColor: "primary.main",
              borderRadius: 1,
              width: "100%",
              height: 56,
            }}
            aria-label={`Sort order: ${
              sortOrder === "asc" ? "Ascending" : "Descending"
            }. Click to toggle`}
            title={`Current sort order: ${
              sortOrder === "asc" ? "Ascending" : "Descending"
            }`}
          >
            <SwapVertIcon />
            <Typography variant="caption" ml={1}>
              {sortOrder.toUpperCase()}
            </Typography>
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
}
