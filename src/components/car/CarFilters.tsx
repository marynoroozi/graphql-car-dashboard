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
  Chip,
  Button,
} from "@mui/material";
import {
  SwapVert as SwapVertIcon,
  Clear as ClearIcon,
  FilterList as FilterIcon,
} from "@mui/icons-material";
import { getComponentStyles } from "../../theme/componentStyles";

interface CarFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  yearFilter: number | null;
  onYearFilterChange: (value: number | null) => void;
  colorFilter: string;
  onColorFilterChange: (value: string) => void;
  makeFilter: string;
  onMakeFilterChange: (value: string) => void;
  sortBy: "make" | "model" | "year" | "price";
  onSortByChange: (value: "make" | "model" | "year" | "price") => void;
  sortOrder: "asc" | "desc";
  onSortOrderChange: (value: "asc" | "desc") => void;
  totalCars: number;
  availableYears?: number[];
  availableColors?: string[];
  availableMakes?: string[];
}

export default function CarFilters({
  searchTerm,
  onSearchChange,
  yearFilter,
  onYearFilterChange,
  colorFilter,
  onColorFilterChange,
  makeFilter,
  onMakeFilterChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
  totalCars,
  availableYears = [],
  availableColors = [],
  availableMakes = [],
}: CarFiltersProps) {
  const styles = getComponentStyles();

  const toggleSortOrder = () => {
    onSortOrderChange(sortOrder === "asc" ? "desc" : "asc");
  };

  const clearAllFilters = () => {
    onSearchChange("");
    onYearFilterChange(null);
    onColorFilterChange("");
    onMakeFilterChange("");
  };

  const hasActiveFilters =
    searchTerm || yearFilter || colorFilter || makeFilter;

  return (
    <Paper
      elevation={2}
      sx={styles.filter.filterContainer}
      component="section"
      aria-labelledby="filters-heading"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h6"
          id="filters-heading"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <FilterIcon />
          Filter & Sort Cars ({totalCars} results)
        </Typography>

        {hasActiveFilters && (
          <Button
            variant="outlined"
            size="small"
            startIcon={<ClearIcon />}
            onClick={clearAllFilters}
          >
            Clear All
          </Button>
        )}
      </Box>

      {/* Active Filters */}
      {hasActiveFilters && (
        <Box sx={{ mb: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
          {searchTerm && (
            <Chip
              label={`Model: ${searchTerm}`}
              onDelete={() => onSearchChange("")}
              color="primary"
              variant="outlined"
            />
          )}
          {yearFilter && (
            <Chip
              label={`Year: ${yearFilter}`}
              onDelete={() => onYearFilterChange(null)}
              color="primary"
              variant="outlined"
            />
          )}
          {colorFilter && (
            <Chip
              label={`Color: ${colorFilter}`}
              onDelete={() => onColorFilterChange("")}
              color="primary"
              variant="outlined"
            />
          )}
          {makeFilter && (
            <Chip
              label={`Make: ${makeFilter}`}
              onDelete={() => onMakeFilterChange("")}
              color="primary"
              variant="outlined"
            />
          )}
        </Box>
      )}

      <Box sx={styles.filter.filterGrid}>
        {/* Search */}
        <Box sx={styles.filter.searchField}>
          <TextField
            fullWidth
            label="Search by Model"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Type car model to search..."
            inputProps={{ "aria-describedby": "search-help" }}
            helperText="Search for cars by their model name"
          />
        </Box>

        {/* Make Filter */}
        <Box sx={styles.filter.makeField}>
          <FormControl fullWidth>
            <InputLabel>Make</InputLabel>
            <Select
              value={makeFilter}
              label="Make"
              onChange={(e) => onMakeFilterChange(e.target.value)}
            >
              <MenuItem value="">All Makes</MenuItem>
              {availableMakes.map((make) => (
                <MenuItem key={make} value={make}>
                  {make}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Year Filter */}
        <Box sx={styles.filter.sortField}>
          <FormControl fullWidth>
            <InputLabel>Year</InputLabel>
            <Select
              value={yearFilter || ""}
              label="Year"
              onChange={(e) =>
                onYearFilterChange(
                  e.target.value ? Number(e.target.value) : null
                )
              }
            >
              <MenuItem value="">All Years</MenuItem>
              {availableYears.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Color Filter */}
        <Box sx={styles.filter.sortField}>
          <FormControl fullWidth>
            <InputLabel>Color</InputLabel>
            <Select
              value={colorFilter}
              label="Color"
              onChange={(e) => onColorFilterChange(e.target.value)}
            >
              <MenuItem value="">All Colors</MenuItem>
              {availableColors.map((color) => (
                <MenuItem key={color} value={color}>
                  {color}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Sort By */}
        <Box sx={styles.filter.sortField}>
          <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              label="Sort By"
              onChange={(e) =>
                onSortByChange(
                  e.target.value as "make" | "model" | "year" | "price"
                )
              }
            >
              <MenuItem value="make">Make</MenuItem>
              <MenuItem value="model">Model</MenuItem>
              <MenuItem value="year">Year</MenuItem>
              <MenuItem value="price">Price</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Sort Order */}
        <Box sx={styles.filter.sortButton}>
          <IconButton
            onClick={toggleSortOrder}
            color="primary"
            sx={styles.filter.sortButtonInner}
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
