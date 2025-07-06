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
import { useMemo } from "react";
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

  type FilterChip = { label: string; onDelete: () => void };

  const filterChips: FilterChip[] = useMemo(
    () =>
      [
        searchTerm
          ? {
              label: `Model: ${searchTerm}`,
              onDelete: () => onSearchChange(""),
            }
          : null,
        yearFilter
          ? {
              label: `Year: ${yearFilter}`,
              onDelete: () => onYearFilterChange(null),
            }
          : null,
        colorFilter
          ? {
              label: `Color: ${colorFilter}`,
              onDelete: () => onColorFilterChange(""),
            }
          : null,
        makeFilter
          ? {
              label: `Make: ${makeFilter}`,
              onDelete: () => onMakeFilterChange(""),
            }
          : null,
      ].filter((chip): chip is FilterChip => chip !== null),
    [
      searchTerm,
      yearFilter,
      colorFilter,
      makeFilter,
      onSearchChange,
      onYearFilterChange,
      onColorFilterChange,
      onMakeFilterChange,
    ]
  );

  const hasActiveFilters = filterChips.length > 0;

  const selectOptions = [
    {
      label: "Make",
      value: makeFilter,
      onChange: (v: string) => onMakeFilterChange(v),
      options: availableMakes,
      allLabel: "All Makes",
    },
    {
      label: "Year",
      value: yearFilter || "",
      onChange: (v: string) => onYearFilterChange(v ? Number(v) : null),
      options: availableYears,
      allLabel: "All Years",
    },
    {
      label: "Color",
      value: colorFilter,
      onChange: (v: string) => onColorFilterChange(v),
      options: availableColors,
      allLabel: "All Colors",
    },
  ];

  return (
    <Paper
      elevation={2}
      sx={styles.filter.filterContainer}
      component="section"
      aria-labelledby="filters-heading"
    >
      <Box sx={styles.filter.filterBox}>
        <Typography
          variant="h6"
          id="filters-heading"
          sx={styles.filter.filterTypography}
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
        <Box sx={styles.filter.filterChipBox}>
          {filterChips.map((chip) => (
            <Chip
              key={chip.label}
              label={chip.label}
              onDelete={chip.onDelete}
              color="primary"
              variant="outlined"
              sx={{ mr: 1 }}
            />
          ))}
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

        {/* Select Filters */}
        {selectOptions.map((opt) => (
          <Box
            sx={
              opt.label === "Make"
                ? styles.filter.makeField
                : styles.filter.sortField
            }
            key={opt.label}
          >
            <FormControl fullWidth>
              <InputLabel id={`${opt.label}-label`}>{opt.label}</InputLabel>
              <Select
                labelId={`${opt.label}-label`}
                value={opt.value}
                label={opt.label}
                onChange={(e) => opt.onChange(e.target.value as any)}
              >
                <MenuItem value="">{opt.allLabel}</MenuItem>
                {opt.options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        ))}

        {/* Sort By */}
        <Box sx={styles.filter.sortField}>
          <FormControl fullWidth>
            <InputLabel id="sortby-label">Sort By</InputLabel>
            <Select
              labelId="sortby-label"
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
