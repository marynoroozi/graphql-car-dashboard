import { useMemo } from "react";
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
import { useCarFiltersContext } from "../../contexts/CarContext";
import { getComponentStyles } from "../../theme/componentStyles";

export default function CarFilters() {
  const {
    filters,
    setFilter,
    clearAllFilters,
    toggleSortOrder,
    availableYears,
    availableColors,
    availableMakes,
    hasActiveFilters,
    activeFilters,
    totalResults,
  } = useCarFiltersContext();
  const styles = getComponentStyles();

  const filterChips = useMemo(
    () =>
      activeFilters.map((filter) => ({
        key: filter.key,
        label: `${filter.label}: ${filter.value}`,
        onDelete: () => {
          if (filter.key === "yearFilter") {
            setFilter("yearFilter", null);
          } else {
            setFilter(filter.key, "");
          }
        },
      })),
    [activeFilters, setFilter]
  );

  const selectOptions = [
    {
      label: "Make",
      value: filters.makeFilter,
      onChange: (v: string) => setFilter("makeFilter", v),
      options: availableMakes,
      allLabel: "All Makes",
    },
    {
      label: "Year",
      value: filters.yearFilter || "",
      onChange: (v: string) => setFilter("yearFilter", v ? Number(v) : null),
      options: availableYears,
      allLabel: "All Years",
    },
    {
      label: "Color",
      value: filters.colorFilter,
      onChange: (v: string) => setFilter("colorFilter", v),
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
          Filter & Sort Cars ({totalResults} results)
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
            value={filters.searchTerm}
            onChange={(e) => setFilter("searchTerm", e.target.value)}
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
              value={filters.sortBy}
              label="Sort By"
              onChange={(e) =>
                setFilter(
                  "sortBy",
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
              filters.sortOrder === "asc" ? "Ascending" : "Descending"
            }. Click to toggle`}
            title={`Current sort order: ${
              filters.sortOrder === "asc" ? "Ascending" : "Descending"
            }`}
          >
            <SwapVertIcon />
            <Typography variant="caption" ml={1}>
              {filters.sortOrder.toUpperCase()}
            </Typography>
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
}
